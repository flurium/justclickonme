import { call } from "./base"
import { AccessToken } from "./types"
import { setAccessToken } from "./base"

export const passwordLogin = async (email: string, password: string) => {
  const [data, res] = await call<AccessToken>({
    path: "/api/auth/password",
    method: "POST",
    input: {
      email,
      password,
    },
  })
  console.log(data, res)

  if (data) {
    setAccessToken(data.accessToken)
    return "success"
  }
  return "fail"
}

export const passwordRegister = () => {}

export const googleLogin = async (token: string) => {
  const [data, res] = await call<AccessToken>({
    path: "/api/auth/google",
    method: "POST",
    input: {
      idToken: token,
    },
  })

  if (data) {
    setAccessToken(data.accessToken)
  }
}

// IN FUTURE
export const githubLogin = () => {}
