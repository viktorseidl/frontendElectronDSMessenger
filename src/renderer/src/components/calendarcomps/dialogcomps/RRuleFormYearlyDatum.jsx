import React from 'react'

const RRuleFormYearlyDatum = ({
  rruleterminjahr_datum_monate_array,
  rruleterminjahr_datum_monate_array_action,
  rruleterminjahr_datum_tage_array,
  rruleterminjahr_datum_tage_array_action
}) => {
  const monate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const tage = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31
  ]
  return (
    <>
      <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
        <div className=" h-8 flex flex-row items-center justify-start mr-8">
          <a className="mr-0 text-sm">Monate wählen:</a>
        </div>
        <div className="w-[70%] grid grid-cols-3 items-start justify-items-start gap-1">
          {monate.map((item, index) => (
            <div
              key={'formyearlydatum' + item + index}
              onClick={() => rruleterminjahr_datum_monate_array_action(item)}
              className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rruleterminjahr_datum_monate_array.includes(item) ? ' bg-blue-400/30 ' : ''}`}
            >
              {item == 1
                ? 'Januar'
                : item == 2
                  ? 'Februar'
                  : item == 3
                    ? 'März'
                    : item == 4
                      ? 'April'
                      : item == 5
                        ? 'Mai'
                        : item == 6
                          ? 'Juni'
                          : item == 7
                            ? 'Juli'
                            : item == 8
                              ? 'August'
                              : item == 9
                                ? 'September'
                                : item == 10
                                  ? 'Oktober'
                                  : item == 11
                                    ? 'November'
                                    : 'Dezember'}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full col-span-4  flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2   dark:text-white text-black text-sm font-[Arial]">
        <a className="mr-6 h-8">Tage wählen:</a>
        <div className="w-[80%]  grid grid-cols-7 items-start justify-items-start gap-1">
          {tage.map((item, index) => (
            <div
              key={'formyearlydatumtage' + item + index}
              onClick={() => rruleterminjahr_datum_tage_array_action(item)}
              className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rruleterminjahr_datum_tage_array.includes(item) ? ' bg-blue-400/30 ' : ''}`}
            >
              {item}.
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RRuleFormYearlyDatum
