import React from 'react'
import { GoSearch } from 'react-icons/go'

function SearchBar() {
  return (
    <div className='py-0 shadow-lg my-10 px-10 flex gap-3 items-center justify-start border w-[80%] sm:w-[50vw] rounded-lg h-16'>
      <div>
      <GoSearch/>
      </div>
      <input type='text' placeholder='Search'
      className='outline-none p-4 w-[95%] cursor-pointer dark:bg-zinc-800'
      ></input>
    </div>
  )
}

export default SearchBar
