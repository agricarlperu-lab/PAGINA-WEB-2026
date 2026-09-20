import React, { useState, useEffect, useRef } from 'react';

export const PiñoncitoMascot: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const pupilLRef = useRef<HTMLDivElement>(null);
  const pupilRRef = useRef<HTMLDivElement>(null);

  const [bubbleText, setBubbleText] = useState('¡Bienvenido a Agricarl!');
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  // Dragging state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const clickStartRef = useRef<number>(0);

  // Initial welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      setBubbleVisible(true);
      setTimeout(() => setBubbleVisible(false), 4000);
    }, 1500);

    const interval = setInterval(() => {
      setBubbleVisible((prev) => {
        if (!prev) {
          setTimeout(() => setBubbleVisible(false), 4000);
          return true;
        }
        return prev;
      });
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Eye movement following mouse cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bodyRef.current || !pupilLRef.current || !pupilRRef.current) return;
      const rect = bodyRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const dist = 5;
      const moveX = Math.cos(angle) * dist;
      const moveY = Math.sin(angle) * dist;

      pupilLRef.current.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
      pupilRRef.current.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dragging handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    clickStartRef.current = Date.now();
    if (!stageRef.current) return;

    isDraggingRef.current = true;
    const rect = stageRef.current.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const newX = Math.max(10, Math.min(e.clientX - dragOffsetRef.current.x, window.innerWidth - 190));
    const newY = Math.max(10, Math.min(e.clientY - dragOffsetRef.current.y, window.innerHeight - 290));
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {
        // ignore
      }

      // If brief click, trigger jump & speech bubble
      if (Date.now() - clickStartRef.current < 250) {
        triggerJumpAndSpeak();
      }
    }
  };

  const triggerJumpAndSpeak = () => {
    setIsJumping(true);
    setBubbleText('¡Bienvenido a Agricarl!');
    setBubbleVisible(true);

    setTimeout(() => {
      setIsJumping(false);
    }, 600);

    setTimeout(() => {
      setBubbleVisible(false);
    }, 3800);
  };

  return (
    <div
      ref={stageRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: 'fixed',
        left: position ? `${position.x}px` : '30px',
        top: position ? `${position.y}px` : 'auto',
        bottom: position ? 'auto' : '30px',
        zIndex: 9999,
        width: '180px',
        height: '260px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
        paddingBottom: '20px',
      }}
      className="group"
      title="Mascota Piñoncito Agricarl - ¡Haz clic para animar!"
    >
      {/* Speech Bubble Chocolate */}
      <div
        className={`speech-bubble ${bubbleVisible ? 'visible' : ''}`}
        style={{
          background: '#5D3A1A',
          border: '2px solid #404040',
          borderRadius: '12px',
          padding: '8px 12px',
          marginBottom: '16px',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          width: '150px',
          textAlign: 'center',
          opacity: bubbleVisible ? 1 : 0,
          transform: bubbleVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          position: 'relative',
          pointerEvents: 'none',
        }}
      >
        {bubbleText}
        <div
          style={{
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '10px 10px 0 10px',
            borderStyle: 'solid',
            borderColor: '#5D3A1A transparent transparent transparent',
          }}
        />
      </div>

      {/* Mascot Body Container */}
      <div
        ref={bodyRef}
        style={{
          width: '115px',
          height: '115px',
          position: 'relative',
          filter: 'drop-shadow(4px 8px 6px rgba(0,0,0,0.35))',
          marginBottom: '35px',
          transform: isJumping ? 'translateY(-50px) scale(1.1)' : 'translateY(0)',
          transition: isJumping ? 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.3s ease',
        }}
      >
        {/* Arm Left */}
        <div
          style={{
            position: 'absolute',
            width: '35px',
            height: '12px',
            background: 'linear-gradient(to bottom, #d1d1d1, #7a7a7a)',
            border: '1px solid #555',
            borderRadius: '6px',
            top: '50px',
            left: '-25px',
            zIndex: -1,
            transformOrigin: 'right center',
            animation: 'wave-left 4s ease-in-out infinite',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '22px',
              height: '22px',
              background: '#fdfdfd',
              border: '2px solid #333',
              borderRadius: '8px 3px 3px 8px',
              top: '-6px',
              left: '-15px',
            }}
          />
        </div>

        {/* Arm Right */}
        <div
          style={{
            position: 'absolute',
            width: '35px',
            height: '12px',
            background: 'linear-gradient(to bottom, #d1d1d1, #7a7a7a)',
            border: '1px solid #555',
            borderRadius: '6px',
            top: '50px',
            right: '-25px',
            zIndex: -1,
            transformOrigin: 'left center',
            animation: 'wave-right 3s ease-in-out infinite',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '22px',
              height: '22px',
              background: '#fdfdfd',
              border: '2px solid #333',
              borderRadius: '3px 8px 8px 3px',
              top: '-6px',
              right: '-15px',
            }}
          />
        </div>

        {/* Face Container */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '60px',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%',
              marginBottom: '2px',
            }}
          >
            {/* Eye Left */}
            <div
              style={{
                width: '20px',
                height: '24px',
                background: '#fdfdfd',
                border: '2px solid #404040',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'inset 1px 2px 4px rgba(0,0,0,0.4)',
                animation: 'blink 4s infinite',
              }}
            >
              <div
                ref={pupilLRef}
                style={{
                  width: '10px',
                  height: '10px',
                  background: '#1a1a1a',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>

            {/* Eye Right */}
            <div
              style={{
                width: '20px',
                height: '24px',
                background: '#fdfdfd',
                border: '2px solid #404040',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'inset 1px 2px 4px rgba(0,0,0,0.4)',
                animation: 'blink 4s infinite',
              }}
            >
              <div
                ref={pupilRRef}
                style={{
                  width: '10px',
                  height: '10px',
                  background: '#1a1a1a',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>
          </div>

          {/* Mouth */}
          <div
            style={{
              width: isJumping ? '38px' : '32px',
              height: isJumping ? '16px' : '8px',
              background: '#3a1a1a',
              border: '3px solid #1a1a1a',
              borderRadius: '0 0 25px 25px',
              marginTop: '6px',
              position: 'relative',
              overflow: 'hidden',
              animation: 'talk-smile 2s ease-in-out infinite',
              transformOrigin: 'top center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {/* Tongue */}
            <div
              style={{
                position: 'absolute',
                bottom: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '16px',
                height: '10px',
                background: '#ff4d4d',
                borderRadius: '50%',
              }}
            />
          </div>
        </div>

        {/* Metal Gear Body SVG */}
        <svg
          style={{
            width: '100%',
            height: '100%',
            animation: 'spin-slow 15s linear infinite',
          }}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff' }} />
              <stop offset="40%" style={{ stopColor: '#b0b0b0' }} />
              <stop offset="60%" style={{ stopColor: '#d0d0d0' }} />
              <stop offset="100%" style={{ stopColor: '#404040' }} />
            </linearGradient>
          </defs>
          <path
            style={{
              fill: 'url(#metalGradient)',
              stroke: '#666',
              strokeWidth: 0.5,
            }}
            d="M94.5,43.5l-9.1-1.5c-0.6-2.1-1.4-4.1-2.5-6l5.7-7.4c0.8-1,0.7-2.4-0.2-3.3L81.7,18.5c-0.9-0.9-2.3-1-3.3-0.2L71,24c-1.9-1.1-3.9-1.9-6-2.5L63.5,12.4C63.3,11.1,62.2,10.1,60.9,10.1H46.1c-1.3,0-2.4,1-2.6,2.3L42,21.5c-2.1,0.6-4.1,1.4-6,2.5l-7.4-5.7c-1-0.8-2.4-0.7-3.3,0.2L18.5,25.3c-0.9,0.9-1,2.3-0.2,3.3l5.7,7.4c-1.1,1.9-1.9,3.9-2.5,6l-9.1,1.5c-1.3,0.2-2.3,1.3-2.3,2.6v14.8c0,1.3,1,2.4,2.3,2.6l9.1,1.5c0.6,2.1,1.4,4.1,2.5,6l-5.7,7.4c-0.8,1-0.7,2.4,0.2,3.3l6.7,6.7c0.9,0.9,2.3,1,3.3,0.2l7.4-5.7c1.9,1.1,3.9,1.9,6,2.5l1.5,9.1c0.2,1.3,1.3,2.3,2.6,2.3h14.8c1.3,0,2.4-1,2.6-2.3l1.5-9.1c2.1-0.6,4.1-1.4,6-2.5l7.4,5.7c1,0.8,2.4,0.7,3.3-0.2l6.7-6.7c0.9-0.9,1-2.3,0.2-3.3l-5.7-7.4c1.1-1.9,1.9-3.9,2.5-6l9.1-1.5c1.3-0.2,2.3-1.3,2.3-2.6V46.1C96.8,44.8,95.8,43.7,94.5,43.5z M53.5,67.3c-7.3,0-13.3-6-13.3-13.3c0-7.3,6-13.3,13.3-13.3s13.3,6,13.3,13.3C66.8,61.3,60.8,67.3,53.5,67.3z"
          />
        </svg>

        {/* Leg Left */}
        <div
          style={{
            position: 'absolute',
            width: '12px',
            height: '40px',
            background: 'linear-gradient(to right, #7a7a7a, #d1d1d1, #7a7a7a)',
            border: '1px solid #555',
            bottom: '-35px',
            left: '25px',
            zIndex: -1,
            transformOrigin: 'top center',
            animation: 'kick 2.5s ease-in-out infinite',
          }}
        >
          {/* Sneaker */}
          <div
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: '-12px',
              width: '40px',
              height: '24px',
              background: '#333',
              borderRadius: '12px 20px 5px 5px',
              border: '1px solid #111',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '5px',
                left: '10px',
                width: '15px',
                height: '2px',
                background: 'white',
                boxShadow: '0 4px 0 white',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '8px',
                background: '#ffffff',
                borderRadius: '0 0 5px 5px',
                borderTop: '1px solid #ddd',
              }}
            />
          </div>
        </div>

        {/* Leg Right */}
        <div
          style={{
            position: 'absolute',
            width: '12px',
            height: '40px',
            background: 'linear-gradient(to right, #7a7a7a, #d1d1d1, #7a7a7a)',
            border: '1px solid #555',
            bottom: '-35px',
            right: '25px',
            zIndex: -1,
            transformOrigin: 'top center',
            animation: 'kick 2.5s ease-in-out infinite reverse',
          }}
        >
          {/* Sneaker */}
          <div
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: '-12px',
              width: '40px',
              height: '24px',
              background: '#333',
              borderRadius: '12px 20px 5px 5px',
              border: '1px solid #111',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '5px',
                left: '10px',
                width: '15px',
                height: '2px',
                background: 'white',
                boxShadow: '0 4px 0 white',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '8px',
                background: '#ffffff',
                borderRadius: '0 0 5px 5px',
                borderTop: '1px solid #ddd',
              }}
            />
          </div>
        </div>
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wave-left {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(-45deg); }
        }
        @keyframes wave-right {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(50deg); }
        }
        @keyframes kick {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes talk-smile {
          0%, 100% { 
            height: 6px; 
            width: 28px;
            border-radius: 0 0 15px 15px;
          }
          50% { 
            height: 14px; 
            width: 36px;
            border-radius: 0 0 25px 25px;
          }
        }
      `}</style>
    </div>
  );
};
