import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const Hed = styled.span`
  ${ ({ theme }) => theme.typeface.accent({ fontSize: 16 }) }

  font-weight: 900;

  margin-right: 1rem;

  line-height: 4rem;
`

const Byline = styled.span`
  ${ ({ theme }) => theme.typeface.primary({ fontSize: 10 }) }
  margin-left: 3rem;

  line-height: 4rem;
  font-stretch: condensed;
`

const Dek = styled.span`
  ${ ({ theme }) => theme.typeface.accent({ fontSize: 13 }) }
  font-weight: 400;
  font-style: italic;
  line-height: 4rem;
`

export default function CandB () {
  return (
    <Container>
      <video controls>
        <source src='/assets/video/cellino_and_barnes.mp4' type='video/mp4' />
      </video>
      <h1 style={{ marginTop: '2rem' }}>
        <Hed>Injured?</Hed>

        <Dek>Bruised egos, gobs of money, and the bitter feud that took down Cellino & Barnes, New York’s absurdly ubiquitous accident law firm.</Dek>
        <Byline>
          <a css={
            css`
            &:hover {
              text-decoration: underline;
            }
          `
          } href='https://nymag.com/intelligencer/article/cellino-and-barnes-breakup.html'>Jeremy Kutner, <em>New York</em> Magazine, 14 September 2020</a>
        </Byline>
      </h1>
    </Container>
  )
}
