import { useEffect, useState } from "react";



//for user profile
const ProfileUser = () => {
    const [userData, setUserData] = useState("")
    const userId = localStorage.getItem("userId")
    const getUser = async()=>{
        try {
            const resp = await fetch(`http://localhost:5000/get-user-data/${userId}`)
            const data = await resp.json()
            // console.log(data)
            if(data.success){
                setUserData(data.userData)
            }
        } catch (error) {
            console.log("error on showin profile: ", error)
        }
    }
    // console.log(userData)

    useEffect(()=>{
        getUser()
    },[])

    return (
        <>
            <div className="bg-gray-100 w-full lg:w-3/4 p-2 lg:ml-80">
                <div className="container mx-auto py-2">
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <hr className="my-6 border-t border-gray-300" />
                                <div className="flex flex-col">
                                <span className="mb-8"> Id: { userData._id}</span>

                                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">User name: </span>
                                    <span className="mb-8">{userData.firstname} {userData.lastname}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Email: </span>
                                    <span className="mb-8">{userData.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileUser;
