import React from 'react'

function PostSkeleton() {
    return (
        <div className="cursor-pointer py-5 animate-pulse max-w-[90vw] md:max-w-[70vw] lg:max-w-[35vw] mx-auto">
            <div className="flex justify-between px-5">
                <div className="flex">
                    <div className="rounded-full bg-gray-200 w-11 h-11 flex justify-center items-center"></div>
                    <div className="flex flex-col mx-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="flex">
                            <span className="lg:max-w-[20vw] md:max-w-[25vw] max-w-[40vw] overflow-x-hidden whitespace-nowrap h-4 bg-gray-200 rounded"></span>
                            <span className="h-4 bg-gray-200 rounded"></span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="relative">
                        <div className="bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
            <div className="py-1 mx-10 flex flex-col justify-between border-l-2 h-auto border-gray-500 text-center ">
                <div className="h-auto px-3">
                    <div className="h-50 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-5 px-5 py-2">
                    <div className="h-5 bg-gray-200 rounded"></div>
                    <div className="h-5 bg-gray-200 rounded"></div>
                    <div className="h-5 bg-gray-200 rounded"></div>
                    <div className="h-5 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="mx-11 flex gap-3 text-slate-500 ">
                <div className="relative w-8 h-8">
                    <div className="absolute w-8 h-8 bg-gray-200 rounded-full left-0 top-0"></div>
                    <div className="absolute w-8 h-8 bg-gray-200 rounded-full right-6 top-1"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div onClick="" className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
        </div>
    )
}

export default PostSkeleton
