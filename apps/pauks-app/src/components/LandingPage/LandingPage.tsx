import {Button} from '@proot/components'
import {tokens} from '@proot/tokens/tokens.stylex'

import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    width: '400px',
    height: '500px',
    backgroundColor: 'turquoise',
  },
  button: {
    width: '126px',
    color: tokens.textColor
  }
})

const LandingPage = () => {
  return (
    <main {...stylex.props(styles.container)}>
      <button {...stylex.props(styles.button)}>
        PAUKS!
      </button>
      <Button style={styles.button}>
        Proots!?
      </Button>
      <Button>
        Proots in pink!?
      </Button>
    </main>
  )
}

export default LandingPage
