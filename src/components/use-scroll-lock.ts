import { useEffect, useRef } from 'react';

export function useScrollLock() {
  const scrollPositionRef = useRef({ x: 0, y: 0 });

  const lockScroll = () => {
    // Store current scroll position
    scrollPositionRef.current = {
      x: window.scrollX,
      y: window.scrollY
    };

    // Lock the scroll position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPositionRef.current.y}px`;
    document.body.style.left = `-${scrollPositionRef.current.x}px`;
    document.body.style.width = '100%';
  };

  const unlockScroll = () => {
    // Restore scroll position
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';

    // Restore scroll position
    window.scrollTo({
      top: scrollPositionRef.current.y,
      left: scrollPositionRef.current.x,
      behavior: 'instant'
    });
  };

  const preserveScrollPosition = (callback: () => void) => {
    const currentPosition = {
      x: window.scrollX,
      y: window.scrollY
    };

    callback();

    // Use multiple methods to ensure scroll position is preserved
    const restorePosition = () => {
      window.scrollTo({
        top: currentPosition.y,
        left: currentPosition.x,
        behavior: 'instant'
      });
    };

    restorePosition();
    requestAnimationFrame(restorePosition);
    setTimeout(restorePosition, 0);
    setTimeout(restorePosition, 10);
  };

  return {
    lockScroll,
    unlockScroll,
    preserveScrollPosition
  };
}