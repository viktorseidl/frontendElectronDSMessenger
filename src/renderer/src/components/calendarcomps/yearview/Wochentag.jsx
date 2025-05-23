import React from 'react'

const Wochentag = ({ day }) => {
  return (
    <div
      title={day.split('.')[1]}
      key={day}
      className="w-full aspect-square flex dark:text-gray-300 text-orange-700 items-center justify-center font-bold"
    >
      {day.split('.')[0]}
    </div>
  )
}

export default Wochentag
