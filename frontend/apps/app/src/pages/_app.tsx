import type { AppProps } from "next/app"
import "../shared/styles/globals.css"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { env } from "../shared/utils/helpers"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <GoogleOAuthProvider clientId={env.googleClientId}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}

export default App
