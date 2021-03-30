import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={12}
      height={20}
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 18.03l1.77 1.77 9.9-9.9L1.77 0 0 1.77 8.13 9.9 0 18.03z"
        fill="#000"
      />
    </svg>
  )
}

export default SvgComponent
