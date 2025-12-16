import Image from 'next/image';

import type { MicroCMSImage } from 'microcms-js-sdk';
import type { ReactElement } from 'react';

type Props = {
  thumbnail?: MicroCMSImage;
  title: string;
};

export const WorkCardThumbnail = ({ thumbnail, title }: Props): ReactElement | null => {
  if (!thumbnail) {
    return null;
  }

  return (
    <Image
      alt={`サムネイル_${title}`}
      className="w-full border-2 border-gray-300 object-cover"
      height={thumbnail.height}
      src={thumbnail.url}
      width={thumbnail.width}
    />
  );
};
