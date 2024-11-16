import React,{useState,useEffect,useContext} from 'react'
import { useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { Oval } from 'react-loader-spinner';
import CarItem from './CarItem'
import UserContext from '../Context/UserContext'
import './Products.css'


const statusObj={
    success:'SUCCESS',
    progress:'LOADING',
    failure:'FAILURE'
}

const Product=()=>{

    const navigate2=useNavigate()

    const {loginUserDetails}=useContext(UserContext)

    const {loggedInUserName,loggedInUserId}=loginUserDetails

    const jwtTkn=Cookies.get(loggedInUserName)


    const [search,setSearch]=useState('')

    const [status,setStatus]=useState({sts:'INITIAL',carObj:[]})

    const searchApi=async ()=>{

        const options={
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                 Authorization:`Bearer ${jwtTkn}`
            }
        }

       setStatus({sts:statusObj.progress})

        const response=await fetch(`https://cars-backend-ezpt.onrender.com/products/${loggedInUserId}?search=${search}`,options)

        if (response.ok){
            const jsondata=await response.json()
            setStatus({sts:statusObj.success,carObj:jsondata.data})
        }
        else{
           setStatus({sts:statusObj.failure})
        }

    }


    const searchFunc=(e)=>{
       setSearch(e.target.value)
    }


    useEffect(()=>{
        searchApi()
    },[search])


    const noSearchResults=()=>{

       return ( 
       <div className='no-search-container'>
        <img src='https://cdn.dribbble.com/users/1121009/screenshots/11030107/media/25be2b86a12dbfd8da02db4cfcbfe50a.jpg?resize=400x0' alt="No results"/>
        <p className='oops1'> Oops!!! </p>
        <p className='noFound1'> No Search Results!!</p>
       </div>
       )
    }


    const onSuccessFunc=()=>{

       const {carObj}= status

       console.log(carObj)

       return (
        <ul className="car-list">
            {
              carObj.length===0?noSearchResults():carObj.map((i)=>(<CarItem obj={i} key={i.id}/>))
            }
        </ul>
       )

    }

    const inProgressFunc=()=>{

       return (
        <div className='loading-container'>
            <Oval 
                height={80} 
                width={80} 
                color="blue" 
                ariaLabel="loading"
            />
        </div>
       )

    }

    const failureFunc=()=>{

       return (
        <div className='failure-container'>
             <img src='https://res.cloudinary.com/djzenbn7g/image/upload/v1731671634/error_h2arej.png' alt="Error"/>
           <p className='oops1'> Oops!!! </p>
           <p className='noFound1'> Try Again Later!!</p>
        </div>
       )
    }

    const switchFunc=()=>{
        const {sts}=status

        switch(sts){
            case statusObj.success:
                return onSuccessFunc()

            case statusObj.progress:
                return inProgressFunc()
            
            case statusObj.failure:
                return failureFunc()
        }

    }

    const profileFunc=()=>{
        navigate2('/userprofile')
    }

    const logoutFunc=async ()=>{

        const options={
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwtTkn}`
          }
        }
    
        const delUserApi=await fetch(`https://cars-backend-ezpt.onrender.com/delUser/${loggedInUserId}`,options)
    
        const txtResp=await delUserApi.text()

        console.log(txtResp)
    
    
        if (txtResp=="deleted"){
          navigate2('/')
          Cookies.remove(loggedInUserName)
        }
        
    }

    const addCarsFunc=()=>{
        navigate2('/form')
    }


    return (
        <div className="product-container">
            <nav className="navbar">
                <span className="username">{loggedInUserName}</span>
                <button className="profile-btn" onClick={profileFunc}> Update Profile</button>
                <button className="logout-btn" onClick={logoutFunc}> Logout </button>
            </nav>
           <input className="search-bar" type='search' placeholder='Search Bar' id='search' value={search} onChange={searchFunc}/>
           <button className="add-car-btn" onClick={addCarsFunc}> Add Cars</button>
           {switchFunc()}
        </div>
    )
}

export default Product
