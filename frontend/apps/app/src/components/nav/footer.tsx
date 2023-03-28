import { routes } from "../../shared/utils/helpers"
import Image from "next/image"
import Link from "next/link"
import { resourceUsage } from "process"
import logo from "../../../public/logo.png"

export const GetStartedFooter = () => {
  return (
    <div className="text-center pt-20">
      <h3 className="text-red-500 font-semibold text-3xl">BUILD TRUST</h3>

      <h4 className="text-2xl sm:text-3xl md:text-5xl mt-8">
        <div>Ready to try JustClickOnMe?</div>
        <div className="md:mt-3">Today! It{"'"}s your turn.</div>
      </h4>

      <Link href={routes.auth} className="text-red-500 bg-red-50 px-8 py-4 mt-14 inline-block">
        Get started now - free
      </Link>
    </div>
  )
}

export const NavFooter = () => {
  return (
    <footer className="border-t flex justify-between mt-20 py-10">
      <Link href={routes.home}>
        <Image src={logo} alt="JustClickOnMe" className="h-6 w-auto mx-2" />
      </Link>

      <div className="flex gap-5">
        <Link href={routes.policy}>Policy</Link>
        <Link href={routes.terms}>Terms</Link>
        <Link href={routes.github}>GitHub</Link>
        <Link href={routes.discord}>Discord</Link>
      </div>
    </footer>
  )
}
