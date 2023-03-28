import { LinkType } from "../../shared/utils/types"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { FolderIcon, LinkIcon } from "../../shared/ui/icons"
import { useAutoAnimate } from "@formkit/auto-animate/react"
const LinkListItem = () => {}

export const LinkList = ({
  items,
  active,
  onClick,
}: {
  items: LinkType[]
  active: LinkType | null
  onClick: (link: string) => void
}) => {
  const [parent] = useAutoAnimate({
    duration: 150,
  })

  return (
    <div ref={parent} className=" border-b lg:basis-1/5 lg:border-b-0 lg:border-r">
      {items.map((folder) => (
        <div
          className={`flex gap-3 items-center cursor-pointer py-3 px-5 ${
            active?.slug == folder.slug ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
          key={folder.slug}
          onClick={() => onClick(folder.slug)}
        >
          {folder.destination == "" ? <FolderIcon /> : <LinkIcon />}

          {folder.slug.substring(folder.slug.lastIndexOf("/") + 1)}
        </div>
      ))}
    </div>
  )
}
