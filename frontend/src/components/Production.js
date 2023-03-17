import React, { useContext, useEffect } from 'react';
import empContext from '../context/empContext';
import EmpCard from './EmpCard';
import AddEmployee from './AddEmployee';

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
                <AddEmployee />
                <EmpCard />
            </div>
        </>
    )
}

export default Production