import React from 'react';
import { useTouch } from '../hooks/useTouch';

const TouchFriendly = ({ 
  children, 
  onTap, 
  onLongPress, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown,
  className = '',
  disabled = false,
  hapticFeedback = true,
  rippleEffect = true,
  ...props 
}) => {
  const {
    ref,
    isPressed,
    isLongPress
  } = useTouch({
    onTap: disabled ? undefined : onTap,
    onLongPress: disabled ? undefined : onLongPress,
    onSwipeLeft: disabled ? undefined : onSwipeLeft,
    onSwipeRight: disabled ? undefined : onSwipeRight,
    onSwipeUp: disabled ? undefined : onSwipeUp,
    onSwipeDown: disabled ? undefined : onSwipeDown,
    preventDefault: false
  });

  const handleTap = (event) => {
    if (disabled) return;

    // Haptic feedback
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // Ripple effect
    if (rippleEffect) {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;

      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    if (onTap) {
      onTap(event);
    }
  };

  return (
    <div
      ref={ref}
      className={`touch-friendly ${className} ${disabled ? 'disabled' : ''} ${isPressed ? 'pressed' : ''}`}
      onClick={handleTap}
      {...props}
    >
      {children}
    </div>
  );
};

export default TouchFriendly; 