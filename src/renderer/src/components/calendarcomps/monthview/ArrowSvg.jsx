import React from 'react'

const ArrowSvg = ({ width, height, color, css }) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 24 24"
      fill={`${color}`}
      className={`${css}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="6,4 20,12 6,20" />
    </svg>
  )
}

export default ArrowSvg
