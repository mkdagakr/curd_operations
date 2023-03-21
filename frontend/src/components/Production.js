import React, { useContext, useEffect } from 'react';
import empContext from '../context/empContext';
import EmpCard from './EmpCard';

const Production = () => {

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
                <EmpCard />
            </div>
        </>
    )
}

export default Production