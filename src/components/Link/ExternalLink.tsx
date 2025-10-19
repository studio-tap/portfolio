import React from 'react';
import { BaseLink } from './BaseLink';
import { ComponentProps } from 'react';

type ExternalLinkProps = Omit<ComponentProps<typeof BaseLink>, 'target' | 'rel'>;

export const ExternalLink = ({ children, className = '', ...props }: ExternalLinkProps): React.ReactElement => {
  return (
    <BaseLink
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 ${className}`}>
      <span>{children}</span>
      <span style={{ fontFamily: 'PlemolJP Icons' }} className="ml-1"></span>
    </BaseLink>
  );
};
