import React from 'react'

function ProfileLayoutSkeleton() {
    return (
        <>
            <div className=" flex flex-col w-full max-w-[50vw] my-10 p-4 space-y-4 animate-pulse">

                <div className="flex justify-between items-start">
                    <div className="flex flex-col space-y-1">
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="flex space-x-2">
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    </div>
                    <div className="rounded-full bg-gray-200 w-20 h-20"></div>
                </div>

                <div className="h-6 bg-gray-200 rounded w-full"></div>

                <div className="flex justify-between">
                    <div className="flex space-x-4 items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>

                <div className="h-10 bg-gray-200 rounded"></div>

                <div className="flex justify-around border-b pb-2">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>

                <div className="h-64 bg-gray-200 rounded"></div>

                <div></div>
            </div>
        </>
    )
}

export default ProfileLayoutSkeleton
