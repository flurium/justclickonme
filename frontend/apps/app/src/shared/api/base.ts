import { constants } from "../utils/helpers"
import jwtDecode from "jwt-decode"
import { AccessToken } from "./types"
const domain = "http://localhost:5125"

const url = (path: string) => `${domain}${path}`

type CallInput = {
  path: string
  method: "POST" | "GET" | "PUT" | "DELETE"
  input?: object
  refreshToken?: string
  authRequired?: boolean
}

type CallResponse<T> = [T, Response, "success"] | [null, Response, "fail"] | [null, null, "error"]

let apiStore: {
  accessToken: string | null
} = {
  accessToken: null,
}

export const setAccessToken = (token: string) => {
  apiStore.accessToken = token
}

export const getAccessToken = () => apiStore.accessToken

const isAccessTokenExpired = (token: string) => {
  let decoded = jwtDecode<{ exp: number }>(token)
  return Date.now() >= decoded.exp * 1000
}

// just click on me specific fetch
export const call = async <T>({
  path,
  method,
  input,
  refreshToken,
  authRequired,
}: CallInput): Promise<CallResponse<T>> => {
  let headers: Record<string, string> = {
    "content-type": "application/json",
  }

  console.log(refreshToken)
  if (apiStore.accessToken && !isAccessTokenExpired(apiStore.accessToken)) {
    headers["authorization"] = `bearer ${apiStore.accessToken}`
  } else if (refreshToken || authRequired) {
    const refreshRes = await fetch(url("/api/auth/refresh"), {
      method: "GET",
      credentials: "include",
      headers: {
        cookie: `${constants.refreshTokenCookie}=${refreshToken}`,
      },
    })

    if (refreshRes.ok) {
      const data = (await refreshRes.json()) as AccessToken
      apiStore.accessToken = data.accessToken
      headers["authorization"] = `bearer ${data.accessToken}`
    }
  }

  try {
    const data = await fetch(url(path), {
      method: method,
      credentials: "include",
      headers,
      body: input && JSON.stringify(input),
    })

    const json = await data.json()

    if (data.ok) {
      return [json as T, data, "success"]
    }

    return [json, data, "fail"]
  } catch {
    return [null, null, "error"]
  }
}
