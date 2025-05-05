import React from 'react'

const RRuleFormMonthlyWeekDayNumber = ({
  rruleterminmonat_datum_tage_array_action,
  rruleterminmonat_wochentage_tage_array
}) => {
  const tage = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31
  ]
  return (
    <div className="w-full col-span-4  flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2   dark:text-white text-black text-sm font-[Arial]">
      <a className="mr-3 h-8">Jeder:</a>
      <div className="w-[86%]  grid grid-cols-7 items-start justify-items-start gap-1">
        {tage.map((item, index) => (
          <div
            onClick={() => rruleterminmonat_datum_tage_array_action(item)}
            className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rruleterminmonat_wochentage_tage_array.includes(item) ? ' bg-blue-400/30 ' : ''}`}
          >
            {item}.
          </div>
        ))}
      </div>
    </div>
  )
}

export default RRuleFormMonthlyWeekDayNumber
