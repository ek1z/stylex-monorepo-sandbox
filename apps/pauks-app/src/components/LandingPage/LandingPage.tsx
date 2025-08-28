import {Button} from '@proot/components'

import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    width: '400px',
    height: '500px',
    backgroundColor: 'turquoise',
  },
  button: {
    width: '126px',
  }
})

const LandingPage = () => {
  return (
    <main {...stylex.props(styles.container)}>
      <button {...stylex.props(styles.button)}>
        PAUKS!
      </button>
      <Button>
        Woot!?
      </Button>
    </main>
  )
}

export default LandingPage
