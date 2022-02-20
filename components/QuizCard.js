import React from 'react'

export const QuizCard = () => {
    return (
        <section>
             <div className='flex justify-end'>
                <button type="button" className="mr-10 block-inline px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Create Quiz
                </button>
            </div>
            <div className="flex justify-start ml-2">
                <div className="rounded-lg shadow-lg bg-white max-w-sm">
                    <img className="rounded-t-lg" src="/quiz.jpg" alt=""/>
                    <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">Quiz title</h5>
                    <p className="text-gray-700 text-base mb-4">
                        Read it before start: 1. no copy 2. no refer 3. no peek
                    </p>
                    <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Start
                    </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
