---
date: 2026-07-23
draft: false
excerpt: I put the 1-bit Bonsai 27B on almost every hardware that I use for self-hosting, MacBook, cloud VPSes, cloud GPUs, a Raspberry Pi, and an old GPU laptop and measured how fast it runs.
status: evergreen
tags:
- llm
- self-hosting
title: Running 1-bit Bonsai 27B LLM
author_profile: false
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/bonsai.css">

[PrismML recently announced Bonsai 27B][announcement], a Qwen3.6 27B based
multimodal model. Bonsai 27B also ships in a 1-bit build [`Bonsai-27B-Q1_0.gguf`][bonsai-27b-1b]
which is about 3.8 GB on disk.

I wanted to try out setting it up on some of the hardware that I own/subscribe
to. I didn't really try to evaluate the efficacy of the model but just its
ability to run on some of the standard compute that I have. I don't own
sepcialized compute for such self-hosted LLM deployments (except for
[Modal][modal] subscription for one-off runs/hosting).

## The hardware, and how fast it goes

| Machine | CPU / SoC | GPU | RAM | Backend | Prompt (t/s) | Generation (t/s) |
|---|:---:|:---:|:---:|---|:--:|:--:|
| MacBook (Apple M5) | Apple M5 (10-core, 4P+6E) | Apple M5, integrated | 16 GB unified | Metal (llama.cpp) | **63.4** | 18.8 |
| MacBook (Apple M5) | Apple M5 (10-core, 4P+6E) | Apple M5, integrated | 16 GB unified | MLX (1-bit fork) | 21.0 | 24.4 |
| Old Laptop | Intel Core i7-8750H (6C/12T) | NVIDIA GTX 1050 Ti, 4 GB | 16 GB | Vulkan - 52/65 layers on GPU | 7.2 | 4.2 |
| Old Laptop | Intel Core i7-8750H (6C/12T) | - | 16 GB | CPU (12 threads) | 4.2 | 2.7 |
| OVH VPS | Intel Core i7-7700K (4C/8T) | - | 64 GB | CPU (8 threads) | 4.8 | 3.4 |
| Oracle Cloud | Ampere Altra ARM (4 vCPU) | - | 24 GB | CPU (4 threads) | 3.2 | 1.7 |
| Raspberry Pi 5 | Broadcom BCM2712 (4× Cortex-A76) | - | 8 GB | CPU (4 threads) | 3.4 | 1.1 |
| Modal<sup>*</sup> (cloud T4) | idle (full offload) | NVIDIA Tesla T4, 16 GB | - | CUDA - 65/65 layers on GPU | 370<sup>†</sup> | 18.3 |
| Modal<sup>*</sup> (cloud L4) | idle (full offload) | NVIDIA L4, 24 GB | - | CUDA - 65/65 layers on GPU | 797<sup>†</sup> | **34.6** |

<sup>*</sup> _Nvidia T4 and L4 are the two cheapest GPU resources on Modal at
$0.59/h and $0.80/h respectively._

<sup>†</sup> _T4 and L4 GPUs on Modal are headless, so they were measured with
[`llama-bench`][llama-bench] (steady-state, 3 repititions). Their generation numbers are
comparable to the rest. Don't compare the prompt (t/s) column across the cloud
GPUs and the others._

<figure style="text-align:center">
  <video autoplay muted playsinline controls preload="metadata" style="max-width:640px;">
    <source src="/assets/videos/bonsai-tokens-per-second.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>How 23 t/s feels like on Apple M5 with MLX (1-bit fork)</figcaption>
</figure>

---

# Metrics

I have a Grafana dashboard for all the compute that I use, below are
screenshots of CPU/GPU usage, temperature etc. while I ran the model.

## Peak temperatures

I wanted to put this as one of the metric to realize the practicality of
running self-hosted LLMs under constant heat when hosted extremely locally. By
that I mean running it on a daily machine/laptop and not offloading it to
specialized or remote machines.

Sure, this is not a representation of all self-hosted LLMs' impact but can take
guess on side-effects of bigger models based on what this model does to
different hardware.


| Machine | Peak CPU temp | Peak GPU temp |
|---|:--:|:--:|
| MacBook Apple M5 (Metal) | 79.8 °C | **96.7 °C** |
| MacBook Apple M5 (MLX) | 78.9 °C | 90.8 °C |
| Old Laptop i7-8750H (GPU run) | **97 °C** | 91 °C |
| OVH i7-7700K | 92 °C | - |
| Oracle Ampere A1 | *no sensor* | - |
| Raspberry Pi 5 | 84.8 °C | - |
| NVIDIA T4 (Modal) | - | ~42 °C |
| NVIDIA L4 (Modal) | - | ~52 °C |


<details open>
<summary>MacBook M5 (llama.cpp / Metal)</summary>

![Grafana: Apple M5 GPU temperature 96.7 °C and CPU temperature 79.8 °C, llama.cpp Metal run](/assets/images/2026/07/bonsai/grafana-mac-gpu-cpu-temp.png)

</details>

<details open>
<summary>MacBook M5 (MLX 1-bit fork)</summary>

![Grafana: Apple M5 GPU temperature 90.8 °C and CPU temperature 78.9 °C, MLX run](/assets/images/2026/07/bonsai/grafana-mac-mlx-temp.png)

</details>

<details open>
<summary>Old Laptop CPU (i7-8750H) temperature during GPU inference</summary>

![Grafana: old laptop CPU temperature during GPU inference, peaking at 97 °C](/assets/images/2026/07/bonsai/grafana-pred-cpu-temp-with-gpu-inference.png)

</details>

<details open>
<summary>Old Laptop GPU temperature</summary>

![Grafana: GTX 1050 Ti temperature, 91 °C](/assets/images/2026/07/bonsai/grafana-pred-gpu-temp.png)

</details>

<details open>
<summary>OVHCloud CPU (i7-7700K) temperature</summary>

![Grafana: OVH i7-7700K CPU temperature, peaking at 92 °C](/assets/images/2026/07/bonsai/grafana-ovhcloud-temp.png)

</details>

<details open>
<summary>Raspberry Pi 5 CPU temperature</summary>

![Grafana: Raspberry Pi 5 CPU temperature, peaking at 84.8 °C](/assets/images/2026/07/bonsai/grafana-rpi-temp.png)

</details>

---

## CPU Utilization

These are some screenshots of my Grafana dashboard of CPU utilization of all
the hardware while running the inference using llama.cpp.

<details open>
<summary>Old Laptop CPU (i7-8750H) usage during GPU inference</summary>

![Grafana: old laptop CPU usage during GPU inference, max 13.6%](/assets/images/2026/07/bonsai/grafana-pred-cpu-with-gpu-inference.png)

</details>

<details open>
<summary>Old Laptop CPU usage, CPU-only run</summary>

![Grafana: old laptop CPU usage during CPU-only inference, max 52.5%](/assets/images/2026/07/bonsai/grafana-pred-cpu.png)

</details>

<details open>
<summary>OVH CPU (i7-7700K) usage</summary>

![Grafana: OVH CPU usage, max 66.4%](/assets/images/2026/07/bonsai/grafana-ovhcloud-cpu.png)

</details>

<details open>
<summary>Oracle Ampere A1 CPU usage</summary>

![Grafana: Oracle Ampere A1 CPU usage, max 82.7%](/assets/images/2026/07/bonsai/grafana-oracle-cpu.png)

</details>

<details open>
<summary>Raspberry Pi 5 CPU usage</summary>

![Grafana: Raspberry Pi 5 CPU usage, max 88%](/assets/images/2026/07/bonsai/grafana-rpi-cpu.png)

</details>

## GPU utilization

These are some screenshots of my Grafana dashboard of GPU utilization of all
the hardware where GPU was available while running the inference using
llama.cpp.

<details open>
<summary>MacBook M5 (llama.cpp / Metal) GPU utilization</summary>

![Grafana: Apple M5 GPU utilization spiking to ~100%, llama.cpp Metal run](/assets/images/2026/07/bonsai/grafana-mac-gpu.png)

</details>

<details open>
<summary>MacBook M5 (MLX 1-bit fork) GPU utilization</summary>

![Grafana: Apple M5 GPU utilization under MLX, peaking at 100% with a 25.6% mean](/assets/images/2026/07/bonsai/grafana-mac-mlx-gpu.png)

</details>

<details open>
<summary>Old Laptop GTX 1050 Ti utilization</summary>

![Grafana: GTX 1050 Ti GPU utilization peaking at 81%](/assets/images/2026/07/bonsai/grafana-pred-gpu-utilization.png)

</details>

<details open>
<summary>NVIDIA T4 Modal metrics</summary>

![Modal dashboard for the T4 run: GPU utilization near 100%, ~50 W power, ~42 °C, ~4 GB GPU memory](/assets/images/2026/07/bonsai/t4-metrics.png)

</details>

<details open>
<summary>NVIDIA L4 Modal metrics</summary>

![Modal dashboard for the L4 run: GPU utilization near 100% in two plateaus, ~72 W power, ~52 °C, ~4 GB GPU memory](/assets/images/2026/07/bonsai/l4-metrics.png)

</details>

---

<details open class="section-toggle">
<summary>LLM Run Screenshots</summary>

These are screenshots of some llama.cpp / llama-bench runs that I did to test out the model
across hardware.

<details open>
<summary>MacBook (Apple M5) llama.cpp / Metal</summary>

![Bonsai 27B 1-bit on Apple M5 via llama.cpp Metal, 18.8 tokens/sec](/assets/images/2026/07/bonsai/bonsai-m5-metal.png)

</details>

<details open>
<summary>MacBook (Apple M5) MLX 1-bit fork</summary>

![Bonsai 27B 1-bit on Apple M5 via the MLX fork, 24.4 tokens/sec](/assets/images/2026/07/bonsai/bonsai-m5-mlx.png)

</details>

<details open>
<summary>Old Laptop server GPU (GTX 1050 Ti, Vulkan)</summary>

![Bonsai 27B 1-bit on a GTX 1050 Ti via Vulkan, 4.2 tokens/sec](/assets/images/2026/07/bonsai/bonsai-pred-gpu.png)

</details>

<details open>
<summary>Old Laptop server CPU (i7-8750H) only</summary>

![Bonsai 27B 1-bit on the Pred i7-8750H, CPU only, 2.7 tokens/sec](/assets/images/2026/07/bonsai/bonsai-pred-cpu.png)

</details>

<details open>
<summary>OVHCloud VPS (i7-7700K, CPU)</summary>

![Bonsai 27B 1-bit on an OVH i7-7700K CPU, 3.4 tokens/sec](/assets/images/2026/07/bonsai/bonsai-ovhcloud.png)

</details>

<details open>
<summary>Oracle Cloud (Ampere ARM, CPU)</summary>

![Bonsai 27B 1-bit on Oracle Ampere ARM CPU, 1.7 tokens/sec](/assets/images/2026/07/bonsai/bonsai-oracle.png)

</details>

<details open>
<summary>Raspberry Pi 5 (BCM2712, CPU)</summary>

![Bonsai 27B 1-bit on a Raspberry Pi 5 CPU, 1.1 tokens/sec](/assets/images/2026/07/bonsai/bonsai-rpi.png)

</details>

<details open>
<summary>Modal cloud (NVIDIA T4, CUDA)</summary>

![Bonsai 27B 1-bit on a Modal NVIDIA T4 — nvidia-smi, llama-completion, and llama-bench pp512 370 / tg128 18.3](/assets/images/2026/07/bonsai/bonsai-t4.png)

</details>

<details open>
<summary>Modal cloud (NVIDIA L4, CUDA)</summary>

![Bonsai 27B 1-bit on a Modal NVIDIA L4 — full reasoning trace, llama-bench pp512 797 / tg128 34.6](/assets/images/2026/07/bonsai/bonsai-l4.png)

</details>

</details>

---

## Postscript

- PSA: [Friends Don't Let Friends Use Ollama][stop-using-ollama].
- I wrote some of the content of this post while on a flight. I used this model
  for some questions _(information about `BCM2712`)_, suggestions _(how to use
  appendix section in a blog post)_ etc.
- While in flight, I also plugged the MLX model with my [pi][pi]. It works but
  with constant high GPU temperatures, it is not very practical to run it for a
  long time.


[announcement]: https://prismml.com/news/bonsai-27b
[prismml]: https://prismml.com/
[bonsai-27b-1b]: https://huggingface.co/prism-ml/Bonsai-27B-gguf
[modal]: http://modal.com/
[stop-using-ollama]: https://sleepingrobots.com/dreams/stop-using-ollama/
[pi]: https://pi.dev/
[llama-bench]: https://github.com/ggml-org/llama.cpp/blob/master/tools/llama-bench/README.md
