/**
 * Latency Emulator Utility
 * Used to inject artificial delays into the communication pipeline to test UI responsiveness and KPI alerts.
 */

class LatencyEmulator {
    constructor(baseLatency = 50, fluctuation = 10) {
        this.baseLatency = baseLatency;
        this.fluctuation = fluctuation;
        this.isMalicious = false; // If true, injects high latency (> 200ms)
    }

    /**
     * Simulates a network request with injected latency.
     * @param {Function} task - The task to perform after the delay.
     */
    simulateRequest(task) {
        let delay = this.baseLatency + (Math.random() * this.fluctuation * 2 - this.fluctuation);
        
        if (this.isMalicious) {
            delay += 150 + Math.random() * 100; // Inject 150-250ms extra
        }

        console.log(`[Emulator] Injecting ${delay.toFixed(2)}ms latency...`);
        
        setTimeout(() => {
            const start = Date.now();
            task();
            const end = Date.now();
            // Note: In a real scenario, this would be the pong timestamp
        }, delay);
    }

    /**
     * Toggles "Stress Mode" where latency exceeds the safety threshold.
     */
    toggleStressMode(enabled) {
        this.isMalicious = enabled;
        console.warn(`[Emulator] Stress Mode: ${enabled ? 'ENABLED' : 'DISABLED'}`);
    }
}

export default LatencyEmulator;
