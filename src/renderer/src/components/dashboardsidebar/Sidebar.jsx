import React, { useEffect, useState } from 'react'
import { FaInbox } from 'react-icons/fa6'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import { MdFilePresent, MdLogout, MdNotes, MdOutlineDeleteSweep, MdPostAdd } from 'react-icons/md'
import { BiCalendar, BiMailSend } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { RiMailAddFill } from 'react-icons/ri'
import { util } from 'node-forge'
import { useFetchAuthAll } from '../../services/useFetchAll'
import { useRoles } from '../../styles/RoleContext'

const Sidebar = () => {
  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const [menubar, setmenubar] = useState()
  const [messages, setmessages] = useState(0)
  const { hasPermission } = useRoles()
  const navigate = useNavigate()
  const logout = () => {
    window.sessionStorage.clear()
    navigate('/overview')
  }
  const frameHandler = (num) => {
    if (num == 1) {
      navigate('/dashboard')
    } else if (num == 2) {
      navigate('/dashboardsend')
    } else if (num == 3) {
      navigate('/dashboardtrash')
    } else if (num == 4) {
      navigate('/file-explorer')
    } else if (num == 5) {
      navigate('/new-message')
    } else if (num == 6) {
      navigate('/pinwall')
    } else if (num == 7) {
      navigate('/calendar')
    }
  }
  const getAllMessagesNew = async () => {
    const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
    const query = await useFetchAuthAll(
      'http://' +
        apache +
        '/electronbackend/index.php?path=getAllMessagesIntCount&a=' +
        util.encode64(User.Name) +
        '&t=' +
        util.encode64(User.usertypeVP),
      'ssdsdsd',
      'GET',
      null,
      null
    )
    if (query > 0) {
      setmessages(query)
      if (!window.localStorage.getItem('notifierInt')) {
        window.localStorage.setItem(
          'notifierInt',
          Number(parseInt(new Date().getTime()) + 20 * 60 * 1000)
        )
        window.api.notifier.sendnotify(query)
      } else {
        if (parseInt(new Date().getTime()) > parseInt(window.localStorage.getItem('notifierInt'))) {
          window.api.notifier.sendnotify(query)
          window.localStorage.setItem(
            'notifierInt',
            Number(parseInt(new Date().getTime()) + 20 * 60 * 1000)
          )
        }
      }
    }
  }
  useEffect(() => {
    getAllMessagesNew()

    // Set up the interval to call the function every 10 seconds
    const interval = setInterval(() => {
      getAllMessagesNew()
    }, 10000) // 10000ms = 10 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval)
  }, []) // Empty dependency array ensures it runs once on mount
  useEffect(() => {
    if (window.location.hash == '#/dashboard') {
      setmenubar(1)
    } else if (window.location.hash == '#/dashboardsend') {
      setmenubar(2)
    } else if (window.location.hash == '#/dashboardtrash') {
      setmenubar(3)
    } else if (window.location.hash == '#/file-explorer') {
      setmenubar(4)
    } else if (window.location.hash == '#/new-message') {
      setmenubar(5)
    } else if (window.location.hash == '#/pinwall') {
      setmenubar(6)
    } else if (window.location.hash.includes('#/calendar')) {
      setmenubar(7)
    }
  }, [])
  return (
    <div aria-label="sidebar">
      <div className="absolute inset-0 -left-1 -top-[0.1rem] w-14 bg-gray-900/90 border-r border-gray-800 max-h-[100.04%] overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-center justify-start ">
        {menubar == 5 ? (
          <div
            onClick={() => frameHandler(5)}
            className=" dark:bg-blue-600/60 bg-blue-600/60 text-gray-200  p-1 text-xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
          >
            <div
              title="Neue Nachricht"
              className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer "
            >
              <RiMailAddFill />
            </div>
          </div>
        ) : (
          <div
            onClick={() => frameHandler(5)}
            className="text-gray-500 p-1 text-xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
          >
            <div
              title="Neue Nachricht"
              className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer "
            >
              <RiMailAddFill />
            </div>
          </div>
        )}
        {menubar == 1 ? (
          <div
            onClick={() => frameHandler(1)}
            className=" dark:bg-blue-600/60 bg-blue-600/60 text-gray-200  p-1 text-xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)] relative"
          >
            {messages > 0 ? (
              <span className="absolute inset -top-1 right-1 py-0.5 px-1 text-sm bg-red-600 rounded">
                {messages}
              </span>
            ) : (
              ''
            )}
            <div
              title="Posteingang"
              className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer "
            >
              <FaInbox />
            </div>
          </div>
        ) : (
          <div
            onClick={() => frameHandler(1)}
            className="text-gray-500 p-1 text-xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)] relative"
          >
            {messages > 0 ? (
              <span className="absolute inset -top-1 right-1 py-0.5 px-1 text-sm text-white bg-red-600 rounded">
                {messages}
              </span>
            ) : (
              ''
            )}
            <div
              title="Posteingang"
              className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer "
            >
              <FaInbox />
            </div>
          </div>
        )}
        {menubar == 2 ? (
          <div
            onClick={() => frameHandler(2)}
            className="dark:bg-blue-600/60 bg-blue-600/60 text-gray-200 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
          >
            <div
              title="Postausgang"
              className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
            >
              <BiMailSend />
            </div>
          </div>
        ) : (
          <div
            onClick={() => frameHandler(2)}
            className="text-gray-500 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
          >
            <div
              title="Postausgang"
              className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
            >
              <BiMailSend />
            </div>
          </div>
        )}
        {menubar == 3 ? (
          <div
            onClick={() => frameHandler(3)}
            className="dark:bg-blue-600/60 bg-blue-600/60 text-gray-200 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
          >
            <div
              title="Papierkorb"
              className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
            >
              <MdOutlineDeleteSweep />
            </div>
          </div>
        ) : (
          <div
            onClick={() => frameHandler(3)}
            className="text-gray-500 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
          >
            <div
              title="Papierkorb"
              className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
            >
              <MdOutlineDeleteSweep />
            </div>
          </div>
        )}
        {menubar == 4 ? (
          <div
            onClick={() => frameHandler(4)}
            className="dark:bg-blue-600/60 bg-blue-600/60 text-gray-200 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
          >
            <div
              title="Datei Explorer"
              className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
            >
              <MdFilePresent />
            </div>
          </div>
        ) : (
          <div
            onClick={() => frameHandler(4)}
            className="text-gray-500 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
          >
            <div
              title="Datei Explorer"
              className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
            >
              <MdFilePresent />
            </div>
          </div>
        )}
        {menubar == 6 ? (
          <>
            {hasPermission('view:notes') ? (
              <div
                onClick={() => frameHandler(6)}
                className="dark:bg-blue-600/60 bg-blue-600/60 text-gray-200 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
              >
                <div
                  title="Meine Notizen"
                  className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
                >
                  <MdPostAdd />
                </div>
              </div>
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            {hasPermission('view:notes') ? (
              <div
                onClick={() => frameHandler(6)}
                className="text-gray-500 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
              >
                <div
                  title="Meine Notizen"
                  className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
                >
                  <MdPostAdd />
                </div>
              </div>
            ) : (
              ''
            )}
          </>
        )}
        {menubar == 7 ? (
          <>
            {hasPermission('view:calendar') ? (
              <div
                onClick={() => frameHandler(7)}
                className="dark:bg-blue-600/60 bg-blue-600/60 text-gray-200 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
              >
                <div
                  title="Kalender"
                  className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
                >
                  <BiCalendar />
                </div>
              </div>
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            {hasPermission('view:calendar') ? (
              <div
                onClick={() => frameHandler(7)}
                className="text-gray-500 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
              >
                <div
                  title="Kalender"
                  className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
                >
                  <BiCalendar />
                </div>
              </div>
            ) : (
              ''
            )}
          </>
        )}
        <div
          onClick={() => logout()}
          className="text-gray-500 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]"
        >
          <div
            title="Abmelden"
            className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer"
          >
            <MdLogout />
          </div>
        </div>
        <div className="text-gray-400 hidden p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center">
          <div
            title="Support"
            className="w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-700 hover:bg-blue-500/30 rounded cursor-pointer"
          >
            <HiChatBubbleLeftRight />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
