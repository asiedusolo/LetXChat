import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router'


const Profile = () => {
    const [user, setUser] = useState({})
    const username = useParams().username



    useEffect(() => {
        const fetchUser = async () => {
            console.log(username)
            const response = await axios.get(`http://localhost:5000/api/user?username=${username}`)
            setUser(response.data)
        } 
        fetchUser()
    }, [username])


    return (
        <div>
            <h1>Profile Page</h1>
            <h3>Welcome {user.name}</h3>
            <h3>@{user.username }</h3>
        </div>
    )
}


export default Profile