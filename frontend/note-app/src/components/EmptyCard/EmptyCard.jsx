import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
return (
    <div className="flex flex-col items-center min-h-screen">
        <img src={imgSrc} alt="No notes" className="m-10 w-70" />
        <p className="w-100 text-m font-medium text-white text-center leading-7">{message}</p>
    </div>
)
}

export default EmptyCard
