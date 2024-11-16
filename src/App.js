import React,{useState} from 'react'
import Form from './components/Form'
import Product from './components/Products'
import {Route,Routes} from 'react-router-dom'
import Details from './components/Details'
import RegistrationPage from './components/RegistrationPage'
import Login from './components/Login'
import UserProfile from './components/UserProfile'
import UserContext from './Context/UserContext'

const App=()=>{


  const [loginUserDetails,setloginUserDetails]=useState({loggedInUserName:'',loggedInUserId:''})

  const UserDetails=(userName,userIdn)=>{
     setloginUserDetails({loggedInUserName:userName,loggedInUserId:userIdn},)
  }

  return (
   <UserContext.Provider 
          value={{loginUserDetails,UserDetails}}
        >
     <Routes>
        <Route path='/' element={<RegistrationPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/products/:id' element={<Details/>}/>
     </Routes>
     </UserContext.Provider>

  )

}

export default App 