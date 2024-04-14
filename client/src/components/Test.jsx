import React from 'react'

const Test = () => {
  return (
    <>
    <div className = "flex justify-center">
        <form action ="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="petImage" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
        </form>
    </div>
    </>
  )
}

export default Test