import React, { useContext, useState, useRef } from 'react';
import empContext from '../context/empContext';
import AddEmployee from './AddEmployee';

const EmpCard = () => {

    const refClick = useRef(null);
    const refClose = useRef(null);

    const context = useContext(empContext);
    const { empInfo, deleteEmpDetail, editEmpDetail } = context;

    const [updateData, setUpdateData] = useState({ eid: "", eName: "", eDepartment: "", eEmail: "", ePhone: "", searchKey: "" });


    const handleUpdate = (currData) => {
        setUpdateData({ eid: currData._id, eName: currData.name, eDepartment: currData.department, eEmail: currData.email, ePhone: currData.phone });
        refClick.current.click();
    }

    const onChange = (event) => {
        setUpdateData({ ...updateData, [event.target.name]: event.target.value });
    }


    const handleSaveEditData = () => {
        editEmpDetail(updateData.eid, updateData.eName, updateData.eDepartment, updateData.eEmail, updateData.ePhone);
        refClose.current.click();
    }


    const deleteInfo = (id, name) => {
        const response = confirm(`Do you want to delete ${name} infromation from database`);
        if (response) {
            deleteEmpDetail(id);
        }
    }



    return (
        <>
            {/*Button trigger modal and I used className='d-none' that's why button donot show on screen */}

            <button type="button" ref={refClick} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editEmpDataModal">
                Launch modal
            </button>


            {/*---------------------Edit Employee Data Modal----------------------------- */}

            <div className="modal fade" id="editEmpDataModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Employee Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="eName" className="form-label">Employee Name</label>
                                    <input type="text" className="form-control" id="eName" name="eName" value={updateData.eName} aria-describedby="emailHelp" onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eDepartment" className="form-label">Department</label>
                                    {
                                        localStorage.getItem('department') === 'Administrative' ?
                                            < select className="form-select form-select-lg mb-3" name='eDepartment' onChange={onChange} required >
                                                <option value="">Select Department</option>
                                                <option value="Administrative">Administrative</option>
                                                <option value="Production">Production</option>
                                                <option value="Quality">Quality</option>
                                            </select> :
                                            < select className="form-select form-select-lg mb-3" name='eDepartment' onChange={onChange} required >
                                                <option value="">Select Department</option>
                                                <option value={localStorage.getItem('department')}>{localStorage.getItem('department')}</option>
                                            </select>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eEmail" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="eEmail" name='eEmail' value={updateData.eEmail} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ePhone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="ePhone" name='ePhone' value={updateData.ePhone} onChange={onChange} maxLength={10} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveEditData}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*------------Add Employee Model button And Search box------------*/}

            <div className="my-3 d-flex justify-content-between">

                <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addEmpDataModal">
                    Add New Employee
                </button>

                <div className='d-flex'>
                    <input className="form-control me-2" type="search" name='searchKey' onChange={onChange} placeholder="Search" aria-label="Search" />
                </div>
            </div>

            <AddEmployee />


            {/* --------------------employees list in table formate---------------------------------- */}

            <table className="table table-striped">
                <thead className='table-primary'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No.</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>

                <tbody>
                    {empInfo.filter((data) => {
                        if (updateData.searchKey === "") {
                            return data;
                        } else if (data.name.toLowerCase().includes(updateData.searchKey.toLowerCase()) || data.email.toLowerCase().includes(updateData.searchKey.toLowerCase()) || data.department.toLowerCase().includes(updateData.searchKey.toLowerCase())) {
                            return data;
                        }
                    }).map((data, ind) => {
                        return (
                            <tr key={data._id}>
                                <th scope="row">{`${ind + 1}`}</th>
                                <td>{data.name}</td>
                                <td>{data.department}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td><i className="fa-solid fa-trash mx-2" style={{ cursor: 'pointer' }} onClick={() => (deleteInfo(data._id, data.name))}></i></td>
                                <td><i className="fa-solid fa-pen-to-square mx-2" style={{ cursor: 'pointer' }} onClick={() => (handleUpdate(data))}></i></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

        </>
    )
}

export default EmpCard