import React from 'react'

const RRuleFormWeeklyForms = ({
  rruleterminwoche_tage_array,
  rruleterminwoche_tage_array_action
}) => {
  console.log(rruleterminwoche_tage_array, rruleterminwoche_tage_array_action)
  const tagename = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO']
  return (
    <div className="w-full col-span-4 h-8 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2 -mb-1   dark:text-white text-black text-sm font-[Arial]">
      <a className="mr-3 h-8">Wochentage:</a>
      <div className="w-[80%] h-8 grid grid-cols-7 items-start justify-items-start gap-1">
        {tagename.map((item, index) => (
          <div
            onClick={() => rruleterminwoche_tage_array_action(item)}
            className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rruleterminwoche_tage_array.includes(item) ? ' bg-blue-400/30 ' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RRuleFormWeeklyForms
