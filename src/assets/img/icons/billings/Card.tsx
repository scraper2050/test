import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={28}
      height={22}
      viewBox="0 0 28 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.75 0h-22A2.729 2.729 0 00.014 2.75L0 19.25A2.74 2.74 0 002.75 22h22a2.74 2.74 0 002.75-2.75V2.75A2.74 2.74 0 0024.75 0zm0 19.25h-22V11h22v8.25zM2.75 5.5h22V2.75h-22V5.5z"
        fill="#000"
      />
    </svg>
  )
}

export default SvgComponent
