import React from 'react';

import { BaseLink } from './BaseLink';

import type { ComponentProps } from 'react';

type ExternalLinkProps = Omit<ComponentProps<typeof BaseLink>, 'target' | 'rel'>;

export const ExternalLink = ({ children, className = '', ...props }: ExternalLinkProps): React.ReactElement => {
  return (
    <BaseLink
      {...props}
      className={`inline-flex items-center gap-1 ${className}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span>{children}</span>
      <span
        className="ml-1"
        style={{ fontFamily: 'PlemolJP Icons' }}
      >
        
      </span>
    </BaseLink>
  );
};
