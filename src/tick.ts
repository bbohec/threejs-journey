import { logPerf } from './logPerf';
export const tick = (onTick:()=>void,performanceCheck:boolean = false) => (currentTimeStamp: DOMHighResTimeStamp = 0):void => {
    if (performanceCheck) {
        const start: DOMHighResTimeStamp = performance.now();
        executeTick(onTick,performanceCheck);
        logPerf(start, currentTimeStamp);
    } else executeTick(onTick,performanceCheck);
    
};
function executeTick(onTick: () => void,performanceCheck:boolean) {
    window.requestAnimationFrame(tick(onTick,performanceCheck));
    onTick();
}

