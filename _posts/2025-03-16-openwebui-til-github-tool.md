---
title: "Open WebUI: Push to GitHub Tool"
draft: false
date: 2025-03-16
tags:
  - github
  - llm
  - scribbles
author_profile: false
excerpt: ""
layout: single
---

I have written a tool for publishing blog posts from Open WebUI. I can write
posts by chatting with LLM on Open WebUI and on asking it to publish the post,
this tool publishes markdown content to my GitHub repo at
https://github.com/vipul-sharma20/til, which runs a workflow to deploy the
content on https://til.vipul.xyz/.

Below is the code of the tool:

```python
import base64
import json
from datetime import datetime
from typing import Any, Awaitable, Callable, List
import requests
from pydantic import BaseModel, Field

class GitHubAPI:
    def __init__(self, token: str):
        """Initialize GitHub API with authentication."""
        self.headers = {
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json",
        }

    def get_file_sha(self, owner: str, repo: str, path: str):
        """Check if the file exists and return its SHA (needed for updating a file)."""
        url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
        response = requests.get(url, headers=self.headers)
        if response.status_code == 200:
            return response.json()["sha"]  # Return SHA hash if file exists
        return None  # File does not exist

    def push_markdown_file(
        self, owner: str, repo: str, path: str, content: str, commit_message: str
    ):
        """Push a markdown file to the GitHub repository inside `content/` directory (create or update)."""
        sha = self.get_file_sha(owner, repo, path)  # Check if file exists
        encoded_content = base64.b64encode(
            content.encode()
        ).decode()  # Convert content to Base64
        data = {
            "message": commit_message,
            "content": encoded_content,
            "branch": "main",  # Modify this if you’re pushing to another branch
        }
        if sha:
            data["sha"] = sha  # Include SHA if updating an existing file
        url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
        response = requests.put(url, headers=self.headers, json=data)
        if response.status_code in [200, 201]:
            return {
                "status": "success",
                "message": "File successfully pushed to GitHub",
            }
        else:
            return {"status": "error", "message": response.json()}

class EventEmitter:
    def __init__(self, event_emitter: Callable[[dict], Awaitable[None]]):
        self.event_emitter = event_emitter

    async def emit_status(self, description: str, done: bool, error: bool = False):
        """Emit status updates."""
        await self.event_emitter(
            {
                "data": {
                    "description": f"{'✅' if done and not error else '❌' if error else '🔎'} {description}",
                    "status": "complete" if done else "in_progress",
                    "done": done,
                },
                "type": "status",
            }
        )

    async def emit_message(self, content: str):
        """Emit a message."""
        await self.event_emitter({"data": {"content": content}, "type": "message"})

class Tools:
    def __init__(self):
        self.valves = self.Valves()

    class Valves(BaseModel):
        github_token: str = Field(
            "YOUR_GITHUB_TOKEN",
            description="Your GitHub PAT (Personal Access Token).  DO NOT HARDCODE. Use environment variables or a secure configuration.",
        )
        repo_owner: str = Field(
            "vipul-sharma20", description="GitHub repository owner/username"
        )
        repo_name: str = Field("til", description="GitHub repository name")

    def format_markdown(
        self, title: str, date: str, tags: List[str], content: str
    ) -> str:
        """Format the chat content into a structured Markdown file with front matter."""
        # Convert tags into valid Markdown YAML front matter format
        formatted_tags = "\n  - ".join(tags) if tags else "none"
        return f"""---
title: {title}
draft: false
date: {date}
tags:
  - {formatted_tags}
---
> [!NOTE]
> This content was written with the assistance of an LLM
{content}
"""

    async def push_chat_to_github(
        self,
        file_name: str,
        markdown_content: str,
        __event_emitter__: Callable[[dict], Awaitable[None]],
        **user: dict,
    ):
        """
        Format chat content as Markdown with metadata and push it to GitHub inside `content/` directory.
        :param file_name: Desired name of the markdown file (without .md extension).
        :param content: Generated markdown content.
        :return: JSON response from GitHub API.
        """
        github = GitHubAPI(self.valves.github_token)
        event_emitter = EventEmitter(__event_emitter__)

        try:
            await event_emitter.emit_status(
                f"Formatting content for {file_name}.md", False
            )
            # Convert content into Markdown format
            file_path = f"content/{file_name}.md"  # Save inside `content/` directory
            commit_message = f"auto push post"

            response = github.push_markdown_file(
                self.valves.repo_owner,
                self.valves.repo_name,
                file_path,
                markdown_content,
                commit_message,
            )

            if response["status"] == "success":
                await event_emitter.emit_status(
                    f"✅ Successfully published {file_name}.md", True
                )
            else:
                await event_emitter.emit_status(
                    f"❌ Failed to publish {file_name}.md: {response['message']}",
                    True,
                    True,
                )
            return json.dumps(response, indent=2)

        except Exception as e:
            await event_emitter.emit_status(f"❌ Error: {e}", True, True)
            return json.dumps({"status": "error", "message": str(e)}, indent=2)
