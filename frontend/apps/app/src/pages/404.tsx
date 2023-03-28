import { Navbar } from "../components/nav"
import { NextPage } from "next"
import Head from "next/head"

const Error404: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page wasn&apos;t found | Just Click On Me</title>
        <meta name="description" content="Shorten and customize your URLs with Just Click On Me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="">
        <h1 className="text-center text-5xl lg:text-7xl font-bold mt-12">Page wasn&apos;t found</h1>
      </main>
    </>
  )
}

export default Error404
