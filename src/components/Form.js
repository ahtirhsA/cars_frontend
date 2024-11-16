import React, { useState, useContext } from "react";
import Cookies from 'js-cookie';
import UserContext from "../Context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import './Form.css'

const Form = () => {
  const location = useLocation();
  const lcid = location.state;

  const { loginUserDetails } = useContext(UserContext);
  const { loggedInUserName, loggedInUserId } = loginUserDetails;

  const userToken = Cookies.get(loggedInUserName);

  const navigate1 = useNavigate();

  const [carImages, setCarImages] = useState([]);
  const [carName, setCarName] = useState('');
  const [desc, setDesc] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [err, setErr] = useState(false);

  const handleCarImagesChange = (e) => {
    const files = e.target.files;

    if (files.length > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }
    setCarImages(prevState => [...prevState, ...Array.from(files)]);
  };

  const submitFunc = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (carName.trim() === '' || desc.trim() === '' || thumbnail === null) {
      setErr(true);
    } else {
      setErr(false);
      formData.append('carName', carName);
      formData.append('description', desc);
      formData.append('userIdentity', loggedInUserId);
      formData.append('thumbnail', thumbnail);

      for (let i = 0; i < carImages.length; i++) {
        formData.append('images', carImages[i]);
      }
    }

    const response = await fetch('https://cars-backend-ezpt.onrender.com/upload-images', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });

    const jsondata = await response.json();
    console.log(jsondata);
    navigate1('/product');
  };

  const nameFunc = (e) => {
    setCarName(e.target.value);
  };

  const descFunc = (e) => {
    setDesc(e.target.value);
  };

  const thumbnailFunc = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const updateFunc = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (carName.trim() === '' || desc.trim() === '' || thumbnail === null) {
      setErr(true);
    } else {
      setErr(false);
      formData.append('carName', carName);
      formData.append('description', desc);
      formData.append('userIdentity', loggedInUserId);
      formData.append('updImg', thumbnail);

      for (let i = 0; i < carImages.length; i++) {
        formData.append('updImages', carImages[i]);
      }
    }

    await fetch(`https://cars-backend-ezpt.onrender.com/update/${lcid}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });

    navigate1('/product');
  };

  return (
    <div className="main-conatiner">
      <h3> Car Information</h3>
    <form onSubmit={lcid ? updateFunc : submitFunc} method={lcid ? "PUT" : "POST"} encType="multipart/form-data" className="form-container">
      <div className="form-field">
        <label htmlFor="name" className="form-label"> *Car Name </label>
        <input type="text" id="name" placeholder="Enter the car name" value={carName} onChange={nameFunc} className="form-input" />
      </div>

      <div className="form-field">
        <label htmlFor="description" className="form-label"> *Car Description </label>
        <textarea rows={5} cols={50} placeholder="Enter your description!!" id="description" onChange={descFunc} value={desc} className="form-textarea"></textarea>
      </div>

      <div className="form-field">
        <label htmlFor="coverIm" className="form-label"> *{lcid ? 'Update' : 'Add'} Cover Image </label>
        <input type="file" accept="image/*" name={lcid ? "updImg" : "thumbnail"} id="coverIm" onChange={thumbnailFunc} className="form-file" />
      </div>

      <div className="form-field">
        <label htmlFor="images" className="form-label"> *{lcid ? 'Update' : 'Add'} sample Images (max-limit:10)</label>
        <input type="file" id="images" name={lcid ? "updImages" : "images"} accept="image/*" multiple required onChange={handleCarImagesChange} className="form-file" />
      </div>

      <button type="submit" className="form-button"> {lcid ? 'Update' : 'Add'} </button>
      <p className="form-error"> {err ? "Check the input * fields" : ''}</p>
    </form>
    </div>
  );
};

export default Form;
