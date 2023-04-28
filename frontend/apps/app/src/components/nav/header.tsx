import { routes } from "../../shared/utils/helpers"
import Image from "next/image"
import Link from "next/link"
import logo from "../../../public/logo.png"
import { MenuIcon } from "../../shared/ui/icons"
import { useEffect, useState } from "react"

const NavbarLinks = () => {
  return (
    <>
      <Link href={routes.pricing} scroll={false}>
        Pricing
      </Link>
      <Link href={routes.benefits} scroll={false}>
        Benefits
      </Link>
      <a href={routes.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      {/* <Link href={router.benefits}>Benefits</Link> */}
    </>
  )
}

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => setShowMenu(!showMenu)

  return (
    <header className="sticky top-[1rem] mb-2 mt-4">
      <nav>
        <div className="flex justify-between items-center rounded-lg bg-slate-900 py-2 px-5">
          <div className="flex gap-5 items-center basis-1/4">
            <button onClick={toggleMenu} className="sm:hidden">
              <MenuIcon className="h-5 w-5" />
            </button>
            <Link href={routes.home} className="font-bold text-2xl">
              <span className="">{">ME"}</span>
            </Link>
          </div>
          <div className="hidden sm:flex sm:gap-8 basis-auto ">
            <NavbarLinks />
          </div>
          <Link className="sm:basis-1/4 text-right" href={routes.manage}>
            START FOR FREE
          </Link>
        </div>

        {showMenu && (
          <div className="sm:hidden bg-slate-900 w-fit rounded-lg mt-3 absolute py-1 flex flex-col">
            <Link className="px-5 py-3" href={routes.pricing} scroll={false}>
              Pricing
            </Link>
            <Link className="px-5 py-3" href={routes.benefits} scroll={false}>
              Benefits
            </Link>
            <a href={routes.github} className="px-5 py-3" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}

type ManageNavbarProps = {
  onNewClick: () => void
}

export const ManageNavbar = ({ onNewClick }: ManageNavbarProps) => {
  return (
    <nav className="mb-5 border-b py-3 flex items-center justify-between">
      <div className="flex gap-3">
        <Link href="/">
          <Image
            src={logo}
            alt="JustClickOnMe"
            className="h-6 w-auto mx-2"
            quality={100}
            priority={true}
          />
        </Link>
        <Link href="/profile">Profile</Link>
      </div>

      <div className="flex gap-3">
        <button
          className=" py-2 px-7 border-2 border-blue-100 text-sm flex items-center font-medium text-blue-600"
          onClick={onNewClick}
        >
          New +
        </button>
        <Link
          href="/plans"
          className="py-2 px-7 text-sm flex items-center font-medium text-red-600  bg-red-100"
        >
          Upgrade plan
        </Link>
      </div>
    </nav>
  )
}
