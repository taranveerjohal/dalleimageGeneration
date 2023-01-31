import React from 'react'

const FormField = ({ label, type, placeholder, name, value, handleChange, isSurpsriseMe }) => {
  return (
    <div>
        <div className='flex justify-start items-center gap-2 mb-2'>
           <label
                htmlFor={name}
                className='font-semibold text-gray-700 text-[16px]'
           >
                {label}
           </label>
              {isSurpsriseMe && (
                <button 
                    className='bg-gray-100 font-semibold text-xs text-gray-500 text-[14px] px-2 py-1 rounded-md 
                    shadow-md hover:bg-gray-300 hover:shadow-lg hover:scale-110 focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
                    onClick={isSurpsriseMe}
                    type='button'
                >
                    Surprise Me
                </button>
                )}
        </div>
       {label === 'Prompt' ? 
        <textarea 
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        rows='4'
        required
        className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-[#6469ff] focus:border-[#6469ff] outline-none'
    />
     :
        <input 
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required
        className=' border w-full border-gray-300 bg-gray-50 rounded-md text-sm text-gray-900 p-3 focus:ring-[#6469ff] focus:border-[#6469ff] outline-none'
    /> }
    </div>
  )
}

export default FormField