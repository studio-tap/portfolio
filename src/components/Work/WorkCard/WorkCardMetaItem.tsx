import type { ReactElement, ReactNode } from 'react';
import { Typography } from '@/components/Typography/Typography';

type Props = {
  children: ReactNode;
  as?: 'h2' | 'p';
  className?: string;
};

export const WorkCardMetaItem = ({ children, as = 'p', className }: Props): ReactElement => {
  return (
    <Typography as={as} variant="card-meta" className={`border-b border-foreground-light dark:border-foreground-dark mt-2 ${className}`}>
      {children}
    </Typography>
  );
};