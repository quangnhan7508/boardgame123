import React from 'react';

interface XiangqiIconProps {
  /** Lớp CSS tuỳ chỉnh (mặc định co giãn theo cỡ chữ như emoji). */
  className?: string;
  /** Màu quân cờ: đỏ (Tướng/Soái) hoặc đen (Tướng). */
  color?: 'red' | 'black';
}

/**
 * Biểu tượng quân cờ tướng (Xiangqi): vòng tròn gỗ khắc chữ 帥.
 * Unicode không có emoji cờ tướng nên dùng SVG để hiển thị đúng chất quân cờ.
 */
export const XiangqiIcon: React.FC<XiangqiIconProps> = ({
  className = 'inline-block h-[1em] w-[1em] align-[-0.125em]',
  color = 'red',
}) => {
  const ink = color === 'red' ? '#c81e1e' : '#1f2937';
  const gid = React.useId().replace(/:/g, '');
  const faceId = `xq-face-${gid}`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Cờ Tướng"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={faceId} cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#fff8e6" />
          <stop offset="62%" stopColor="#f2dbaa" />
          <stop offset="100%" stopColor="#d8b579" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${faceId})`} stroke={ink} strokeWidth="3" />
      <circle cx="32" cy="32" r="23.5" fill="none" stroke={ink} strokeWidth="1.5" opacity="0.7" />
      <text
        x="32"
        y="33"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="30"
        fontWeight="700"
        fill={ink}
        fontFamily={'"Noto Serif SC", "Songti SC", "STSong", "SimSun", serif'}
      >
        帥
      </text>
    </svg>
  );
};
