import { routes } from "../../shared/utils/helpers"
import Image from "next/image"
import Link from "next/link"
import { resourceUsage } from "process"
import logo from "../../../public/logo.png"

export const GetStartedFooter = () => {
  return (
    <div className="text-center pt-32 pb-32 font-bold">
      <h4 className="text-2xl sm:text-3xl md:text-5xl mt-8">
        <div>Ready to try JustClickOnMe?</div>
        <div className="md:mt-3">Today! It{"'"}s your turn.</div>
      </h4>

      <Link
        href={routes.auth}
        className=" bg-white px-8 py-4 mt-14 rounded-lg text-slate-900 inline-block"
      >
        BUILD TRUST NOW - FREE
      </Link>
    </div>
  )
}

export const NavFooter = () => {
  return (
    <footer className="flex justify-between items-center mt-20 mb-6 rounded-lg bg-slate-900 py-3 px-5">
      <Link href={routes.home} className="font-bold text-2xl">
        <span className="">{">ME"}</span>
      </Link>

      <div className="flex gap-5">
        <Link href={routes.policy}>Policy</Link>
        <Link href={routes.terms}>Terms</Link>
        <a href={routes.github} target="_blank">
          GitHub
        </a>
        <a href={routes.discord} target="_blank">
          Discord
        </a>
      </div>
    </footer>
  )
}
