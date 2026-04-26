# System Benchmark Report

This report documents the performance testing results for the Vibe-Car system under various environmental conditions.

## 1. Test Environments

| Environment ID | Description | Distance (m) | Obstacles |
|----------------|-------------|--------------|-----------|
| ENV-01         | Indoor Open | 2m           | None      |
| ENV-02         | Partitioned | 5m           | 1 Wall    |
| ENV-03         | Long Range  | 15m          | Line-of-sight |

## 2. Latency Data (RTT)

| Test Date | Env ID | Sample Count | Avg RTT (ms) | Jitter (ms) | Max RTT (ms) | Packet Loss (%) |
|-----------|--------|--------------|--------------|-------------|--------------|-----------------|
|           | ENV-01 | 200          |              |             |              |                 |
|           | ENV-02 | 200          |              |             |              |                 |
|           | ENV-03 | 200          |              |             |              |                 |

## 3. Critical Failure Analysis

Identify the RTT threshold where the PID tracking control becomes unstable or oscillates uncontrollably.

- **Unstable Threshold**: `[Threshold in ms]`
- **Observation**: [Describe system behavior at the threshold]

## 4. Optimization ROI (Delta Benchmark)

| Metric | Before Optimization | After Optimization | Improvement ($\Delta \%$) |
|--------|---------------------|--------------------|---------------------------|
| Avg RTT|                     |                    |                           |
| Jitter |                     |                    |                           |

**Reflections on Optimization**:
[Explain how the latency reduction improved high-speed cornering stability or other control metrics.]
