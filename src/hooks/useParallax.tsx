import { useEffect, useRef, useState } from 'react';

export const useParallax = (multiplier = 0.2) => {
    const ref = useRef<HTMLElement | null>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        let mounted = true;
        const handle = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const y = rect.top;
            if (mounted) setOffset(-y * multiplier);
        };

        const onScroll = () => requestAnimationFrame(handle);
        handle();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            mounted = false;
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [multiplier]);

    return { ref, offset };
};

export default useParallax;
