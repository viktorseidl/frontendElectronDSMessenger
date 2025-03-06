import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import { motion } from 'framer-motion'
import { parseISO } from 'date-fns'

const EventItem = ({ event, moveEvent, zIndex }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const startDate = parseISO(event.start)
  const endDate = parseISO(event.end)
  const daySpan = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1 // Duration in days

  return (
    <motion.div
      ref={preview}
      className={`absolute inset top-0 left-0 p-1 text-sm text-white rounded ${event.color} cursor-pointer ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        width: `${daySpan * 100}%`,
        top: `${zIndex * 2.0}rem`,
        zIndex: zIndex // Prevent overlapping of multiple events
      }}
    >
      <a ref={drag} className="select-none">
        {event.title}
      </a>
    </motion.div>
  )
}

export default EventItem
