import React, { useEffect, useState } from 'react'

const Switch = ({ setter, wert }) => {
  const [isOn, setIsOn] = useState(false)

  const toggleSwitch = () => {
    setIsOn(!isOn)
    setter(!isOn) // Calls the provided setter function with the new value
  }
  useEffect(() => {
    setIsOn(wert)
  }, [wert])
  return (
    <button
      onClick={toggleSwitch}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
        isOn ? 'bg-green-500' : 'bg-gray-300'
      } focus:outline-none`}
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
          isOn ? 'translate-x-6' : ''
        }`}
      ></span>
    </button>
  )
}

export default Switch
