---
date: 2025-03-18
permalink: /2025/03/18/keploy-ebpf/
draft: false
excerpt: ''
status: evergreen
tags:
- linux
- macos
- testing
title: Keploy and eBPF in Linux vs MacOS
---

I am working on setting up [Keploy][keploy] at work to generate unit tests for
one of the runtime component at Skit.ai

For general use cases on linux, Keploy works as below

```
keploy record -c "python main.py"
```

I discovered that on MacOS, Keploy works by containerizing the application. So
it needs to work something as below

```
keploy record -c "docker run --name test -p 8080:8080 image:tag" --container-name test --buildDelay 30
```

I faced some SSL handshake issues while running it this way that I didn't face
while running the application server normally i.e. without Keploy.

After this I planned to run a linux container and run everything inside that
i.e. entire dev setup, application server, keploy etc.

I noticed that I was getting the below error

```
🐰 Keploy: 2025-03-18T13:02:28Z ERROR failed to load eBPF objects {"error": "field K_connect4: program k_connect4: load BTF: BTF not supported (requires >= v4.18)"}
🐰 Keploy: 2025-03-18T13:02:28Z ERROR failed to load hooks {"error": "field K_connect4: program k_connect4: load BTF: BTF not supported (requires >= v4.18)"}
🐰 Keploy: 2025-03-18T13:02:28Z ERROR failed to start the hooks and proxy {"error": "failed to hook into the app"}
🐰 Keploy: 2025-03-18T13:02:28Z ERROR failed to instrument the application {"error": "failed to start the hooks and proxy"}
🐰 Keploy: 2025-03-18T13:02:28Z INFO stopping Keploy {"reason": "failed to instrument the application"}
🐰 Keploy: 2025-03-18T13:02:28Z ERROR failed to record {"error": "failed to instrument the application"}
```

After this, I learnt about [eBPF][ebpf].

> eBPF is a technology that can run programs in a privileged context such as
> the operating system kernel. It is the successor to the Berkeley Packet
> Filter (BPF, with the "e" originally meaning "extended") filtering mechanism
> in Linux and is also used in non-networking parts of the Linux kernel as well

MacOS doesn't have support for eBPF. However, there's one userspace
implementation of eBPF, [uBPF][ubpf] that I'll try next.


[keploy]: https://github.com/keploy/keploy
[ebpf]: https://en.wikipedia.org/wiki/EBPF
[ubpf]: https://github.com/iovisor/ubpf