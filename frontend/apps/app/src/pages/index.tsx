import Link from "next/link"
import { Navbar, GetStartedFooter, NavFooter } from "../components/nav"
import { Benefits } from "../features/landing/benefits"
import { constants, routes } from "../shared/utils/helpers"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { Pricing } from "../features/landing/pricing"

export default function Home() {
  return (
    <div className="h-full">
      <Head>
        <title>Attention is driven element of new generation economy | Just Click On Me</title>
        <meta
          name="description"
          content="Attention is driven element of new generation economy. Shorten and customize your links with JustClickOnMe. An Open Source alternative to Bitly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <div className="h-[75vh] flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl lg:text-7xl  font-bold max-w-6xl">
            Attention is driven element of new generation economy
          </h1>
          <div className="flex border-2 border-white rounded-[0.625rem] items-center pl-6 pr-2 w-full max-w-2xl mt-10">
            <span className=" font-medium">justclickon.me/</span>
            <input
              type="text"
              className="font-medium bg-transparent py-5 flex-1"
              placeholder="yourlink"
            />
            <Link
              href={routes.manage}
              className="py-3 px-5 bg-slate-900 rounded-[0.625rem] outline-none sm:block hidden"
            >
              GET MEMORABLE LINK
            </Link>
          </div>
          <Link
            href={routes.manage}
            className="py-3 px-5 bg-slate-900 rounded-[0.625rem] outline-none sm:hidden mt-8"
          >
            GET MEMORABLE LINK
          </Link>
        </div>

        <Benefits className="py-32" />

        <Pricing className="py-32" />

        <GetStartedFooter />
        <NavFooter />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const refreshCookie = ctx.req.cookies[constants.refreshTokenCookie]

  if (refreshCookie) {
    return {
      props: {},
      redirect: {
        destination: routes.manage,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
