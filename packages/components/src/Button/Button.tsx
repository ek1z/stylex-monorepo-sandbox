import { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex/lib/types/StyleXTypes';

const styles = stylex.create({
  button: {
    color: 'pink',
  },
});

export type ButtonProps = {
  children?: ReactNode;
  style?: StyleXStyles;
};

export const Button = ({ children, style }: ButtonProps) => {
  return <button {...stylex.props(styles.button, style)}>{children}</button>;
};
