import { call } from "./base"
import { setAccessToken } from "./base"

export const passwordLogin = async (email: string, password: string) => {
  const result = await call<any>({
    path: "/api/auth/password",
    method: "POST",
    input: {
      email,
      password,
    },
  })

  if (result.accessToken) {
    setAccessToken(result.accessToken)
  }

  return result.error
}
