import React from 'react'

function HeaderSkeleton() {
    return (
        <>
            <div className="max-md:hidden flex h-20 justify-around items-center sticky top-0 py-3 animate-pulse">
                <div className="w-12 h-12"></div>
                <div className='dark:bg-zinc-800 max-w-[95vw] flex justify-center rounded-lg w-[550px] z-20 h-20 text-white'>
                </div>
                <div className="relative w-12 h-12">
                </div>
            </div>
            <div className="md:hidden animate-pulse">
                <div className='flex h-20 justify-around items-center sticky top-0 py-1'>
                    <div className="w-12 h-12"></div>
                    <div className="absolute right-5 w-12 h-12">
                    </div>
                </div>
                <div className="dark:bg-zinc-800  fixed bottom-0 bg-blue-100 right-0 left-0 p-1 z-20 pt-2 opacity-95">
                   
                </div>
            </div>
        </>
    )
}

export default HeaderSkeleton
