const framerateMessage = (frameDurationMs: number) => `${Math.round(1000 / frameDurationMs)} fps`;
const tickPerformanceUsage = (tickStart: DOMHighResTimeStamp, previousFrameDurationMs: DOMHighResTimeStamp): string => `${Math.round((performance.now() - tickStart) / previousFrameDurationMs * 100)}%`;

let previousTimeStamp:DOMHighResTimeStamp = 0
export const logPerf = (tickStart: DOMHighResTimeStamp,currentTimeStamp:DOMHighResTimeStamp) => {
    const diffTimeStamp = currentTimeStamp - previousTimeStamp 
    console.log(`${framerateMessage(diffTimeStamp)} ${tickPerformanceUsage(tickStart, diffTimeStamp)}`)
    previousTimeStamp = currentTimeStamp
}
