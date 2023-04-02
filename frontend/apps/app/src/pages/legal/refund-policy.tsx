import { Navbar, GetStartedFooter, NavFooter } from "../../components/nav"
import { routes } from "../../shared/utils/helpers"
import Head from "next/head"
import Link from "next/link"

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Refund policy | JustClickOnMe</title>
        <meta name="description" content="Refund policy for JustClickOnMe app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <h1 className="m-auto my-16 text-center text-5xl lg:text-7xl font-black max-w-3xl">
          Refund policy
        </h1>

        <div className="max-w-3xl m-auto">
          <p className="mb-10 text-center ">
            We don't have a return policy, which means you can't get money back.
          </p>
        </div>

        <GetStartedFooter />
        <NavFooter />
      </main>
    </>
  )
}

export default Privacy
