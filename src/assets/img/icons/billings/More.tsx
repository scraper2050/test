import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={26}
      height={7}
      viewBox="0 0 26 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 0A3.26 3.26 0 000 3.25 3.26 3.26 0 003.25 6.5 3.26 3.26 0 006.5 3.25 3.26 3.26 0 003.25 0zm19.5 0a3.26 3.26 0 00-3.25 3.25 3.26 3.26 0 003.25 3.25A3.26 3.26 0 0026 3.25 3.26 3.26 0 0022.75 0zm-13 3.25A3.26 3.26 0 0113 0a3.26 3.26 0 013.25 3.25A3.26 3.26 0 0113 6.5a3.26 3.26 0 01-3.25-3.25z"
        fill="#000"
      />
    </svg>
  )
}

export default SvgComponent
