import { css } from '@emotion/react'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <h1
          css={ theme => css`
            ${ theme.typeface.primary({ fontSize: 16, lineHeight: 16 }) }

            text-align: center;
          ` }>
          You did the thing!
        </h1>
      </main>
    </div>
  )
}

export default Home
