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
        </>
    )
}

export default HeaderSkeleton
