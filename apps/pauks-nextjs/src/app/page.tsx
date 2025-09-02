import { Button } from '@proot/components';
import { tokens } from '@proot/tokens/tokens.stylex';
import { colors } from '@stylexjs/open-props/lib/colors.stylex';

import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    width: '400px',
    height: '500px',
    // Container with background color from external 3rd party package
    backgroundColor: colors.blue2,
  },
  button: {
    width: '82px',
  },
  buttonWithTokenColor: {
    // Button with text color form the internal workspace package
    color: tokens.textColor,
  },
});

export default function Page() {
  return (
    <main {...stylex.props(styles.container)}>
      <button {...stylex.props(styles.button)}>PAUKS!</button>
      <Button style={[styles.button, styles.buttonWithTokenColor]}>Proots!?</Button>
      <Button>Proots in pink!?</Button>
    </main>
  );
}
