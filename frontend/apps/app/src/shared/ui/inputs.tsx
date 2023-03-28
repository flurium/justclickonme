import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react"

type InputProps = {
  label: string
  className?: string
  placeholder: string
  type?: HTMLInputTypeAttribute
  value: string
  setValue: (val: string) => void
}

export const Input = ({ label, className, placeholder, value, type, setValue }: InputProps) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-2 border py-3 px-6 block w-full focus:border-gray-300"
        placeholder={placeholder}
      />
    </div>
  )
}

export const Textarea = ({ label, className, placeholder, value, setValue }: InputProps) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <textarea
        value={value}
        rows={5}
        onChange={(e) => setValue(e.target.value)}
        className="mt-2 border py-3 px-6 block w-full min-h-10 focus:border-gray-300"
        placeholder={placeholder}
      />
    </div>
  )
}
