import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import { getUserService } from "../services/user.services";

function Profile() {

    const {loggedUser} = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const [isFetching, setIsFetching] = useState(true);


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const foundUser = await getUserService(loggedUser._id)
            setUser(foundUser.data)
            setIsFetching(false)
        } catch (error) {
            console.log(error);
        }
    }

    if(isFetching){
        return <h2>Spinner...</h2>
    }

  return (
    <div>
        <img src={user.image} alt="profile pic" />
        <p>{user.firstName} {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Date of Birth: {user.dob}</p>
        <p>Client type: {user.role}</p>
        <p>Manager: {user.manager.fullName}</p>
        <Link to="/"><button>Edit profile</button></Link>
    </div>
  )
}

export default Profile