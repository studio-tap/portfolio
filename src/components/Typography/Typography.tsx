import React from 'react';

const variants = {
  'body-normal': 'text-m leading-normal tracking-normal',
};

type Variant = keyof typeof variants;

type TypographyProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  variant: Variant;
  className?: string;
};

export const Typography = ({ as: Component = 'p', variant, children, className }: TypographyProps): React.ReactElement => {
  const variantClass = variants[variant];

  return (
    <Component className={`${variantClass} ${className}`}>
      {children}
    </Component>
  );
};
