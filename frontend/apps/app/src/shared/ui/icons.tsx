import { ReactNode } from "react"

type IconBaseProps = {
  className?: string
  children: ReactNode
}

const IconBase = ({ className, children }: IconBaseProps) => (
  <svg
    className={className}
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
)

type IconProps = {
  className?: string
}

export const ArrowRightIcon = ({ className }: IconProps) => (
  <IconBase className={className}>
    <path d="M14 7L9.52 2M14 7L9.52 12M14 7H0" stroke="black" />
  </IconBase>
)

export const CalendarIcon = ({ className }: IconProps) => (
  <IconBase className={className}>
    <path
      d="M3.5 0V5M11.5 0V5M1.5 2.5H13.5C14.0523 2.5 14.5 2.94772 14.5 3.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H1.5C0.947716 14.5 0.5 14.0523 0.5 13.5V3.5C0.5 2.94772 0.947715 2.5 1.5 2.5Z"
      stroke="black"
    />
  </IconBase>
)

export const DocumentsIcon = ({ className }: IconProps) => (
  <IconBase className={className}>
    <path
      d="M3.5 2.5H2.5C1.94772 2.5 1.5 2.94772 1.5 3.5V13.5C1.5 14.0523 1.94772 14.5 2.5 14.5H10.5C11.0523 14.5 11.5 14.0523 11.5 13.5V12.5M12.5 12.5H4.5C3.94772 12.5 3.5 12.0523 3.5 11.5V1.5C3.5 0.947715 3.94772 0.5 4.5 0.5H10.5L13.5 2.5V11.5C13.5 12.0523 13.0523 12.5 12.5 12.5Z"
      stroke="black"
    />
  </IconBase>
)

export const EditIcon = ({ className }: IconProps) => (
  <IconBase className={className}>
    <path
      d="M0.5 10.5L0.146447 10.1464L0 10.2929V10.5H0.5ZM10.5 0.5L10.8536 0.146447C10.6583 -0.0488155 10.3417 -0.0488155 10.1464 0.146447L10.5 0.5ZM14.5 4.5L14.8536 4.85355C15.0488 4.65829 15.0488 4.34171 14.8536 4.14645L14.5 4.5ZM4.5 14.5V15H4.70711L4.85355 14.8536L4.5 14.5ZM0.5 14.5H0C0 14.7761 0.223858 15 0.5 15L0.5 14.5ZM0.853553 10.8536L10.8536 0.853553L10.1464 0.146447L0.146447 10.1464L0.853553 10.8536ZM10.1464 0.853553L14.1464 4.85355L14.8536 4.14645L10.8536 0.146447L10.1464 0.853553ZM14.1464 4.14645L4.14645 14.1464L4.85355 14.8536L14.8536 4.85355L14.1464 4.14645ZM4.5 14H0.5V15H4.5V14ZM1 14.5V10.5H0V14.5H1Z"
      fill="black"
    />
  </IconBase>
)

export const FolderIcon = ({ className }: IconProps) => (
  <IconBase className={className}>
    <path
      d="M0.5 12.5V2.5C0.5 1.94772 0.947715 1.5 1.5 1.5H5.5L7.5 3.5H13.5C14.0523 3.5 14.5 3.94772 14.5 4.5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H1.5C0.947715 13.5 0.5 13.0523 0.5 12.5Z"
      stroke="black"
    />
  </IconBase>
)

export const LinkIcon = ({ className }: IconProps) => (
  <IconBase className={className}>
    <path
      d="M4.5 6.5L1.32843 9.67157C0.797994 10.202 0.5 10.9214 0.5 11.6716C0.5 13.2337 1.76633 14.5 3.32843 14.5C4.07857 14.5 4.79799 14.202 5.32843 13.6716L8.5 10.5M10.5 8.5L13.6716 5.32843C14.202 4.79799 14.5 4.07857 14.5 3.32843C14.5 1.76633 13.2337 0.5 11.6716 0.5C10.9214 0.5 10.202 0.797993 9.67157 1.32843L6.5 4.5M4.5 10.5L10.5 4.5"
      stroke="black"
    />
  </IconBase>
)

export const CheckIcon = ({ className }: IconProps) => (
  <IconBase className={className}>
    <path d="M1 7L5.5 11.5L14 3" stroke="#ED5576" strokeLinecap="square" />
  </IconBase>
)

export const MenuIcon = ({ className }: IconProps) => (
  <IconBase className={className}>
    <path d="M0 3.5H15M0 11.5H15M0 7.5H15" stroke="white" />
  </IconBase>
)
