import React, { useEffect, useState } from 'react';

/**
 * CursorGlow – custom cursor follower with radial gradient glow.
 * Hidden on mobile/touch devices for performance.
 */
export default function CursorGlow() {
    const [pos, setPos] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <div
            className="pointer-events-none fixed z-[9999] hidden md:block"
            style={{
                left: pos.x - 200,
                top: pos.y - 200,
                width: 400,
                height: 400,
                background:
                    'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)',
                borderRadius: '50%',
                transition: 'left 0.1s ease-out, top 0.1s ease-out',
            }}
        />
    );
}
