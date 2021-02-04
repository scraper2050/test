import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={22}
      height={18}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 2a2 2 0 012 2v1a2 2 0 012 2l-.024.217-1.98 8.91A2 2 0 0118 18H2a2 2 0 01-2-2V2a2 2 0 012-2h6c1.12 0 1.833.475 2.549 1.379l.122.156a25.92 25.92 0 00.27.342c.088.107.1.123.06.123H18zm0 2v1H4c-1.167 0-1.69.621-1.97 1.76L2 6.891V2h6c.384 0 .607.149.982.621l.087.113c.08.103.191.246.237.303.503.623.97.96 1.689.963H18zm0 12H2.024l1.952-8.783C4 7.12 4.021 7.05 4.036 7h15.94l-1.952 8.783L18 16z"
        fill="#fff"
      />
    </svg>
  )
}

export default SvgComponent
