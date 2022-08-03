import { logPerf } from './logPerf';
export const tick = (onTick:()=>void) => (currentTimeStamp: DOMHighResTimeStamp = 0) => {
    const start: DOMHighResTimeStamp = performance.now();
    window.requestAnimationFrame(tick(onTick));
    onTick();
    logPerf(start, currentTimeStamp);
};




