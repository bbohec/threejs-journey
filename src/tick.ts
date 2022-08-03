import { logPerf } from './logPerf';
import { renderer, scene, camera } from './script';

export const tick = (currentTimeStamp: DOMHighResTimeStamp = 0) => {
    window.requestAnimationFrame(tick);
    const start: DOMHighResTimeStamp = performance.now();
    renderer.render(scene, camera);
    logPerf(start, currentTimeStamp);
};
