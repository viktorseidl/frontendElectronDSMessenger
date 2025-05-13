import { util } from 'node-forge'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchAuthAll } from '../../../services/useFetchAll'
import { MdChangeCircle, MdClose } from 'react-icons/md'

const UpdateEntryRRuleSerieAusnahmen = ({ apache, user, objID }) => {
  const { jahr, monat, tag } = useParams()
  const [ausnahmenArray, setAusnahmenArray] = useState(null)
  const getAllRules = async () => {
    setAusnahmenArray(null)
    const query = await useFetchAuthAll(
      'http://' +
        apache +
        '/electronbackend/index.php?path=getRRuleDates&a=' +
        util.encode64(
          objID + ':' + `${tag > 9 ? tag : '0' + tag}.${monat > 9 ? monat : '0' + monat}.${jahr}`
        ),
      'ssdsdsd',
      'GET',
      null,
      null
    )
    if (query != false) {
      query.length > 0 ? setAusnahmenArray(query) : setAusnahmenArray([])
    } else {
      setAusnahmenArray([])
    }
  }
  const exceptionHandler = async (RRObjectId, startDate, excluded) => {
    if (excluded == true) {
      //delete
      const query = await useFetchAuthAll(
        'http://' +
          apache +
          '/electronbackend/index.php?path=deleteRRuleException&a=' +
          util.encode64(RRObjectId + ':' + startDate),
        'ssdsdsd',
        'DELETE',
        null,
        null
      )
      if (query == true) {
        getAllRules()
      }
    } else {
      //insert
      const query = await useFetchAuthAll(
        'http://' +
          apache +
          '/electronbackend/index.php?path=insertRRuleException&a=' +
          util.encode64(RRObjectId + ':' + startDate),
        'ssdsdsd',
        'POST',
        null,
        null
      )
      if (query == true) {
        getAllRules()
      }
    }
  }
  useEffect(() => {
    console.log(ausnahmenArray)
    getAllRules()
  }, [objID])
  return (
    <div className="w-full  dark:bg-gray-900 bg-white pb-2 text-sm">
      {Array.isArray(ausnahmenArray) == false && ausnahmenArray == null ? (
        <div className="w-full  flex flex-col items-center justify-center py-20 animate-pulse">
          Einen Moment, die Serien-Termine werden berechnet...
        </div>
      ) : (
        <>
          {ausnahmenArray.length > 0 ? (
            <div className="w-full flex flex-col items-start justify-start gap-y-1 px-6">
              {ausnahmenArray.map((item) => (
                <>
                  {`${tag > 9 ? tag : '0' + tag}.${monat > 9 ? monat : '0' + monat}.${jahr}` ==
                  item.realtimestartDate ? (
                    <div
                      key={
                        'RRuleexcept' +
                        item.count +
                        item.RRObjectId +
                        item.realtimeendtag +
                        item.realtimeendDate
                      }
                      className={
                        'w-full grid grid-cols-10 dark:bg-blue-900 bg-gray-300  px-4 py-1 ' +
                        `${item.excluded == true ? 'border-2 dark:border-red-700 border-red-500' : ' border dark:border-blue-800 border-gray-400 '}`
                      }
                    >
                      <div className="w-full col-span-3">
                        {item.realtimestarttag} {item.realtimestartDate}
                      </div>{' '}
                      <div className="w-full col-span-3">
                        von {item.realtimestart} bis {item.realtimeend}
                      </div>
                      <div
                        style={{ color: item.excluded == true ? '#ef4444' : '#1ca115' }}
                        className={`w-full col-span-2 flex flex-row items-center justify-end font-bold`}
                      >
                        {item.excluded == true ? 'OFF' : 'ON'}
                      </div>
                      <div className="w-full col-span-2 flex flex-row items-center justify-center">
                        <button
                          onClick={() =>
                            exceptionHandler(item.RRObjectId, item.realtimestartDate, item.excluded)
                          }
                          className="ring-1 dark:ring-gray-700 flex flex-col items-center justify-center rounded-full p-1 dark:text-white text-black dark:bg-black/60 bg-black/20"
                        >
                          <MdChangeCircle className="inline" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={
                        'RRuleexcept' +
                        item.count +
                        item.RRObjectId +
                        item.realtimeendtag +
                        item.realtimeendDate
                      }
                      className={
                        'w-full grid grid-cols-10 dark:bg-gray-800 bg-gray-100  px-4 py-1 ' +
                        `${item.excluded == true ? 'border-2 dark:border-red-700 border-red-500' : ' border dark:border-gray-700 border-gray-300 '}`
                      }
                    >
                      <div className="w-full col-span-3">
                        {item.realtimestarttag} {item.realtimestartDate}
                      </div>{' '}
                      <div className="w-full col-span-3">
                        von {item.realtimestart} bis {item.realtimeend}
                      </div>
                      <div
                        style={{ color: item.excluded == true ? '#ef4444' : '#1ca115' }}
                        className={`w-full col-span-2 flex flex-row items-center justify-end  font-bold`}
                      >
                        {item.excluded == true ? 'OFF' : 'ON'}
                      </div>
                      <div className="w-full col-span-2 flex flex-row items-center justify-center">
                        <button
                          onClick={() =>
                            exceptionHandler(item.RRObjectId, item.realtimestartDate, item.excluded)
                          }
                          className="ring-1 dark:ring-gray-700 flex flex-col items-center justify-center rounded-full p-1 dark:text-white text-black dark:bg-black/60 bg-black/20"
                        >
                          <MdChangeCircle className="inline" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-20">
              Keine Serien-Termine vorhanden
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default UpdateEntryRRuleSerieAusnahmen
