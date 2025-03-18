import React, { Fragment, useEffect, useRef, useState } from 'react'
import imgs from './../assets/Logo.png'
import { MdPerson, MdArrowDropDown, MdArrowDropUp, MdSearch, MdClose } from 'react-icons/md'
import { useFetchAuthAll } from '../services/useFetchAll'
import { util } from 'node-forge'
import { useLocation } from 'react-router-dom'

const DialogGroupUserSelect = ({
  show,
  close,
  title,
  message,
  cancelBtn = false,
  actionBtn1 = false,
  actionBtn2 = false,
  Btn2BgHover = null,
  Btn1BgHover = null,
  callbackBtn1 = null,
  callbackBtn2 = null,
  Btn2Txt = null,
  SelectedUsers,
  addUser,
  deleteUser
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const _allSelector = useRef('')
  const localdata = useLocation().state
  const [searchQuery, setSearchQuery] = useState('')
  const [fullList, setfullList] = useState([])
  const [kz, setkz] = useState('asc')
  const [na, setna] = useState('asc')
  const [gr, setgr] = useState('asc')
  const [selGroup, setselGroup] = useState('all')
  const [selectedGroups, setSelectedGroups] = useState([])
  const [gruppenList, setgruppenList] = useState([])
  const handleGroupSelection = (e) => {
    const value = e.target.value
    _allSelector.current.checked = false
    setselGroup(value)
    if (value === 'all') {
      setSelectedGroups([]) // Reset selection to show all groups
      getLists(sortConfig.key) // Reload with sorting applied
    } else {
      setSelectedGroups([value]) // Only allow one group selection
    }
  }
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase())
  }
  const getLists = async (sorter) => {
    const query = await useFetchAuthAll(
      `http://${apache}/electronbackend/index.php?path=getAllEmpfänger&a=${util.encode64(User.Name)}&t=${util.encode64(User.usertypeVP)}`,
      'ssdsdsd',
      'GET',
      null,
      null
    )

    if (query.length > 0) {
      if (sorter) {
        setSortConfig((prev) => ({
          key: sorter,
          direction: prev.key === sorter && prev.direction === 'asc' ? 'desc' : 'asc'
        }))
        setfullList(sortArray(query, sorter))
        setgruppenList(getDistinctGruppenWithCount(sortArray(query, sorter)))
      } else {
        setfullList(query)
        setgruppenList(getDistinctGruppenWithCount(query))
      }
    }
  }
  const sortArray = (arr, key) => {
    const { direction } = sortConfig
    return [...arr].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
  }
  const handleselect = (it) => {
    if (SelectedUsers.includes(it)) {
      deleteUser(it)
    } else {
      addUser(it)
    }
  }
  const filteredList = fullList.filter((item) => {
    const matchesGroup = selectedGroups.length === 0 || selectedGroups.includes(item.Gruppe)
    const matchesSearch =
      item.Anwender.toLowerCase().includes(searchQuery) ||
      item.Mitarbeiter.toLowerCase().includes(searchQuery)

    return matchesGroup && matchesSearch
  })
  const getDistinctGruppenWithCount = (data) => {
    const groupMap = {}

    data.forEach(({ Gruppe, Mitarbeiter }) => {
      if (!groupMap[Gruppe]) {
        groupMap[Gruppe] = new Set()
      }
      if (Mitarbeiter.trim()) {
        // Ignore empty Mitarbeiter
        groupMap[Gruppe].add(Mitarbeiter)
      }
    })

    return Object.entries(groupMap).map(([Gruppe, uniqueMitarbeiter]) => ({
      Gruppe,
      count: uniqueMitarbeiter.size
    }))
  }
  const handleAllSelect = () => {
    let isset = _allSelector.current.checked

    console.log(localdata)
    filteredList.forEach((item) => {
      if (isset == true) {
        addUser(item.Anwender)
      } else {
        deleteUser(item.Anwender)
      }
    })
    addUser(localdata.Sender)
  }
  useEffect(() => {
    getLists()
  }, [])
  useEffect(() => {
    if (sortConfig.key) {
      setfullList((prevList) => sortArray(prevList, sortConfig.key))
    }
  }, [sortConfig])
  return (
    <Fragment>
      {show && (
        <div
          className="fixed inset-0 dark:bg-gray-600 bg-black dark:bg-opacity-50 bg-opacity-40 flex justify-center items-center"
          onClick={(e) => close(e)}
        >
          <div className="min-w-[40%] max-w-[97%] flex flex-col ring-1 ring-[#0c101b] dark:ring-[#1b243b] rounded-sm">
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
            <div className="w-full dark:bg-gray-900 bg-white px-6 py-4 dark:text-white text-black text-sm font-[Arial]">
              <Fragment>
                <div className="flex flex-row items-center justify-start mt-4 gap-x-4 pb-2">
                  <label className="flex flex-row items-center justify-start mb-2">
                    <input
                      ref={_allSelector}
                      type="checkbox"
                      onChange={() => handleAllSelect()}
                      className=" w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm"
                    />
                    <a className="text-sm">Alle auswählen</a>
                  </label>
                  <div className="w-[60%]">
                    <select
                      value={selGroup}
                      onChange={(e) => handleGroupSelection(e)}
                      className="w-auto font-[arial]   text-blue-200/60 text-gray-500 rounded dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 ring-1 dark:ring-gray-700 ring-gray-400/90  flex-wrap  flex flex-row items-start justify-start outline-none gap-1 py-1 pr-8 pl-14 text-sm"
                    >
                      <option value="all">Alle Gruppen</option>
                      {gruppenList.length > 0 &&
                        gruppenList.map((item, index) =>
                          item.Gruppe == 'null' || item.Gruppe.trim() === '' ? (
                            ''
                          ) : (
                            <option
                              key={item.Gruppe + index + 'grupselectoropt'}
                              value={item.Gruppe}
                            >
                              {item.Gruppe} (
                              {
                                fullList.filter((i) =>
                                  i.Gruppe != null
                                    ? i.Gruppe.toLowerCase() == item.Gruppe.toLowerCase()
                                    : ''
                                ).length
                              }
                              )
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>
                <div className="w-full py-2 mb-2 relative">
                  <input
                    type="text"
                    placeholder="Suche nach Kürzel oder Name..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full font-[arial]   text-blue-200/60 text-gray-500 rounded dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 ring-1 dark:ring-gray-700 ring-gray-400/90  flex-wrap  flex flex-row items-start justify-start outline-none gap-1 py-1 pr-8 pl-14 text-sm"
                  />
                  <MdSearch className="absolute top-3 left-4 inset text-gray-400 text-xl" />
                  {searchQuery.trim().length > 0 ? (
                    <MdClose
                      onClick={() => setSearchQuery('')}
                      className="absolute cursor-pointer top-3 right-4 inset text-gray-400 text-xl"
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className="w-full min-h-[150px] max-h-[380px] overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 ring-1 flex flex-col items-start justify-start dark:ring-gray-400 ring-gray-500 divide-y dark:divide-gray-700 divide-gray-400">
                  <div className="w-full flex flex-row items-center justify-start py-2  dark:bg-black/40 bg-black/20 cursor-pointer px-2">
                    <div className="w-8 ml-2 aspect-square rounded-full flex flex-col items-center justify-center "></div>
                    <div
                      onClick={() => getLists('Anwender')}
                      className="w-40 ml-3 flex flex-row items-start justify-start"
                    >
                      Kürzel{' '}
                      <div className="w-4">
                        {sortConfig.key === 'Anwender' && sortConfig.direction === 'asc' ? (
                          <MdArrowDropDown className="text-xl" />
                        ) : (
                          <MdArrowDropUp className="text-xl" />
                        )}
                      </div>
                    </div>
                    <div
                      onClick={() => getLists('Mitarbeiter')}
                      className="w-full  ml-3 flex flex-row items-start justify-start"
                    >
                      Name
                      <div className="w-4">
                        {sortConfig.key === 'Mitarbeiter' && sortConfig.direction === 'asc' ? (
                          <MdArrowDropDown className="text-xl" />
                        ) : (
                          <MdArrowDropUp className="text-xl" />
                        )}
                      </div>
                    </div>
                    <div
                      onClick={() => getLists('Gruppe')}
                      className="w-64   ml-3 flex flex-row items-start justify-start"
                    >
                      Gruppe
                      <div className="w-4">
                        {sortConfig.key === 'Gruppe' && sortConfig.direction === 'asc' ? (
                          <MdArrowDropDown className="text-xl" />
                        ) : (
                          <MdArrowDropUp className="text-xl" />
                        )}
                      </div>
                    </div>
                  </div>
                  {filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
                      <div
                        key={item + index + 'leute'}
                        className="w-full flex flex-row items-center justify-start py-2 dark:hover:bg-white/10 bg-black/10 cursor-pointer px-2"
                      >
                        <input
                          type="checkbox"
                          checked={SelectedUsers.includes(item.Anwender)}
                          onChange={() => handleselect(item.Anwender)}
                          className=" w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm"
                        />
                        <div className="w-8 ml-2 aspect-square rounded-full flex flex-col items-center justify-center dark:bg-blue-900/60 bg-gray-900/20 dark:text-gray-300 text-gray-800">
                          <MdPerson />
                        </div>
                        <div className="w-36 ml-3">{item.Anwender.trim()}</div>
                        <div className="w-full ">
                          {item.Mitarbeiter.trim() != '' ? item.Mitarbeiter.trim() : ''}
                        </div>
                        <div className="w-64 ">
                          {item.Gruppe != null && item.Gruppe.trim() != ''
                            ? item.Gruppe.trim()
                            : ''}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full py-20 flex flex-col items-center justify-center">
                      Keine Empfänger gefunden
                    </div>
                  )}
                  <div className="hidden w-full py-16 flex flex-col items-center justify-center">
                    Keine Benutzer vorhanden
                  </div>
                </div>
              </Fragment>
            </div>
            <div className="w-full dark:bg-gray-900 bg-white px-6 py-4 dark:text-white text-white text-sm font-[Arial] flex flex-row items-end justify-end gap-x-4">
              {actionBtn2 ? (
                <button
                  onClick={(e) => callbackBtn2(e)}
                  className={`px-2 py-1 rounded ${Btn2BgHover === null ? '' : Btn2BgHover}`}
                >
                  {Btn2Txt === null ? 'Bestätigen' : Btn2Txt}
                </button>
              ) : (
                ''
              )}
              {actionBtn1 ? (
                <button
                  onClick={(e) => callbackBtn1(e)}
                  className={`px-2 py-1 rounded ${Btn1BgHover === null ? '' : Btn1BgHover}`}
                >
                  Löschen
                </button>
              ) : (
                ''
              )}
              {cancelBtn ? (
                <button
                  onClick={(e) => close(e)}
                  className="px-2 py-1 dark:bg-gray-600 bg-gray-500 rounded dark:hover:bg-gray-700 hover:bg-gray-700"
                >
                  Schliessen
                </button>
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

export default DialogGroupUserSelect
