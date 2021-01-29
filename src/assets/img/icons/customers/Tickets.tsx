import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0h10c1.152 0 2 .848 2 2v10c0 1.152-.848 2-2 2h-4v4c0 1.152-.848 2-2 2H2c-1.152 0-2-.848-2-2V8c0-1.152.848-2 2-2h4V2c0-1.152.848-2 2-2zM6 8H2v10h10v-4H8c-1.152 0-2-.848-2-2V8zm2-6v10h10V2H8z"
                fill="#fff"
            />
        </svg>
    )
}

export default SvgComponent
