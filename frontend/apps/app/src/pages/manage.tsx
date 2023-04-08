import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { DocumentsIcon, EditIcon } from "../shared/ui/icons"
import { LinkList } from "../components/manage/LinkList"
import { ManageNavbar, Navbar } from "../components/nav"
import { Fragment, useEffect, useState } from "react"
import { LinkType } from "../shared/utils/types"
import { constants, routes } from "../shared/utils/helpers"
import { listlinks } from "../shared/api/test"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { createLink, getLinks } from "../shared/api/manage"
import { AccessToken } from "../shared/api/types"
import { LinkForm, LinkInfo } from "../features/manage"
import { getAccessToken, setAccessToken } from "../shared/api/base"
import { Page } from "../components/Page"

const ManagePage: NextPage<AccessToken> = ({ accessToken }) => {
  /*
    during ssr we will get access token so we can just set it there
    to not request it second time
     */
  useEffect(() => setAccessToken(accessToken), [accessToken])

  const [activeSlug, setActiveSlug] = useState<string>("")
  const [links, setLinks] = useState<LinkType[]>(listlinks)

  const [stage, setStage] = useState<"waiting" | "edit" | "new" | "info">("waiting")

  const activeLink = links.find((l) => l.slug == activeSlug)

  const changeActiveLink = (slug: string) => {
    setActiveSlug(slug)
    setStage("info")
    // TODO: add marker that iditifies is already requested

    if (links.some((l) => l.slug.substring(0, l.slug.lastIndexOf("/")) == slug)) {
      console.log("exist")
    } else {
      console.log("not exist")
    }
  }
  const [parent] = useAutoAnimate({
    duration: 150,
  })

  const createNewLink = async (newValue: {
    slug: string
    title: string
    description: string
    destination: string
  }) => {
    const res = await createLink(newValue)
  }

  return (
    <>
      <Head>
        <title>Manage your links | JustClickOnMe</title>
      </Head>

      <div className="h-full flex flex-col ">
        <ManageNavbar onNewClick={() => setStage("new")} />

        <main className="flex-1 flex flex-col pb-5">
          <div className="border-x border-t flex items-center">
            <button
              className="hover:bg-gray-50 p-3 h-full"
              onClick={() => {
                setActiveSlug(activeSlug.substring(0, activeSlug.lastIndexOf("/")))
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <div className="border-r h-full" />

            <div className="flex gap-2 px-5 items-center" ref={parent}>
              {activeSlug.split("/").map((part, i, arr) => {
                const click = () =>
                  setActiveSlug(activeSlug.substring(0, activeSlug.indexOf(part)).concat(part))

                if (i == arr.length - 1) return <span key={part}>{part}</span>
                return (
                  <Fragment key={part}>
                    <span className="cursor-pointer" onClick={click}>
                      {part}
                    </span>
                    <span>/</span>
                  </Fragment>
                )
              })}
            </div>
          </div>
          <div className="border  flex-1 flex flex-col lg:flex-row">
            <LinkList
              items={links.filter(
                (l) =>
                  l.slug.substring(0, l.slug.lastIndexOf("/")) ==
                  (activeSlug ? activeSlug.substring(0, activeSlug.lastIndexOf("/")) : "")
              )}
              active={activeLink ?? null}
              onClick={changeActiveLink}
            />
            <LinkList
              items={
                activeSlug != ""
                  ? links.filter((l) => {
                      const slash = l.slug.lastIndexOf("/")
                      if (slash == -1) return false
                      return l.slug.substring(0, slash) == activeSlug
                    })
                  : []
              }
              active={activeLink ?? null}
              onClick={changeActiveLink}
            />
            <div className="flex-1 lg:basis-3/5 py-6 px-8">
              {stage == "info" && activeLink ? (
                <LinkInfo link={activeLink} onEditClick={() => setStage("edit")} />
              ) : stage == "edit" ? (
                <LinkForm
                  slug={activeLink!.slug}
                  description={activeLink!.description}
                  destination={activeLink!.destination}
                  title={activeLink!.title}
                  onSubmit={() => {}}
                />
              ) : stage == "new" ? (
                <LinkForm onSubmit={createNewLink} />
              ) : (
                <></>
              )}
            </div>

            {activeSlug && stage == "info" ? (
              <div className="flex border-t lg:hidden">
                <button
                  className="flex-grow py-3 flex justify-center gap-x-2 items-center "
                  onClick={() => setStage("edit")}
                >
                  <EditIcon />
                  Edit
                </button>
                <div className="border-r"></div>
                <button
                  className="py-3 flex-grow justify-center gap-x-2 items-center  flex "
                  onClick={async () => {
                    if (navigator.clipboard) {
                      await navigator.clipboard.writeText(activeSlug)
                    } else {
                      alert("Sorry can't copy")
                    }
                  }}
                >
                  <DocumentsIcon />
                  Copy
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

const ManagePageValidationMode: NextPage = () => {
  return (
    <Page title="Manage links" description="Manage links in JustClickOnMe">
      <Navbar />

      <main className="h-[75vh] gap-10 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl lg:text-7xl font-bold">Thanks for trust!</h1>
        <h2 className="max-w-xl text-center">
          We will send you letter when JustClickOnMe will be available for usage. And you wil get a
          secret gift as one of our first users.
        </h2>
      </main>
    </Page>
  )
}

export default ManagePageValidationMode

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  // auth
  const refreshCookie = ctx.req.cookies[constants.refreshTokenCookie]
  console.log(ctx.req.cookies)

  const authRedirect = {
    props: {},
    redirect: {
      destination: routes.auth,
      permanent: false,
    },
  }

  if (!refreshCookie) return authRedirect

  // const [links, res, status] = await getLinks("/", refreshCookie)

  // if (status == "error" || status == "fail") return authRedirect

  // const accessToken = getAccessToken()

  return {
    props: {
      // accessToken,
    },
  }
}
