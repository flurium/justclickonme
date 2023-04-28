import { LinkType } from "../utils/types"
import { call } from "./base"

type Link = {
  slug: string
  destination: string
  title: string
  descripiton: string
  createdDateTime: string // '2023-04-01T11:09:42.275045Z'
}

export const getLinks = async (prefix: string, refreshToken: string) => {
  return await call<Link[]>({
    path: "/api/links",
    method: "GET",
    refreshToken,
  })
}

type CreateLinkInput = {
  slug: string
  title: string
  description: string
  destination: string
}

export const createLink = async (link: CreateLinkInput) => {
  return await call<any>({
    path: "/api/links",
    method: "POST",
    input: link,
    authRequired: true,
  })
}
