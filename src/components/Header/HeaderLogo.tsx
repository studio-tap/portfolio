import Image from 'next/image';
import React from 'react';

import type { StaticImageData } from 'next/image';

import logoBlack from '@/public/logo/logo-black.png';
import logoWhite from '@/public/logo/logo-white.png';

type HeaderLogoProps = {
  priority?: boolean;
};

type LogoConfig = {
  src: StaticImageData;
  alt: string;
  opacityClass: string;
  ariaHidden?: boolean;
};

// 共通のクラス名
const COMMON_CLASS = 'absolute inset-0 transition-opacity duration-200';

/**
 * テーマに応じて自動的に切り替わるロゴコンポーネント
 * ライトモード: logoBlack、ダークモード: logoWhite
 */
export const HeaderLogo = ({ priority = false }: HeaderLogoProps): React.ReactElement => {
  // ロゴの設定配列（差分のみを定義）
  const logos: LogoConfig[] = [
    {
      src: logoBlack,
      alt: 'STUDIO - TAP Logo',
      opacityClass: 'dark:opacity-0',
    },
    {
      src: logoWhite,
      alt: '',
      opacityClass: 'opacity-0 dark:opacity-100',
      ariaHidden: true,
    },
  ];

  return (
    <div className="relative h-6 w-6">
      {logos.map((logo, index) => (
        <Image
          key={index}
          alt={logo.alt}
          aria-hidden={logo.ariaHidden}
          className={`${COMMON_CLASS} ${logo.opacityClass}`}
          height={24}
          priority={priority}
          quality={100}
          src={logo.src}
          width={24}
        />
      ))}
    </div>
  );
};
