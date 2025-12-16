import Image from 'next/image';
import React from 'react';

import aboutImg from '@/public/about.jpg';

/**
 * Aboutページの画像セクションコンポーネント
 * @todo 将来的にはmicroCMSから取得した複数の画像をランダムに表示する
 */
export const AboutImage = (): React.ReactElement => {
  return (
    <div className="relative mt-12 min-h-[540px] flex-grow">
      <Image
        alt=""
        className="object-cover"
        fill
        priority
        src={aboutImg}
      />
    </div>
  );
};
