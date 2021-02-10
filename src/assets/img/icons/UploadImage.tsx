import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={90}
      height={60}
      viewBox="0 0 90 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45 0c13.65 0 25.013 9.713 27.563 22.65 9.75.675 17.437 8.7 17.437 18.6C90 51.6 81.6 60 71.25 60H22.5C10.088 60 0 49.913 0 37.5c0-11.587 8.775-21.15 20.063-22.35C24.75 6.15 34.163 0 45 0zm7.5 48.75v-15h11.25L45 15 26.25 33.75H37.5v15h15z"
        fill="#0AF"
      />
    </svg>
  )
}

export default SvgComponent
