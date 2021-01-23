import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width={31.066}
            height={20.534}
            viewBox="0 0 23.3 15.4"
            {...props}
        >
            <title>{"Equipment"}</title>
            <path
                d="M23.3 5l-4 2a2.12 2.12 0 01-2.8-.9 2.12 2.12 0 01.9-2.8l4-2a5.484 5.484 0 00-5.9-.7 5.229 5.229 0 00-2.944 5.172L1.1 11.5a2.12 2.12 0 00-.9 2.8 2.12 2.12 0 002.8.9l11.399-5.7a5.416 5.416 0 005.901.7 5.352 5.352 0 003-5.2zM2.4 13.9c-.4.2-.8.1-.9-.3a.659.659 0 01.3-.9.67.67 0 01.6 1.2z"
                fill="#fff"
                fillRule="evenodd"
            />
        </svg>
    )
}

export default SvgComponent
