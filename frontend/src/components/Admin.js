import React, { useContext, useEffect } from 'react';
import empContext from '../context/empContext';
import EmpCard from './EmpCard';
import UserCard from './UserCard';


const Admin = () => {

    const context = useContext(empContext);
    const { getUserDetail, getEmpDetails, getAllUserDetails} = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserDetail();
            getEmpDetails();
            getAllUserDetails();
        }
    }, [])

    return (
        <>
            <div className="container">
                
                <UserCard />
                <EmpCard />
            </div>
        </>
    )
}

export default Admin