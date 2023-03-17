import React, { useContext } from 'react';
import empContext from '../context/empContext';
    

const User = (props) => {

    const { user, handleUpdate } = props;

    const context = useContext(empContext);
    const { deleteEmpDetail } = context;


    return (
        <>
            <div className='col-md-3'>
                <div className="card my-3">
                    <div className="card-body">
                        <div className='d-flex justify-content-between'>
                            <h5 className="card-title ">{user.name}</h5>
                            <div>
                                <i className="fa-solid fa-trash mx-2" onClick={() => (deleteEmpDetail(emp._id))}></i>
                                <i className="fa-solid fa-pen-to-square mx-2" onClick={() => (handleUpdate(emp))}></i>
                            </div>
                        </div>
                        <p className="card-text">Department: {user.department} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User