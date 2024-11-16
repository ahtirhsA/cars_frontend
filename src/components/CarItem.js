import React from "react"
import {Link} from 'react-router-dom'
import './CarItem.css'

const CarItem=(props)=>{

    const {obj}=props

    const {id,car_name,thumbnail}=obj

   return (

    <Link to={`/products/${id}`} className="Link">
     <li className="li">
       <img src={thumbnail} alt="thumbnail" className="coverIm"/>
       <p className="p"> {car_name} </p> 
     </li>
     </Link>
   )
}

export default CarItem