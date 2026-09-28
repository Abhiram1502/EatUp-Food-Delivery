import { useMemo } from "react";

const emojis = ["🍔", "🍕", "🍟", "🍜", "☕", "🍗", "🥪"];

function FloatingEmojis({ count = 25 }) {

  const floatingEmojis = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 30,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
  }, [count]);

  return (
    <>
      {/* 🔥 INLINE CSS */}
      <style>
        {`
          .floating-container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
          }

          .emoji {
            position: absolute;
            opacity: 0.2;
            animation: floatMove ease-in-out infinite;
          }

          @keyframes floatMove {
            0% { transform: translate(0, 0); }
            25% { transform: translate(10px, -20px); }
            50% { transform: translate(-10px, -30px); }
            75% { transform: translate(15px, -10px); }
            100% { transform: translate(0, 0); }
          }
        `}
      </style>

      {/* 🔥 EMOJIS */}
      <div className="floating-container">
        {floatingEmojis.map((item) => (
          <span
            key={item.id}
            className="emoji"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              fontSize: `${item.size}px`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>
    </>
  );
}

export default FloatingEmojis;