import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const CalendarDayToday = () => {
  const { jahr, monat, tag } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (jahr == undefined && monat == undefined && tag == undefined) {
      navigate(
        '/calendar/day/' +
          new Date().getFullYear() +
          '/' +
          (new Date().getMonth() + 1) +
          '/' +
          new Date().getDate()
      )
    }
  }, [])
  return <></>
}
export default CalendarDayToday
