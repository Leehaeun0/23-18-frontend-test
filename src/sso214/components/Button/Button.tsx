import React from 'react';
import S from './styles.module.css';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  variant: 'first' | 'second' | 'third' | 'ghost' | 'negative';
  size: 'large' | 'medium' | 'small';
  flexible: boolean;
}

const VariantStyle: Record<Props['variant'], string> = {
  first: S.first,
  second: S.second,
  third: S.third,
  ghost: S.ghost,
  negative: S.negative,
};

const SizeStyle: Record<Props['size'], string> = {
  large: S.large,
  medium: S.medium,
  small: S.small,
};

const Button = ({ variant, size, flexible, children, className, ...res }: Props) => {
  return (
    <button
      className={`${S.button} ${VariantStyle[variant]} ${SizeStyle[size]} ${
        flexible && S.flexible
      } ${className}`}
      {...res}
    >
      {children}
    </button>
  );
};

export default Button;
