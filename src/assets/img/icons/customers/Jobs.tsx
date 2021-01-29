import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={20}
            height={18}
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0h4a2 2 0 012 2v1h4a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2h4V2a2 2 0 012-2zM2 5h16v5H2V5zm0 11v-4h7v1h2v-1h7v4H2zM12 2v1H8V2h4z"
                fill="#fff"
            />
        </svg>
    )
}

export default SvgComponent
