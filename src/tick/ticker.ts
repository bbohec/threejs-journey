import { floatWithDecimal, quartile } from "../math/mathUtils";

export const ticker = 
    (onTick: () => void,fpsLimit:number|undefined = undefined, isPerformanceCheck: boolean = false) => 
    (currentTimeStamp: DOMHighResTimeStamp = 0): void => {
        window.requestAnimationFrame(ticker(onTick,fpsLimit, isPerformanceCheck));
        fpsLimit 
            ? fpsLimiter(1000 / fpsLimit, currentTimeStamp, ()=>animate(onTick, isPerformanceCheck, currentTimeStamp))
            : animate(onTick, isPerformanceCheck, currentTimeStamp)
        
    };

const fpsLimiter = (interval: number, currentTimeStamp: number, onFps:()=>void) => {
    const delta = currentTimeStamp - ajustedPreviousTimeStamp;
    if (delta > interval) {
        ajustedPreviousTimeStamp = currentTimeStamp - (delta % interval);
        onFps()
    }
}

const animate = (onTick: () => void, isPerformanceCheck: boolean, currentTimeStamp: number):void =>  {
    onTick()
    if (isPerformanceCheck) performanceCheck(currentTimeStamp, performance.now());
}



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
const performanceCheck = (startTimeStamp:DOMHighResTimeStamp,endTimeStamp:DOMHighResTimeStamp) => {
    const deltaTime = startTimeStamp - previousTimeStamp 
    tickPerformances.unshift(deltaTime === 0 ? 0 : floatWithDecimal((endTimeStamp - startTimeStamp) / deltaTime * 100))
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
    previousTimeStamp = startTimeStamp
}
let previousTimeStamp:DOMHighResTimeStamp = 0
let ajustedPreviousTimeStamp:DOMHighResTimeStamp = 0
const tickPerformances:number[] = []




