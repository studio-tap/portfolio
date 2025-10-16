import React from 'react';
import Image from 'next/image';
import aboutImg from '@/public/about.jpg';

/**
 * Aboutページの画像セクションコンポーネント
 * @todo 将来的にはmicroCMSから取得した複数の画像をランダムに表示する
 */
export const AboutImage = (): React.ReactElement => {
  return (
    <div className="relative flex-grow mt-12 min-h-[540px]">
      <Image
        src={aboutImg}
        alt=""
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};