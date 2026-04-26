/**
 * Telemetry Visualizer Module
 * Responsible for calculating RTT and updating the UI based on performance KPIs.
 */

class TelemetryVisualizer {
    constructor() {
        this.rtt = 0;
        this.status = 'UNKNOWN'; // GREEN, YELLOW, RED
    }

    /**
     * Calculate Round Trip Time (RTT) based on ping/pong timestamps.
     * @param {number} sendTime - Timestamp when the ping was sent.
     * @param {number} receiveTime - Timestamp when the pong was received.
     * @returns {number} The calculated RTT in milliseconds.
     */
    calculateRTT(sendTime, receiveTime) {
        // TODO: Implement RTT calculation logic
        this.rtt = receiveTime - sendTime;
        this.updateTrafficLight();
        return this.rtt;
    }

    /**
     * Update the UI "Traffic Light" indicator based on the current RTT.
     * Logic:
     * - Green: < 80ms
     * - Yellow: 80ms - 120ms
     * - Red: > 120ms
     */
    updateTrafficLight() {
        if (typeof document === 'undefined') {
            // Mock behavior for non-browser environments
            if (this.rtt < 80) this.status = 'GREEN';
            else if (this.rtt <= 120) this.status = 'YELLOW';
            else this.status = 'RED';
            console.log(`[KPI (Mock)] RTT: ${this.rtt}ms | Status: ${this.status}`);
            return;
        }

        const indicator = document.getElementById('perf-indicator');
        if (!indicator) return;

        if (this.rtt < 80) {
            this.status = 'GREEN';
            indicator.style.backgroundColor = '#2ecc71'; // Emerald Green
        } else if (this.rtt <= 120) {
            this.status = 'YELLOW';
            indicator.style.backgroundColor = '#f1c40f'; // Sunflower Yellow
        } else {
            this.status = 'RED';
            indicator.style.backgroundColor = '#e74c3c'; // Alizarin Red
        }
        
        console.log(`[KPI] RTT: ${this.rtt}ms | Status: ${this.status}`);
    }
}

export default TelemetryVisualizer;
