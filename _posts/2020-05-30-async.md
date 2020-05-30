---
layout: single
title:  "Performance Analysis: Goroutine & Python’s Coroutine"
date:   2020-05-30 14:30:12 +0530
permalink: "/2017/09/performance-analysis-goroutine-pythons-coroutine.html"
categories: jekyll update
---


I made 1000 HTTP requests using Goroutines and Python’s Coroutines

Used Go 1.6.2 and Python 3.6
Implemented in Go using net/http package
Implemented in Python using aiohttp, requests and urllib3 libraries
Ran it over $10 DigitalOcean droplet
Scroll to bottom of this post to see results.

# Go

Go implementation using goroutines:

```go
package main

import (
    "fmt"
    "net/http"
)


func main() {
    url := "http://example.com"
    resc, errc := make(chan bool), make(chan error)

    for i := 0; i < 1000; i++ {
        go func(url string) {
            _, err := http.Head(url)
            if err != nil {
                errc <- err
                return
            }
            resc <- true
        }(url)
    }
    for i := 0; i < 1000; i++ {
        select {
        case <-resc:
        case err := <-errc:
            fmt.Println(err)
        }
    }
}
```

---

# Python

Python implementation using asyncio with aiohttp, requests and urllib3

## 1. aiohttp

```python
import asyncio

import aiohttp


async def main():
    async with aiohttp.ClientSession() as session:
        for i in range(1000):
            await session.head('http://example.com')


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
```

## 2. requests

```python
import asyncio

import requests


async def main():
    futures = [
        loop.run_in_executor(
            None,
            requests.get,
            'http://example.com'
        )
        for i in range(1000)
    ]
    return await asyncio.gather(*futures)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    _ = loop.run_until_complete(main())
```

## 3. urllib3

```python
import asyncio
import urllib3


async def main(http):
    futures = [
        loop.run_in_executor(
            None,
            http.request,
            'HEAD', 'http://example.com'
        )
        for i in range(1000)
    ]
    return await asyncio.gather(*futures)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    http = urllib3.PoolManager()
    _ = loop.run_until_complete(main(http))
```

---

# Analysis (Time)

## 1. Sync/Async HEAD requests (time in seconds)

<iframe src="//plot.ly/~vipul/38.embed" width="1000" height="600" frameborder="0" scrolling="no"></iframe>

## 2. Sync/Async GET requests (time in seconds)
<iframe src="//plot.ly/~vipul/36.embed" width="1000" height="600" frameborder="0" scrolling="no"></iframe>

---

# Analysis (Memory)

## 1. Sync/Async HEAD requests (memory in MB)

<iframe src="//plot.ly/~vipul/42.embed" width="1000" height="600" frameborder="0" scrolling="no"></iframe>

## 2. Async/Sync GET requests (memory in MB)

<iframe src="//plot.ly/~vipul/40.embed" width="1000" height="600" frameborder="0" scrolling="no"></iframe>


Code for both synchronous and asynchronous implementations are at: [https://github.com/vipul-sharma20/async-go-py](https://github.com/vipul-sharma20/async-go-py)
