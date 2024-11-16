import React,{useState,useContext} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import UserContext from '../Context/UserContext'
import Cookies from 'js-cookie'

const Login=()=>{

    const {UserDetails}=useContext(UserContext)


    const navigate1=useNavigate()

    const [email1,setEmail1]=useState('')
    const [password1,setpswd1]=useState('')
    const [err,setErr]=useState(false)
    const [result,setRes]=useState(false)

    const mailFunc1=(event)=>{
        setEmail1(event.target.value)
    }

    const pswdFunc1=(event)=>{
        setpswd1(event.target.value)
    }


    const setInCookies=(tkn,nm,idnt)=>{
        Cookies.set(nm,tkn,{expires:365});
        UserDetails(nm,idnt)
        navigate1('/product')
    }


    const LoginApi=async ()=>{

        
        const LoginObj={
            mailId1:email1,
            pswrd1:password1
         }

         const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(LoginObj)
           }

        const response=await fetch('https://cars-backend-ezpt.onrender.com/login',options);
        
        

        if (response.ok===true){

          
            const LoginRes=await response.json()
  
            console.log(LoginRes)

            setInCookies(LoginRes.jwtToken,LoginRes.userLoginName,LoginRes.userIdt)
     
           
        }
        else if(response.status===401){
            setRes('Invalid Password')
        }
        else{
            setRes('User Does Not Exists')
        }
        
        
    }

    const submitFunc=(event)=>{

       event.preventDefault()
       

       if (email1.trim()==='' || password1.trim()===''){
         setErr(true)
       }
       else{
        LoginApi()
       }

    }

    return (
        <div className='regCon'>
    <form onSubmit={submitFunc}>
        <h1 className='regHead'> Login </h1>
        <div className='inp-label'>
            <label htmlFor='email' className='label'> Email* </label>
            <input type='text' placeholder='Enter your email' id='email' className='inpEle' onChange={mailFunc1} value={email1}/>
        </div>
        <div className='inp-label'>
            <label htmlFor='password' className='label'> Password* </label>
            <input type='text' placeholder='Enter your Password' id='password' className='inpEle' onChange={pswdFunc1} value={password1}/>
        </div>
        
        <div className='butCon'>
        <button className='regButt' type='submit'> Login </button>
        </div> 
        <p className='err'> {err?'* fields are required':''}</p>
        <p className='err'>{result} </p>
    </form>
    </div> 
    )
}

export default Login 