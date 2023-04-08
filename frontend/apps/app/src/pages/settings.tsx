import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { routes } from "../shared/utils/helpers"

const SettingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Account settings | JustClickOnMe</title>
        <meta name="description" content="JustClickOnMe account setting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default SettingPage

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => ({
  props: {},
  redirect: {
    destination: routes.auth,
    permanent: false,
  },
})
