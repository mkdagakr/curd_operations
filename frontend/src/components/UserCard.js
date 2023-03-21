import React, { useContext, useState } from 'react';
import empContext from '../context/empContext';
import CreateUser from './CreateUser';

// image url
import userPicIcon from '../image/user.png';
// css file
import '../style/usercard.css'

const UserCard = () => {

    const context = useContext(empContext);
    const { allUserInfo } = context;

    const [key, setKey] = useState({ userSearchKey: "" });

    const userOnChange = (event) => {
        setKey({ ...key, [event.target.name]: event.target.value });
    }


    return (
        <>

            {/*------------Add Employee Model button And Search box------------*/}

            <div className="my-3 d-flex justify-content-between">

                <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addUserDataModal">
                    Create New User
                </button>

                <div className='d-flex'>
                    <input className="form-control me-2" type="search" name='userSearchKey' onChange={userOnChange} placeholder="Search" aria-label="Search user data" />
                </div>
            </div>

            <CreateUser />


            {/* ---------------------------------All Users Data----------------------------------- */}
            <div className="d-flex flex-wrap usercard-container">
                {
                    allUserInfo.filter((data) => {
                        if (key.userSearchKey === "") {
                            return data;
                        } else if (data.name.toLowerCase().includes(key.userSearchKey.toLowerCase()) || data.email.toLowerCase().includes(key.userSearchKey.toLowerCase()) || data.department.toLowerCase().includes(key.userSearchKey.toLowerCase())) {
                            return data;
                        }
                    }).map((data, ind) => {
                        return (
                            <div key={ind} className="card my-3 mx-5 usercard-box">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={userPicIcon} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h3 className="card-title">{data.name}</h3>
                                            <div className="card-text"><b>Department:</b> {data.department}</div>
                                            <div className="card-text"><b>Email:</b> {data.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

            <hr />
        </>
    )
}

export default UserCard