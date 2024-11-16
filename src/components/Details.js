import React, { useState, useEffect, useContext } from "react";
import UserContext from "../Context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { Oval } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import './Details.css';

const statusObj1 = {
  success: 'SUCCESS',
  progress: 'LOADING',
  failure: 'FAILURE',
};

const Details = () => {
  const { loginUserDetails } = useContext(UserContext);
  const { loggedInUserName, loggedInUserId } = loginUserDetails;
  const tkn = Cookies.get(loggedInUserName);
  const { id } = useParams();
  const navigate = useNavigate();

  const [dispObj, setDispObj] = useState({ Status: 'INITIAL', Objct: {} });

  const detailsApi = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    };

    const resp = await fetch(`https://cars-backend-ezpt.onrender.com/details/${id}`, options);
    const jsData = await resp.json();

    if (resp.ok) {
      setDispObj({ Status: statusObj1.success, Objct: jsData });
    } else {
      setDispObj({ Status: statusObj1.failure });
    }
  };

  useEffect(() => {
    detailsApi();
  }, []);

  const editFunc = () => {
    navigate('/form', { state: id });
  };

  const deleteFunc = async () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    };

    await fetch(`https://cars-backend-ezpt.onrender.com/delete/${id}`, options);
    navigate('/product');
  };

  const onSuccessFunc1 = () => {
    const { Objct } = dispObj;
    const { car_desc, car_name, similarImages, thumbnail } = Objct;

    return (
      <div className="details-container">
        <div className="header-container">
          <div className="image-title-container">
            <img src={thumbnail} alt="thumb" className="coverImage" />
            <div className="title-description">
              <h5>{car_name}</h5>
              <p>{car_desc}</p>
            </div>
          </div>
          <div className="buttons-container">
            <button onClick={editFunc} className="button edit-btn">Edit</button>
            <button onClick={deleteFunc} className="button delete-btn">Delete</button>
          </div>
        </div>

        <div className="similar-images-container">
          <h4>Similar Images</h4>
          <ul className="simUl">
            {similarImages.map((i) => {
              return (
                <li key={i.id}>
                  <img src={i.image} alt={`car${i.id}`} className="similarImg" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const inProgressFunc1 = () => {
    return (
      <div className="loading-container">
        <Oval
          height={80}
          width={80}
          color="blue"
          ariaLabel="loading"
        />
      </div>
    );
  };

  const failureFunc1 = () => {
    return (
      <div className="failure-container">
        <img src='https://res.cloudinary.com/djzenbn7g/image/upload/v1731671634/error_h2arej.png' alt="error" />
        <p className='oops1'>Oops!!!</p>
        <p className='noFound1'>Try Again Later!!</p>
      </div>
    );
  };

  const switchFunct = () => {
    const { Status } = dispObj;

    switch (Status) {
      case statusObj1.success:
        return onSuccessFunc1();
      case statusObj1.progress:
        return inProgressFunc1();
      case statusObj1.failure:
        return failureFunc1();
      default:
        return null;
    }
  };

  return (
    <div>
      {switchFunct()}
    </div>
  );
};

export default Details;
