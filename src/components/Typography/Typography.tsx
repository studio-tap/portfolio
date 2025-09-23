import React from 'react';

const variants = {
  'body-normal': 'text-m leading-normal tracking-normal',
};

type Variant = keyof typeof variants;


type BaseTypographyProps<C extends React.ElementType> = {
  as?: C;
  variant: Variant;
  className?: string;
  children: React.ReactNode;
};

type TypographyProps<C extends React.ElementType> = BaseTypographyProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof BaseTypographyProps<C>>;

export const Typography = <C extends React.ElementType = 'p'>({
  as,
  variant,
  children,
  className,
  ...rest
}: TypographyProps<C>): React.ReactElement => {
  const Component = as || 'p';
  const variantClass = variants[variant];

  return (
    <Component className={`${variantClass} ${className}`} {...rest}>
      {children}
    </Component>
  );
};

