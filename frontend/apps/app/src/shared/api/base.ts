import { constants } from "../utils/helpers"
import jwtDecode from "jwt-decode"
const domain = "http://localhost:5125" //"https://justclickon.me"

const url = (path: string) => `${domain}${path}`

const csrf = {
  cookie: "iEvenDontKnowWhatItIs",
  header: "x-secrets-about-your-cat",
}

// types

type CallInput = {
  path: string
  method: "POST" | "GET" | "PUT" | "DELETE"
  input?: object
  refreshToken?: string
  authRequired?: boolean
}

type SuccessResult<T> = {
  data: T
  accessToken?: string
}

type FailedResult = {
  error: {
    message: string
  }
  accessToken?: string
}

type Result<T> =
  | {
      error: undefined
      data: T
      accessToken?: string
    }
  | {
      data: undefined
      error: {
        message: string
      }
      accessToken?: string
    }

// store
let apiStore: {
  accessToken: string | null
} = {
  accessToken: null,
}

export const setAccessToken = (token: string) => {
  apiStore.accessToken = token
}

export const getAccessToken = () => apiStore.accessToken

// functions

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
}: CallInput): Promise<Result<T>> => {
  let headers: Headers = new Headers({
    "content-type": "application/json",
  })

  if (apiStore.accessToken && !isAccessTokenExpired(apiStore.accessToken)) {
    headers.append("authorization", `bearer ${apiStore.accessToken}`)
  } else if (refreshToken || authRequired) {
    // double cookie to prevent csrf
    const csrfToken = (Math.random() + 1).toString(36)
    headers.append(csrf.header, csrfToken)
    headers.append(
      "cookie",
      `${constants.refreshTokenCookie}=${refreshToken}; ${csrf.cookie}=${csrfToken}`
    )
  }

  try {
    const data = await fetch(url(path), {
      method: method,
      credentials: "include",
      headers,
      body: input && JSON.stringify(input),
    })

    const json = (await data.json()) as Result<T>

    if (json.accessToken) setAccessToken(json.accessToken)

    return json
  } catch (error) {
    return {
      data: undefined,
      error: {
        message: "Something unexpected happend. Your request failed.",
      },
    }
  }
}
