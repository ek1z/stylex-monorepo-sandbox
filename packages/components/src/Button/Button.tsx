import { colors } from '@stylexjs/open-props/lib/colors.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';

const styles = stylex.create({
  button: {
    color: 'pink',
    height: '48px',
    borderColor: colors.camo3,
    borderWidth: '4px',
    borderStyle: 'dashed',
  },
});

export type ButtonProps = {
  children?: ReactNode;
  style?: StyleXStyles;
};

export const Button = ({ children, style }: ButtonProps) => {
  return <button {...stylex.props(styles.button, style)}>{children}</button>;
};
