import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path d="M94.205 167.261c-21.351 0-38.72 17.37-38.72 38.719s17.37 38.719 38.72 38.719c21.349 0 38.719-17.37 38.719-38.719s-17.37-38.719-38.719-38.719zM228.497 125.952c-22.387 0-40.601 18.213-40.601 40.601 0 22.388 18.213 40.602 40.601 40.602 22.387 0 40.601-18.214 40.601-40.602 0-22.388-18.214-40.601-40.601-40.601zM389.955 84.599c-25.81 0-46.808 20.998-46.808 46.807s20.998 46.807 46.808 46.807 46.808-20.998 46.808-46.807c0-25.808-20.998-46.807-46.808-46.807zM495.636 394.673h-27.448l14.09-121.31a59.722 59.722 0 00-14.709-46.564 59.714 59.714 0 00-44.556-19.983h-66.118a59.721 59.721 0 00-44.556 19.983 59.715 59.715 0 00-14.709 46.564l14.09 121.31h-21.965l-13.798-118.794c-1.118-9.624-.471-19.261 1.756-28.492a49.51 49.51 0 00-22.356-5.348h-53.723a49.543 49.543 0 00-36.965 16.579 49.542 49.542 0 00-12.203 38.631l11.316 97.424H141.82l-11.024-94.908a71.244 71.244 0 011.526-24.892 48.769 48.769 0 00-18.323-3.588H74.41a48.865 48.865 0 00-36.458 16.351 48.869 48.869 0 00-12.036 38.103l8.006 68.934H16.364C7.327 394.673 0 402 0 411.037s7.327 16.364 16.364 16.364h479.272c9.037 0 16.364-7.327 16.364-16.364s-7.327-16.364-16.364-16.364z" />
    </svg>
  )
}

export default SvgComponent
