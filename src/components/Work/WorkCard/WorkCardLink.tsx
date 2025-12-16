import type { ReactElement } from 'react';

import { ExternalLink } from '@/components/Link/ExternalLink';
import { Typography } from '@/components/Typography/Typography';

type Props = {
  url?: string;
};

export const WorkCardLink = ({ url }: Props): ReactElement | null => {
  if (!url) {
    return null;
  }

  return (
    <Typography
      as={ExternalLink}
      className="inline-block"
      href={url}
      variant="body-normal"
    >
      VIEW SITE
    </Typography>
  );
};
