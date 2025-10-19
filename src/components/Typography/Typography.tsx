import React from 'react';
import { clsx } from 'clsx';

const variants = {
  'body-normal': 'text-s leading-normal tracking-tight',
  'header-nav': 'text-xl leading-none tracking-tight',
  'logo-text': 'text-s leading-none tracking-none',
  'about-title': 'text-m leading-loose tracking-tight',
  'card-meta': 'text-s leading-normal tracking-tight',
  'card-technology': 'text-xs leading-none tracking-none',
};

type Variant = keyof typeof variants;


type BaseTypographyProps<C extends React.ElementType> = {
  as?: C;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type TypographyProps<C extends React.ElementType> = BaseTypographyProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof BaseTypographyProps<C>>;

export const Typography = <C extends React.ElementType = 'p'>({
  as,
  variant = 'body-normal',
  children,
  className,
  ...rest
}: TypographyProps<C>): React.ReactElement => {
  const Component = as || 'p';
  const variantClass = variants[variant];

  return (
    <Component className={clsx(variantClass, className)} {...rest}>
      {children}
    </Component>
  );
};
