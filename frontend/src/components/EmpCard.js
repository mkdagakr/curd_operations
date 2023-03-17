import React, { useContext, useEffect } from 'react';
import empContext from '../context/empContext';
import Card from './Card';

const EmpCard = () => {

    const context = useContext(empContext);
    const { empInfo } = context;

    const handleUpdate = () => {
        console.log('Hello');

    }



    return (
        <>
            <table className="table">
                <thead className='table-primary'>
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Employee Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No.</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
            </table>
            {/* <div className="row my-3"> */}
                {empInfo.map((data) => {
                    return <Card key={data._id} handleUpdate={handleUpdate} emp={data} />
                })}
            {/* </div> */}

        </>
    )
}

export default EmpCard