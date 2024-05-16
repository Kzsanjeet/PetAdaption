import React, { useEffect, useState } from 'react'

const ViewFeedback = () => {
  const [feedbacklist,setfeedbacklist]=useState([])

    const getfeedback = async() =>{
        try {
            const resp = await fetch("http://localhost:5000/get-feedback")
            const feedbackdata = await resp.json() 
            console.log(feedbackdata.showComments)
            setfeedbacklist(feedbackdata.showComments)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getfeedback()
    },[])

  return (
    <div className="flex justify-center">
            <div className="w-full lg:w-3/4 p-4 lg:pl-36">
              {feedbacklist && feedbacklist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                  {feedbacklist.map((feedback, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{feedback.user?.firstname} {feedback.user?.lastname}</h3>
                        <p className="text-gray-500">{feedback.user?.email}</p>
                        <p className="mt-2 text-sm user-comment">{feedback.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">No feedbacks available</div>
              )}
            </div>
          </div>
  )
}

export default ViewFeedback
