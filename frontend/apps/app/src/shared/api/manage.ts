import { LinkType } from "../utils/types"
import { call } from "./base"

export const getLinks = async (prefix: string, refreshToken: string) => {
  const data = await call<any>({
    path: "/api/links",
    method: "GET",
    refreshToken,
  })

  return data
}

type CreateLinkInput = {
  slug: string
  title: string
  description: string
  destination: string
}

export const createLink = async (link: CreateLinkInput) => {
  const [data, res, status] = await call<any>({
    path: "/api/links",
    method: "POST",
    input: link,
    authRequired: true,
  })

  if (status == "success") {
    console.log("created")
  }
  if (status == "fail" || status == "error") {
    console.log(res)
  }
}
