import { googleLogin } from "../../shared/api/auth"
import { GoogleLogin } from "@react-oauth/google"
import { useRef } from "react"

export const GoogleBtn = ({ user }: { user: boolean }) => {
  const googleSuccess = async (res: any) => {
    const idToken = res.credential
    if (idToken) {
      await googleLogin(idToken)
      //console.log(accessToken)
    }
  }

  const googleError = () => {}

  // DON'T ASK ME WHY I AM GENIUS
  return (
    <div
      className=" overflow-hidden border justify-center flex items-center"
      style={{ width: "2.39rem", height: "2.38rem" }}
    >
      <GoogleLogin
        onSuccess={googleSuccess}
        onError={googleError}
        text="continue_with"
        type="icon"
        shape="square"
      />
    </div>
  )
}
