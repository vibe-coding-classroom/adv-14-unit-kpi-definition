/**
 * KPI Tracker Module
 * Handles data collection, latency accumulation, and event triggering for performance monitoring.
 */

class KPITracker {
    constructor() {
        this.samples = [];
        this.maxSamples = 200;
    }

    /**
     * Records a new latency sample and triggers UI updates if necessary.
     * @param {number} latency - The measured latency in ms.
     */
    recordSample(latency) {
        this.samples.push({
            timestamp: Date.now(),
            value: latency
        });

        if (this.samples.length > this.maxSamples) {
            this.samples.shift();
        }

        this.onSampleRecorded(latency);
    }

    /**
     * Callback triggered whenever a new sample is recorded.
     * To be overridden by the visualizer or main app.
     */
    onSampleRecorded(latency) {
        // Placeholder for event binding
    }

    /**
     * Calculates the average latency of the current sample set.
     */
    getAverageLatency() {
        if (this.samples.length === 0) return 0;
        const sum = this.samples.reduce((acc, s) => acc + s.value, 0);
        return sum / this.samples.length;
    }

    /**
     * Calculates the Jitter (Standard Deviation) of the latency.
     */
    getJitter() {
        if (this.samples.length < 2) return 0;
        const avg = this.getAverageLatency();
        const squareDiffs = this.samples.map(s => Math.pow(s.value - avg, 2));
        const avgSquareDiff = squareDiffs.reduce((acc, val) => acc + val, 0) / squareDiffs.length;
        return Math.sqrt(avgSquareDiff);
    }
}

export default KPITracker;
