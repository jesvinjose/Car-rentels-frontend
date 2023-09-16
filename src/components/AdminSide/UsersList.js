import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/userslist")
      .then((response) => {
        // Check if the response data is an array before setting the state
        // console.log(response.data);
        if (Array.isArray(response.data)) {
          setUserData(response.data);
        } else {
          console.error(
            "Invalid data received from the server:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleBlock=async(id)=>{

    const res=await axios.put(`http://localhost:5000/admin/userblock/${id}`)
    console.log(id)

    console.log(res,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    const updatedUser=userData.map((i)=>i._id === id ? {...i ,blockStatus:true } : i)
    setUserData(updatedUser)


    
  }

  const handleUnblock=async(id)=>{
    console.log(id,"")
console.log("hellooooooooooooooooooooooo")
    const resss=await axios.put(`http://localhost:5000/admin/userunblock/${id}`)
    console.log(id)

    console.log(resss,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    const updatedUser=userData.map((i)=>i._id === id ? {...i ,blockStatus:false } : i)
    setUserData(updatedUser)


    
  }

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Users
        </h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {userData.length} users
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>EmailId</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Verification Status</span>
                        <svg
                          className="h-3"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Your SVG icon here */}
                        </svg>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Mobile Number
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Joining Date
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pr-4 text-sm font-normal text-right text-gray-500 dark:text-gray-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {userData.map((user) => (
                    <tr key={user._id} className="bg-white dark:bg-gray-900">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {user.emailId}
                      </td>
                      <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                        {user.verificationStatus}
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {user.mobileNumber}
                      </td>
                      <td className="py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleString()}
                      </td>
                      <td className="pr-4 py-3 text-sm font-medium text-right">
                        <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600">
                          View Details
                        </button>
                       {
                        user.blockStatus ? ( <button onClick={()=>handleUnblock(user._id)} className="ml-2 text-green-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">
                        UnBlock
                      </button>) : ( <button  onClick={()=>handleBlock(user._id)}   className="ml-2 text-red-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">
                          Block
                        </button>)
                       }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersList;
