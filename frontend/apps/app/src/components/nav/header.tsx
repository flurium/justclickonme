import { routes } from "../../shared/utils/helpers"
import Image from "next/image"
import Link from "next/link"
import logo from "../../../public/logo.png"
import { MenuIcon } from "../../shared/ui/icons"
import { useState } from "react"

const NavbarLinks = () => {
  return (
    <>
      <Link href={routes.pricing}>Pricing</Link>
      <Link href={routes.benefits}>Benefits</Link>
      {/* <Link href={router.benefits}>Benefits</Link> */}
    </>
  )
}

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => setShowMenu(!showMenu)

  return (
    <header>
      <nav className="mb-2">
        <div className="flex justify-between items-center border-b py-3">
          <div className="flex gap-5">
            <div className="sm:hidden">
              <button onClick={toggleMenu}>
                <MenuIcon className="h-6 w-6" />
              </button>

              {/* <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <NavbarLinks />
          </ul> */}
            </div>
            <Link href="/">
              <Image src={logo} alt="JustClickOnMe" className="h-6 w-auto mx-2" quality={100} />
            </Link>
          </div>
          <div className="hidden sm:flex sm:gap-8">
            <NavbarLinks />
          </div>
          <Link
            className=" py-2 px-6 border-blue-100 text-blue-600 hover:bg-blue-100 border-2"
            href={routes.manage}
          >
            Get Started - free
          </Link>
        </div>

        {showMenu && (
          <div className="sm:hidden py-5 justify-center w-full border-b flex gap-5">
            <NavbarLinks />
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
