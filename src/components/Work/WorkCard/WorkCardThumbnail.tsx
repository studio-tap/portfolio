import type { ReactElement } from 'react';
import type { MicroCMSImage } from 'microcms-js-sdk';

type Props = {
  thumbnail?: MicroCMSImage;
  title: string;
};

export const WorkCardThumbnail = ({ thumbnail, title }: Props): ReactElement | null => {
  if (!thumbnail) {
    return null;
  }

  return (
    <img
      src={thumbnail.url}
      alt={`${title}のサムネイル`}
      width={thumbnail.width}
      height={thumbnail.height}
      className="my-4 rounded-md object-cover w-full"
    />
  );
};
