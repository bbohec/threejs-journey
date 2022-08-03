import { floatWithDecimal, quartile } from "../math/mathUtils";

export const ticker = (onTick: () => void, isPerformanceCheck: boolean = false) => (currentTimeStamp: DOMHighResTimeStamp = 0): void => {
    window.requestAnimationFrame(ticker(onTick, isPerformanceCheck));
    onTick();
    isPerformanceCheck && performanceCheck(currentTimeStamp, performance.now());
};


type TicksPerformance = {
    "average": number,
    "max": number,
    "min": number,
    "95th": number,
}
type Performance = {
    fps: number,
    "ticksPerformance_%": TicksPerformance
}
const performanceCheck = (currentTimeStamp:DOMHighResTimeStamp,endOfTickTimestamp:DOMHighResTimeStamp) => {
    const deltaTime = currentTimeStamp - previousTimeStamp 
    tickPerformances.unshift(deltaTime === 0 ? 0 : floatWithDecimal((endOfTickTimestamp - currentTimeStamp) / deltaTime * 100))
    const fps = Math.round(1000 / deltaTime);
    if (tickPerformances.length >= fps) {
        const perf:Performance = {
            fps:tickPerformances.length,
            "ticksPerformance_%": {
                "average": floatWithDecimal(tickPerformances.reduce((a, b) => a + b, 0) / tickPerformances.length),
                "95th": floatWithDecimal(quartile(tickPerformances, 95)),
                "max": Math.max(...tickPerformances),
                "min": Math.min(...tickPerformances),
            }   
        }
        console.log(`${perf.fps}fps`,"ticksPerf %",perf["ticksPerformance_%"])
        tickPerformances.splice(0)
    }
    previousTimeStamp = currentTimeStamp
}
let previousTimeStamp:DOMHighResTimeStamp = 0
const tickPerformances:number[] = []