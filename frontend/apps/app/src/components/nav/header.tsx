import { routes } from "../../shared/utils/helpers"
import Image from "next/image"
import Link from "next/link"
import logo from "../../../public/logo.png"

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
  return (
    <nav className="flex justify-between items-center border-b mb-2 py-3">
      <div>
        {/* <div className="dropdown">
          <label className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <NavbarLinks />
          </ul>
        </div> */}
        <Link href="/">
          <Image src={logo} alt="JustClickOnMe" className="h-6 w-auto mx-2" quality={100} />
        </Link>
      </div>
      <div className="flex gap-8">
        <NavbarLinks />
      </div>
      <Link
        className=" py-2 px-6 border-blue-100 text-blue-600 hover:bg-blue-100 border-2"
        href={routes.manage}
      >
        Get Started - free
      </Link>
    </nav>
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
