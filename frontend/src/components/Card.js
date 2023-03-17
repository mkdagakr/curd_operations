import React, { useContext } from 'react';
import empContext from '../context/empContext';

const Card = (props) => {
    const { emp, handleUpdate } = props;

    const context = useContext(empContext);
    const { deleteEmpDetail } = context;

    const deleteInfo = (id, name)=>{
       const response = confirm(`Do you want to delete ${name} infromation from database`);

       if(response){
        deleteEmpDetail(id);
       }

    }



    return (
        <>
            <table className="table table-striped">
                <thead className='table-primary'>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* <th scope="row">1</th> */}
                        <td>{emp.name}</td>
                        <td>{emp.department}</td>
                        <td>{emp.email}</td>
                        <td>{emp.phone}</td>
                        <td><i className="fa-solid fa-trash mx-2" style={{cursor:'pointer'}} onClick={() => (deleteInfo(emp._id, emp.name))}></i></td>
                        <td><i className="fa-solid fa-pen-to-square mx-2" style={{cursor:'pointer'}} onClick={() => (handleUpdate(emp))}></i></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Card