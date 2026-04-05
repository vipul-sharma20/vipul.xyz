## vipul.xyz

Source for https://vipul.xyz/

### Running on Local

```
cd frontend
npm install
npm run dev
```

### Building

```
cd frontend
npm run build
```

Output goes to `frontend/out/`.

### Running using Docker

```
docker pull vipul20/vipul.xyz:v2
```

```
docker run -p 8080:80 vipul20/vipul.xyz:v2
```

### Adding a new post

Create a markdown file in `content/posts/`:

```
content/posts/YYYY-MM-DD-slug.md
```

With frontmatter:

```yaml
---
title: "Post Title"
date: YYYY-MM-DD
tags: [tag1, tag2]
excerpt: "Optional short description"
---
```
