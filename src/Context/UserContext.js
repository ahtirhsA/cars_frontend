import React from "react"


const UserContext=React.createContext({
    loginUserDetails:{loggedInUserName:'',loggedInUserId:''},
    UserDetails:()=>{}
})

export default UserContext