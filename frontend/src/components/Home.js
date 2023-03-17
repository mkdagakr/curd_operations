import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import empContext from '../context/empContext';

// components

const Home = () => {

    const context = useContext(empContext);
    const { getUserDetail, getEmpDetails } = context;

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('token')) {
            getUserDetail();
            getEmpDetails();
        }

        if (localStorage.getItem('department') === 'Administrative') {
            navigate('/admin')
        } else if (localStorage.getItem('department')  === 'Production') {
            navigate('/production')
        } else if (localStorage.getItem('department')  === 'Quality') {
            navigate('/quality')
        } else {
            navigate('/');
        }
    }, [])



    return (
        <>

        </>
    )
}

export default Home