import type { ReactElement } from 'react';
import type { MicroCMSImage } from 'microcms-js-sdk';
import Image from 'next/image';

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
      src={thumbnail.url}
      alt={`サムネイル_${title}`}
      width={thumbnail.width}
      height={thumbnail.height}
      className="object-cover w-full border-2 border-gray-300"
    />
  );
};