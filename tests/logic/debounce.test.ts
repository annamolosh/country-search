import { debounce } from '../../src/logic/debounce.js'
import { describe, it , expect, vi} from 'vitest';

describe('debounce', ()=> {
    it('should not call the function immediately', ()=>{
        vi.useFakeTimers();
        const callback = vi.fn();
        const debouncedCallBack = debounce(callback,500);
        debouncedCallBack()
        
        expect(callback).not.toHaveBeenCalled()
        vi.useRealTimers()
    })
    it('should call the function after delay', ()=>{
        vi.useFakeTimers();
        const callback = vi.fn();
        const debouncedCallBack = debounce(callback,500);
        debouncedCallBack()

        vi.advanceTimersByTime(500)
        expect(callback).toHaveBeenCalledTimes(1)
        vi.useRealTimers()
    })
    it('should reset the timer when called again', () => {
        vi.useFakeTimers();
        const callback = vi.fn();
        const debouncedCallBack = debounce(callback, 500);
        debouncedCallBack();

        vi.advanceTimersByTime(300);
        debouncedCallBack();

        vi.advanceTimersByTime(300);
        expect(callback).not.toHaveBeenCalled();

        vi.advanceTimersByTime(200);
        expect(callback).toHaveBeenCalledTimes(1);

        vi.useRealTimers()
    });
})