import KPITracker from '../src/kpi_tracker.js';
import TelemetryVisualizer from '../src/telemetry_visualizer.js';

async function runTests() {
    console.log('🚀 Starting KPI Definition Auto-Grading Tests...\n');
    let passed = 0;
    let total = 0;

    function assert(condition, message) {
        total++;
        if (condition) {
            passed++;
            console.log(`✅ [PASS] ${message}`);
        } else {
            console.error(`❌ [FAIL] ${message}`);
        }
    }

    // Test 1: RTT Calculation
    try {
        const visualizer = new TelemetryVisualizer();
        const rtt = visualizer.calculateRTT(1000, 1050);
        assert(rtt === 50, 'calculateRTT should correctly calculate the difference (50ms)');
    } catch (e) {
        assert(false, `calculateRTT failed with error: ${e.message}`);
    }

    // Test 2: Traffic Light Status Logic (Green)
    try {
        const visualizer = new TelemetryVisualizer();
        visualizer.calculateRTT(1000, 1070); // 70ms
        assert(visualizer.status === 'GREEN', 'Status should be GREEN for latency < 80ms');
    } catch (e) {
        assert(false, `Traffic Light (Green) failed: ${e.message}`);
    }

    // Test 3: Traffic Light Status Logic (Yellow)
    try {
        const visualizer = new TelemetryVisualizer();
        visualizer.calculateRTT(1000, 1100); // 100ms
        assert(visualizer.status === 'YELLOW', 'Status should be YELLOW for latency 80-120ms');
    } catch (e) {
        assert(false, `Traffic Light (Yellow) failed: ${e.message}`);
    }

    // Test 4: Traffic Light Status Logic (Red)
    try {
        const visualizer = new TelemetryVisualizer();
        visualizer.calculateRTT(1000, 1150); // 150ms
        assert(visualizer.status === 'RED', 'Status should be RED for latency > 120ms');
    } catch (e) {
        assert(false, `Traffic Light (Red) failed: ${e.message}`);
    }

    // Test 5: KPI Tracker - Average Latency
    try {
        const tracker = new KPITracker();
        tracker.recordSample(50);
        tracker.recordSample(150);
        assert(tracker.getAverageLatency() === 100, 'getAverageLatency should return 100 for samples [50, 150]');
    } catch (e) {
        assert(false, `getAverageLatency failed: ${e.message}`);
    }

    // Test 6: KPI Tracker - Jitter Calculation
    try {
        const tracker = new KPITracker();
        tracker.recordSample(100);
        tracker.recordSample(100);
        tracker.recordSample(100);
        assert(tracker.getJitter() === 0, 'getJitter should return 0 for identical samples');
        
        tracker.recordSample(110);
        tracker.recordSample(90);
        const jitter = tracker.getJitter();
        assert(jitter > 0, `getJitter should be > 0 for varying samples (got ${jitter})`);
    } catch (e) {
        assert(false, `getJitter failed: ${e.message}`);
    }

    console.log(`\n📊 Summary: ${passed}/${total} tests passed.`);
    if (passed === total) {
        console.log('🌟 All tests passed successfully!');
        process.exit(0);
    } else {
        console.log('⚠️ Some tests failed. Please check your implementation.');
        process.exit(1);
    }
}

runTests();
