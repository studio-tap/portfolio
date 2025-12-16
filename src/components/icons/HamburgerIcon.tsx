import React from 'react';

type Props = {
  isOpen: boolean;
  className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

export const HamburgerIcon = ({ isOpen, className, ...rest }: Props) => {
  // --- 基本設計 (px) ---
  const containerPx = 24;
  const lineThickness = 2;

  // --- Y座標を計算 ---
  const topY = (containerPx - lineThickness * 3) / 4;
  const middleY = topY + (lineThickness + topY);
  const bottomY = middleY + (lineThickness + topY);

  const crossScale = 1 / 1.4142135623730951;

  const topWidth = containerPx;
  const middleWidth = topWidth * crossScale;
  const bottomWidth = middleWidth * crossScale;

  // 中心
  const centerY = (containerPx - lineThickness) / 2;
  const crossBottomOffset = containerPx - bottomWidth / 2 - containerPx / 2;

  // --- スタイル定義 ---
  const baseLineStyle: React.CSSProperties = {
    display: 'block',
    position: 'absolute',
    height: `${lineThickness}px`,
    backgroundColor: 'currentColor',
    transition: 'transform 0.1s ease',
  };

  const topLineStyle: React.CSSProperties = {
    ...baseLineStyle,
    top: `${topY}px`,
    left: '0px',
    width: `${topWidth}px`,
    transformOrigin: 'center',
    transform:
      isOpen ?
        `translateY(${centerY - topY}px) rotate(45deg) scaleX(${crossScale})`
      : 'translate(0) scaleX(1) rotate(0deg)',
  };

  const middleLineStyle: React.CSSProperties = {
    ...baseLineStyle,
    top: `${middleY}px`,
    right: '0px',
    width: `${middleWidth}px`,
    transformOrigin: 'right',
    opacity: isOpen ? 0 : 1,
    transform: isOpen ? `scaleX(${topWidth / middleWidth})` : `scaleX(1)`,
  };

  const bottomLineStyle: React.CSSProperties = {
    ...baseLineStyle,
    top: `${bottomY}px`,
    right: '0px',
    width: `${bottomWidth}px`,
    transformOrigin: 'center',
    transform:
      isOpen ?
        `translate(${-crossBottomOffset}px, ${centerY - bottomY}px) rotate(-45deg) scaleX(${middleWidth / bottomWidth})`
      : 'translate(0) scaleX(1) rotate(0deg)',
  };

  return (
    <button
      aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
      className={`relative h-6 w-6 focus:outline-none ${className}`}
      {...rest}
    >
      {/* 上の線 */}
      <span style={topLineStyle} />
      {/* 真ん中の線 */}
      <span style={middleLineStyle} />
      {/* 下の線 */}
      <span style={bottomLineStyle} />
    </button>
  );
};
