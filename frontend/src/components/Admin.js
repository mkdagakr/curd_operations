import React, { useContext, useEffect } from 'react';
import EmpCard from './EmpCard';
import empContext from '../context/empContext';
// import AddEmployee from './AddEmployee';

const Admin = () => {

    const context = useContext(empContext);
    const { getUserDetail, getEmpDetails} = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserDetail();
            getEmpDetails();
        }
    }, [])

    return (
        <>
            <div className="container">
                {/* <AddEmployee /> */}
                <EmpCard />
            </div>
        </>
    )
}

export default Admin