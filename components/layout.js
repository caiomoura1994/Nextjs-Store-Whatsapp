import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

// import Image from 'next/image'
// <Image
//   priority
//   src="/images/profile.jpg"
//   className={utilStyles.borderCircle}
//   height={144}
//   width={144}
//   alt={name}
// />
const BackButton = styled.div`
  font-size: 1rem;
  color: #707070;
  padding: 1rem;
  position: sticky;
  top: 0;
  background: white;
`;

export const siteTitle = 'Next.js Sample Website'
export default function Layout({ children, home = false, goBackAction = () => { } }) {
  return (
    <div style={{ background: "#FCFCFC", maxWidth: 500,     margin: "auto" }}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header></header>
      {!home && (
        <BackButton onClick={goBackAction}>
          <Link href="/">
            <a>{"Voltar"}</a>
          </Link>
        </BackButton>
      )}
      <main>{children}</main>
    </div>
  )
}
