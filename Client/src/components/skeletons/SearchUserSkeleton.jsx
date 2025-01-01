import React from 'react'

function SearchUserSkeleton() {
    return (
        <div className='md:w-[50vw] flex justify-start w-[80vw] py-2 my-2 hover:shadow-lg transition-all duration-300 animate-pulse'>
            <div className='mx-4 rounded-full bg-slate-800 w-11 h-11 flex justify-center items-center'>
                <div className="bg-gray-200 rounded-full w-full h-full"></div>
            </div>
            <div className='w-[80%] flex border-b justify-between items-start'>
                <div className='flex flex-col gap-2'>
                    <div>
                        <div className='font-semibold'>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>
                    <div className='font-light'>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
                <div
                    className='dark:bg-zinc-200 dark:hover:scale-105 px-4 py-1 border rounded-lg text-zinc-800 font-medium hover:bg-slate-100'
                >
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default SearchUserSkeleton