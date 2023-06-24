import React, { useState } from 'react'
import Arrow from '../assets/icon-arrow.svg'

const Counter = () => {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [days, setDays] = useState('--')
  const [months, setMonths] = useState('--')
  const [years, setYears] = useState('--')
  const [dayError, setDayError] = useState('')
  const [monthError, setMonthError] = useState('')
  const [yearError, setYearError] = useState('')

  // Age calculation & adjusted states
  const calculateAge = () => {
    const currentDate = new Date()
    const birthDate = new Date(`${month}/${day}/${year}`)

    // Validate if provided year is greater than current year
    if (currentDate.getFullYear() < birthDate.getFullYear()) {
      setYearError('Invalid Year')
      return
    } else {
      setYearError('')
    }

    // Calculate the difference in years, months, and days
    let diffInYears = currentDate.getUTCFullYear() - birthDate.getUTCFullYear()
    let diffInMonths = currentDate.getUTCMonth() - birthDate.getUTCMonth()
    let diffInDays = currentDate.getUTCDate() - birthDate.getUTCDate()

    // In case of negative days...
    if (diffInDays < 0) {
      diffInMonths--
      const lastMonthDate = new Date(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        0
      ).getUTCDate()
      diffInDays += lastMonthDate
    }

    // In case of negative months...
    if (diffInMonths < 0) {
      diffInYears--
      diffInMonths += 12
    }

    // Update the states of the results
    setYears(diffInYears)
    setMonths(diffInMonths)
    setDays(diffInDays)
  }

  return (
    <div className='h-screen font-pop flex justify-center items-center'>
      <div className='border rounded-br-[150px] rounded-3xl bg-gray-100 shadow-gray-400 shadow-lg'>
        <div className='flex gap-6 px-4 py-6 md:px-8 md:py-10 sm:px-5 sm:py-9'>

          {/* Input Day */}
          <div className=''>
            <h3 className='mb-3 ml-[2px] text-xs font-light text-black'>DAY</h3>
            <input
              className='h-12 w-[90px] sm:w-[160px] pl-4 border rounded outline-none'
              type='number'
              placeholder='DD'
              value={day}
              onChange={(e) => {
                const inputDay = parseInt(e.target.value)
                if (inputDay > 0 && inputDay <= 31) {
                  setDay(inputDay)
                  setDayError('')
                } else {
                  setDay(inputDay)
                  setDayError('Invalid Day')
                }
              }}
            />

            {dayError && (
              <p className='text-md text-red-500 py-2 px-[2.4px]'>{dayError}</p>
            )}
          </div>

          {/* Input Month  */}
          <div className='flex-col'>
            <h3 className='mb-3 ml-[2px] text-xs font-light text-black'>MONTH</h3>
            <input
              className='h-12 w-[90px] sm:w-[160px] pl-4 border rounded outline-none'
              type='number'
              placeholder='MM'
              value={month}
              onChange={(e) => {
                const inputMonth = parseInt(e.target.value)
                if (inputMonth > 0 && inputMonth <= 12) {
                  setMonth(inputMonth)
                  setMonthError('')
                } else {
                  setMonth(inputMonth)
                  setMonthError('Invalid Month')
                }
              }}
            />
            {monthError && (
              <p className='text-md text-red-500 py-2 px-[2.4px]'>
                {monthError}
              </p>
            )}
          </div>

          {/* Input Year */}
          <div className='flex-col'>
            <h3 className='mb-3 ml-[2px] text-xs font-light text-black'>YEAR</h3>
            <input
              className='h-12 w-[90px] sm:w-[160px] pl-4 border rounded outline-none'
              type='number'
              placeholder='YY'
              value={year}
              onChange={(e) => {
                const inputYear = parseInt(e.target.value)
                if (inputYear <= new Date().getFullYear()) {
                  setYear(inputYear)
                  setYearError('')
                } else {
                  setYear(inputYear)
                  setYearError('Invalid Year')
                }
              }}
            />
            {yearError && (
              <p className='text-md text-red-500 py-2 px-[2.4px]'>
                {yearError}
              </p>
            )}
          </div>
        </div>

        {/* Calculate Button & Results */}
        <div className='mt-3 relative'>
          <div className='absolute -top-8 right-[160px] sm:right-0'>
            <button
              className='bg-purple-600 w-12 h-12 sm:w-14 sm:h-14 p-3 mt-2 rounded-full'
              onClick={calculateAge}
            >
              <img src={Arrow} alt='Calculate age' />
            </button>
          </div>
        </div>
        <div className='p-5 border-gray-500 border-t-2 mb-2'>
          <p className='text-4xl sm:text-5xl font-bold text-black italic'>
            <span className='text-purple-600'>{years}</span> years
          </p>
          <p className='text-4xl sm:text-5xl font-bold mt-8 text-black italic'>
            <span className='text-purple-600'>{months}</span> months
          </p>
          <p className='text-4xl sm:text-5xl font-bold mt-8 text-black italic'>
            <span className='text-purple-600'>{days}</span> days
          </p>
        </div>
      </div>
    </div>
  )
}

export default Counter
