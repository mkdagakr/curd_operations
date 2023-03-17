import React, { useContext, useState, useEffect } from 'react';
import empContext from '../context/empContext';

const AddEmployee = () => {

    const context = useContext(empContext);
    const { addEmpDetail } = context;

    const [newEmp, setNewEmp] = useState({ name: '', department: '', email: '', phone: '' });
    const [proEnb, setProEnb] = useState(true);
    const [quaEnb, setQuaEnb] = useState(true);
    const [adminEnb, setAdminEnb] = useState(true);

    const onChange = (event) => {
        setNewEmp({ ...newEmp, [event.target.name]: event.target.value });
    }

    const handleAddnewEmp = (event) => {
        event.preventDefault();
        addEmpDetail(newEmp.name, newEmp.department, newEmp.email, newEmp.phone);
        setNewEmp({ name: '', department: '', email: '', phone: '' });
    }

    useEffect(() => {

        if (localStorage.getItem('department') === 'Administrative') {
            setAdminEnb(false);
        }
        if (localStorage.getItem('department') === 'Production') {
            setProEnb(false);
        }
        if (localStorage.getItem('department') === 'Quality') {
            setQuaEnb(false);
        }
    }, [])



    return (
        <>
            <form className='my-3'>
                <div className="mb-3">
                    <input type="text" className="form-control" id="name" name="name" value={newEmp.name} aria-describedby="emailHelp" onChange={onChange} placeholder='Employee name'/>
                </div>
                <div className="mb-3">
                    <select className="form-select form-select-lg mb-3" name='department' onChange={onChange} >
                        <option value="">Select Department</option>
                        <option value="Administrative" disabled={adminEnb}>Administrative</option>
                        <option value="Production" disabled={proEnb}>Production</option>
                        <option value="Quality" disabled={quaEnb}>Quality</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="email" name='email' value={newEmp.email} onChange={onChange} placeholder='Employee email'/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="phone" name='phone' value={newEmp.phone} onChange={onChange} placeholder='Employee phone number'/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddnewEmp}>Add New Employee</button>
            </form>
        </>
    )
}

export default AddEmployee