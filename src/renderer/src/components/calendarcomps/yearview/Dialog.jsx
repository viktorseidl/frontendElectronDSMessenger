import React, { Fragment, useEffect } from 'react'
import imgs from './../../../assets/Logo.png'
import { checkSeason, formatGermanDate } from './functions/functionHandler'
import { MdDelete, MdEdit, MdNote } from 'react-icons/md'
import Winter from './../../../assets/winter.png'
import Spring from './../../../assets/spring.png'
import Summer from './../../../assets/summer.png'
import Autmn from './../../../assets/autmn.png'
import Newyear from './../../../assets/newyear.png'
import ThreeSaints from './../../../assets/threesaints.png'
import Eastern from './../../../assets/eastern.png'
import Halloween from './../../../assets/halloween.png'
import Christihimmel from './../../../assets/christihimmel.png'
import Christmas from './../../../assets/christmas.png'
import Pfingsten from './../../../assets/pfingsten.png'
import TagEinheit from './../../../assets/tagdereinheit.png'
import TagArbeit from './../../../assets/tagarbeit.png'
import { useRoles } from '../../../styles/RoleContext'
const Dialog = ({ show, close, title, message, setTermin }) => {
  const { hasPermission } = useRoles()
  return (
    <Fragment>
      {show && (
        <div
          className="fixed inset-0 dark:bg-white/30 z-10 bg-black/30  flex justify-center items-center"
          onClick={(e) => close(null)}
        >
          <div className="min-w-[30%] max-w-[97%] flex flex-col ring-1 ring-[#0c101b] dark:ring-[#1b243b] rounded-sm">
            <div
              id="titlebar"
              className={
                'w-1/2 dark:bg-[#1b243b] bg-[#0c101b] flex flex-row items-center justify-between'
              }
            >
              <span className="font-[Arial] dark:text-white text-white text-sm flex flex-row items-center justify-center gap-x-2">
                <img src={imgs} className="w-10 h-2  " />
                {title}
              </span>
            </div>
            <div className="dark:bg-gray-900 bg-white w-full">
              <div className="w-full relative dark:bg-gray-900 bg-white h-32 overflow-hidden dark:text-white text-black text-sm font-[Arial]">
                <div className="absolute z-10 inset top-0 dark:bg-black/20  bg-white/30 h-32 left-0 w-full flex flex-col items-center justify-center">
                  <div className="dark:bg-black/80 dark:text-white bg-white/70 rounded py-1 px-2 mb-8 text-xl flex flex-col items-start justify-start">
                    <span className="w-full text-center ">
                      <b>{title}</b>
                    </span>
                    {message != null ? formatGermanDate(message.datum) : ''}
                    {' / '}
                    {message != null ? message.realtimestart : ''}
                    {' - '}
                    {message != null ? message.realtimeend : ''}
                  </div>
                </div>
                <img
                  src={
                    checkSeason(message.datum) == 'newyear'
                      ? Newyear
                      : checkSeason(message.datum) == 'threesaints'
                        ? ThreeSaints
                        : checkSeason(message.datum) == 'eastern'
                          ? Eastern
                          : checkSeason(message.datum) == 'christihimmel'
                            ? Christihimmel
                            : checkSeason(message.datum) == 'tagarbeit'
                              ? TagArbeit
                              : checkSeason(message.datum) == 'tageinheit'
                                ? TagEinheit
                                : checkSeason(message.datum) == 'pfingsten'
                                  ? Pfingsten
                                  : checkSeason(message.datum) == 'halloween'
                                    ? Halloween
                                    : checkSeason(message.datum) == 'christmas'
                                      ? Christmas
                                      : checkSeason(message.datum) == 'winter'
                                        ? Winter
                                        : checkSeason(message.datum) == 'spring'
                                          ? Spring
                                          : checkSeason(message.datum) == 'summer'
                                            ? Summer
                                            : Autmn
                  }
                  className="obeject-cover w-full h-40 "
                />
              </div>

              <div
                style={{ background: `${message != null ? message.hexcolor : '#CCC'}` }}
                className={`w-full py-[4px]  dark:text-white mb-0 text-black text-sm font-[Arial]`}
              ></div>
              <div
                className={`w-full  dark:text-white mb-4 text-black text-sm font-[Arial] flex flex-row items-end justify-end`}
              >
                {message != null && message.eventTyp != 1 ? (
                  <>
                    {hasPermission('view:calendar') && hasPermission('update:calendar') ? (
                      <span
                        onClick={() => setTermin(null, message)}
                        className="w-6 h-6 dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer mr-2 mt-2 flex flex-col items-center justify-center ring-1 rounded dark:ring-gray-700 ring-gray-500"
                      >
                        <MdEdit />
                      </span>
                    ) : (
                      ''
                    )}
                    {hasPermission('view:calendar') && hasPermission('delete:calendar') ? (
                      <span className="w-6 h-6 dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer mr-2 mt-2 flex flex-col items-center justify-center ring-1 rounded dark:ring-gray-700 ring-gray-500">
                        <MdDelete />
                      </span>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  ''
                )}
              </div>
              {message != null && message.eventTyp != 1 ? (
                <div className="w-full dark:bg-gray-900 bg-white px-6 pb-4 dark:text-white text-black text-sm font-[Arial]">
                  <MdNote className="inline mr-2 text-lg" />
                  {message != null
                    ? message.isNoteAttached != null
                      ? message.isNoteAttached
                      : ''
                    : ''}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Dialog
