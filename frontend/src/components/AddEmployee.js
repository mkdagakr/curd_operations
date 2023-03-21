import React, { useContext, useState, useRef } from 'react';
import empContext from '../context/empContext';

const AddEmployee = () => {

    const refClose = useRef(null);

    const context = useContext(empContext);
    const { addEmpDetail } = context;

    const [newEmp, setNewEmp] = useState({ name: '', department: '', email: '', phone: '' });

    const onChange = (event) => {
        setNewEmp({ ...newEmp, [event.target.name]: event.target.value });
    }

    const handleAddnewEmp = (event) => {
        event.preventDefault();
        addEmpDetail(newEmp.name, newEmp.department, newEmp.email, newEmp.phone);
        setNewEmp({ name: '', email: '', phone: '' });
        refClose.current.click();
    }


    return (
        <>

            {/* we are using below Modal Button in EmpCard.js  */}

            {/* <div className="my-3">
                <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addEmpDataModal">
                    Add New Employee
                </button>
            </div> */}


            {/*---------------------Add New Employee Data Modal----------------------------- */}

            <div className="modal fade" id="addEmpDataModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Employee</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Employee Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={newEmp.name} aria-describedby="emailHelp" onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="department" className="form-label">Department</label>
                                    {
                                        localStorage.getItem('department') === 'Administrative' ?
                                            < select className="form-select form-select-lg mb-3" name='department' onChange={onChange} required >
                                                <option value="">Select Department</option>
                                                <option value="Administrative">Administrative</option>
                                                <option value="Production">Production</option>
                                                <option value="Quality">Quality</option>
                                            </select> :
                                            < select className="form-select form-select-lg mb-3" name='department' onChange={onChange} required >
                                                <option value="">Select Department</option>
                                                <option value={localStorage.getItem('department')}>{localStorage.getItem('department')}</option>
                                            </select>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="email" name='email' value={newEmp.email} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="tel" className="form-control" id="phone" name='phone' value={newEmp.phone} onChange={onChange} maxLength={10} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddnewEmp}>Add Employee</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddEmployee