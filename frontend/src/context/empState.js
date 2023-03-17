import React, { useState } from 'react';
import EmpContext from './empContext';

const empState = (props) => {

    const host = 'http://localhost:5000';

    const [userInfo, setUserInfo] = useState([]);
    const [empInfo, setEmpInfo] = useState([]);


    // get user details
    const getUserDetail = async () => {
        const url = '/userdetail';
        //API Call
        const response = await fetch(`${host}${url}`, {
            method: 'POST',
            headers: {
                'Conten-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const info = await response.json();
        setUserInfo(info);
    }


    // get all employess details
    const getEmpDetails = async () => {
        const url = '/employees';
        //API Call
        const response = await fetch(`${host}${url}`, {
            method: 'GET',
            headers: {
                'Conten-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
                'department': localStorage.getItem('department')
            }
        });

        const info = await response.json();
        setEmpInfo(info);
    }


    // add employee data
    const addEmpDetail = async (name, department, email, phone) => {

        const url = '/addemployee'
        //API Call
        const response = await fetch(`${host}${url}`, {
            method: 'POST',
            headers: {
                'Conten-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, department, email, phone })
        });

        getEmpDetails();
    }


    // edit employee detail
    const editEmpDetail = async (id, name, department, email, phone) => {

        const url = `/updatedata/${id}`
        //API Call
        const response = await fetch(`${host}${url}`, {
            method: 'PUT',
            headers: {
                'Conten-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, department, email, phone })
        });

        getEmpDetails();
    }


    // delete employee detail
    const deleteEmpDetail = async (id) => {

        const url = `/deletedata/${id}`
        //API Call
        const response = await fetch(`${host}${url}`, {
            method: 'DELETE',
            headers: {
                'Conten-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        getEmpDetails();
    }



    return (
        <EmpContext.Provider value={{ userInfo, empInfo, getUserDetail, getEmpDetails, addEmpDetail, editEmpDetail, deleteEmpDetail }}>
            {props.children}
        </EmpContext.Provider>
    )
}

export default empState;