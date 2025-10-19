import React from 'react';

type Props = {
  isOpen: boolean;
  className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

export const HamburgerIcon = ({ isOpen, className, ...rest }: Props) => {
  // --- 基本設計 (px) ---
  const containerPx = 24;
  const lineThickness = 2;
  // 全ての余白（上下、線間）を均等にするための計算
  const margin = (containerPx - lineThickness * 3) / 4; // (24 - 6) / 4 = 4.5px

  // --- Y座標を計算 ---
  const topY = margin;
  const middleY = margin + lineThickness + margin;
  const bottomY = middleY + lineThickness + margin;

  // --- スタイル定義 ---
  const baseLineStyle: React.CSSProperties = {
    display: 'block',
    position: 'absolute',
    height: `${lineThickness}px`,
    backgroundColor: 'currentColor',
    transition: 'all 0.1s ease-in-out',
  };

  // アニメーション後（'×'の状態）の線の幅と、それを中央に配置するための左右の余白
  const crossLineWidth = (containerPx + containerPx / 2) / 2;
  const crossLineMarginX = (containerPx - crossLineWidth) / 2;

  const topLineStyle: React.CSSProperties = {
    ...baseLineStyle,
    top: `${isOpen ? containerPx / 2 - lineThickness / 2 : topY}px`,
    left: `${isOpen ? crossLineMarginX : 0}px`,
    width: `${isOpen ? crossLineWidth : containerPx}px`,
    transform: isOpen ? 'rotate(45deg)' : 'none',
  };

  const middleLineStyle: React.CSSProperties = {
    ...baseLineStyle,
    top: `${middleY}px`,
    right: '0px',
    width: `${(containerPx + containerPx / 2) / 2}px`,
    opacity: isOpen ? 0 : 1,
  };

  const bottomLineStyle: React.CSSProperties = {
    ...baseLineStyle,
    top: `${isOpen ? containerPx / 2 - lineThickness / 2 : bottomY}px`,
    right: `${isOpen ? crossLineMarginX : 0}px`,
    width: `${isOpen ? crossLineWidth : containerPx / 2}px`,
    transform: isOpen ? 'rotate(-45deg)' : 'none',
  };

  return (
    <button
      className={`relative w-6 h-6 focus:outline-none ${className}`}
      aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
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