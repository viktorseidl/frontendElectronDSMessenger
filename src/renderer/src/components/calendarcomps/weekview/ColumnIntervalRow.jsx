import React from 'react'

const ColumnIntervalRow = ({ T }) => {
  const start = T > 9 ? T.toString() : '0' + T.toString()
  const end = parseInt(Number(T) + 1)
  console.log(T)
  return (
    <div
      className="w-full h-[180px]  dark:hover:bg-[rgba(255,255,255,0.06)] flex flex-col items-center justify-start"
      aria-label={`start_${start}:00,ende_${end > 23 ? '00' : end}:00`}
    >
      {start}:00
    </div>
  )
}

export default ColumnIntervalRow
