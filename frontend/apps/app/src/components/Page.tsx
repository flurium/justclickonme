import Head from "next/head"
import { ReactNode } from "react"

type PageProps = {
  title: string
  description: string
  children: ReactNode
}

export const Page = ({ title, description, children }: PageProps) => {
  return (
    <>
      <Head>
        <title>{`${title} | JustClickOnMe`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}
