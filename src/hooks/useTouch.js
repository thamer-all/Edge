import { useState, useEffect, useRef } from 'react';

export const useTouch = (options = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onLongPress,
    longPressDelay = 500,
    swipeThreshold = 50,
    preventDefault = true
  } = options;

  const [isPressed, setIsPressed] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [isLongPress, setIsLongPress] = useState(false);
  const longPressTimer = useRef(null);
  const elementRef = useRef(null);

  const getTouchPosition = (event) => {
    const touch = event.touches?.[0] || event;
    return {
      x: touch.clientX,
      y: touch.clientY
    };
  };

  const handleTouchStart = (event) => {
    if (preventDefault) {
      event.preventDefault();
    }

    const pos = getTouchPosition(event);
    setStartPos(pos);
    setCurrentPos(pos);
    setIsPressed(true);
    setIsLongPress(false);

    // Start long press timer
    longPressTimer.current = setTimeout(() => {
      setIsLongPress(true);
      if (onLongPress) {
        onLongPress(event);
      }
    }, longPressDelay);
  };

  const handleTouchMove = (event) => {
    if (preventDefault) {
      event.preventDefault();
    }

    const pos = getTouchPosition(event);
    setCurrentPos(pos);

    // Clear long press timer if moved
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchEnd = (event) => {
    if (preventDefault) {
      event.preventDefault();
    }

    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    const deltaX = currentPos.x - startPos.x;
    const deltaY = currentPos.y - startPos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Only trigger swipe if not a long press and moved enough
    if (!isLongPress && distance > swipeThreshold) {
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight(event);
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft(event);
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown(event);
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp(event);
        }
      }
    } else if (!isLongPress && distance < 10 && onTap) {
      // Tap (small movement)
      onTap(event);
    }

    setIsPressed(false);
    setIsLongPress(false);
  };

  const handleTouchCancel = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setIsPressed(false);
    setIsLongPress(false);
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });
    element.addEventListener('touchcancel', handleTouchCancel, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [startPos, currentPos, isLongPress]);

  return {
    ref: elementRef,
    isPressed,
    isLongPress,
    startPos,
    currentPos
  };
};

export const useSwipeNavigation = (navigate) => {
  const handleSwipeLeft = () => {
    // Navigate forward or next item
    navigate(1);
  };

  const handleSwipeRight = () => {
    // Navigate backward or previous item
    navigate(-1);
  };

  return useTouch({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    swipeThreshold: 80
  });
};

export const usePullToRefresh = (onRefresh) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const refreshThreshold = 100;

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleSwipeDown = () => {
    if (pullDistance > refreshThreshold && !isRefreshing) {
      setIsRefreshing(true);
      onRefresh().finally(() => {
        setIsRefreshing(false);
        setPullDistance(0);
      });
    }
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const deltaY = touch.clientY - startPos.y;
    
    if (deltaY > 0) {
      setPullDistance(deltaY);
    }
  };

  return {
    isRefreshing,
    pullDistance,
    refreshThreshold,
    handleTouchStart,
    handleTouchMove,
    handleSwipeDown
  };
}; 