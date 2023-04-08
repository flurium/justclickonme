import { Page } from "../components/Page"
import { GoogleBtn } from "../components/integrations/GoogleBtn"
import { NavFooter, Navbar } from "../components/nav"
import { passwordLogin } from "../shared/api/auth"
import { Input } from "../shared/ui/inputs"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { MouseEventHandler, useState } from "react"

// TODO: auto_select for google only on
const Auth: NextPage = () => {
  const { push } = useRouter()
  const [user, setUser] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginWithPassword: MouseEventHandler = async (e) => {
    e.preventDefault()
    const res = await passwordLogin(email, password)
    console.log(res)
    if (res == "success") {
      push("/manage")
    } else {
    }
  }

  return (
    <Page title="Get started" description="Get started: JustClickOnMe">
      <Navbar />

      <main className="h-[75vh] gap-10 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl lg:text-7xl font-bold">Get Started</h1>
        <h2 className="max-w-xl text-center">
          We are currently in validation mode. So you will not be able to use JustClickOnMe right
          now. But we will send you newsletters about our latest updates. Stay in touch!
        </h2>

        <form className="flex flex-col items-center gap-4 max-w-sm w-full">
          {/* 
          Google authenitification  

          <div className="flex text-xl gap-3  items-center">
            <GoogleBtn user={user} />
            Google
          </div>

          <div className="flex w-full items-center gap-4">
            <hr className="flex-1" />
            <span className="mb-1">or</span>
            <hr className="flex-1" />
          </div>

          */}

          <Input
            type="email"
            placeholder="email"
            setValue={setEmail}
            className="w-full"
            value={email}
            label="Email"
          />
          <Input
            type="password"
            placeholder="password"
            setValue={setPassword}
            className="w-full"
            value={password}
            label="Password"
          />

          <button className="rounded-lg py-3 px-6 bg-slate-900 w-full" onClick={loginWithPassword}>
            START
          </button>
        </form>
      </main>
    </Page>
  )
}
export default Auth
