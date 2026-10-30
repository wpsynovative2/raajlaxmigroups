/** The Raajlaxmi "rising towers" mark, with optional build-up animation. */
export default function BrandMark({
  className = "",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const bars = [
    { x: 0, h: 34 },
    { x: 13, h: 48 },
    { x: 26, h: 62 },
    { x: 39, h: 76 },
  ];
  return (
    <svg viewBox="0 0 50 80" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="rl-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d79a" />
          <stop offset="1" stopColor="#c39f59" />
        </linearGradient>
      </defs>
      {bars.map((bar, i) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={80 - bar.h}
          width="10"
          height={bar.h}
          rx="1"
          fill="url(#rl-gold)"
          style={
            animated
              ? {
                  transformOrigin: "bottom",
                  transformBox: "fill-box",
                  animation: `rl-rise 1.4s ${i * 0.14}s cubic-bezier(0.22,1,0.36,1) infinite`,
                }
              : undefined
          }
        />
      ))}
      {animated && (
        <style>{`@keyframes rl-rise{0%{transform:scaleY(0);opacity:.2}45%,75%{transform:scaleY(1);opacity:1}100%{transform:scaleY(1);opacity:.2}}`}</style>
      )}
    </svg>
  );
}
