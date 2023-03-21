import React, { useContext, useState, useRef } from 'react';
import empContext from '../context/empContext';

const CreateUser = () => {

    const refUserClose = useRef(null);

    const context = useContext(empContext);
    const { getAllUserDetails } = context;

    const [createUserData, setCreateUserData] = useState({ cUDName: "", cUDDepartment: "", cUDEmail: "", cUDPhone: "", cUDPassword: "", cUDCpassword: "", cUDUsername: "" })

    const userDataOnChange = (event) => {
        setCreateUserData({ ...createUserData, [event.target.name]: event.target.value })
    }

    const handleAddnewUser = async (e) => {
        e.preventDefault();

        const { cUDName, cUDDepartment, cUDEmail, cUDPhone, cUDPassword, cUDCpassword, cUDUsername } = createUserData;

        if (cUDName === "" || cUDDepartment === "" || cUDEmail === "" || cUDPhone === "" || cUDPassword === "" || cUDCpassword === "" || cUDUsername === "") {
            return alert('Please filled all fields');
        }

        if (cUDPassword !== cUDCpassword) {
            return alert('Password and Confirm password must be same');
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: cUDName, department: cUDDepartment, email: cUDEmail, phone: cUDPhone, password: cUDPassword, cpassword: cUDCpassword, username: cUDUsername })
            })

            const info = await response.json();

            if (info.authtoken === undefined) {
                return alert('Some error occurred');
            } else {
                alert(`Acount Successfully Created`);
            }

        } catch (error) {
            alert('Some error occurred');
        }

        getAllUserDetails();
        refUserClose.current.click();
        setCreateUserData({ cUDName: "", cUDDepartment: "", cUDEmail: "", cUDPhone: "", cUDPassword: "", cUDCpassword: "", cUDUsername: "" });
    }

    return (
        <>
            {/* we are using below Modal Button in EmpCard.js  */}

            {/* <div className="my-3">
                <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addUserDataModal">
                    Add New User
                </button>
            </div> */}


            {/*---------------------Add New User Data Modal----------------------------- */}

            <div className="modal fade" id="addUserDataModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Employee</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="cUDName" className="form-label">User Name</label>
                                    <input type="text" className="form-control" id="cUDName" name="cUDName" value={createUserData.cUDName} aria-describedby="emailHelp" onChange={userDataOnChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cUDDepartment" className="form-label">Department</label>
                                    < select className="form-select form-select-lg mb-3" id='cUDDepartment' name='cUDDepartment' onChange={userDataOnChange} required >
                                        <option value="">Select Department</option>
                                        <option value="Administrative">Administrative</option>
                                        <option value="Production">Production</option>
                                        <option value="Quality">Quality</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cUDUsername" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="cUDUsername" name='cUDUsername' value={createUserData.cUDUsername} onChange={userDataOnChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cUDEmail" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="cUDEmail" name='cUDEmail' value={createUserData.cUDEmail} onChange={userDataOnChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cUDPhone" className="form-label">Phone</label>
                                    <input type="tel" className="form-control" id="cUDPhone" name='cUDPhone' value={createUserData.cUDPhone} onChange={userDataOnChange} maxLength={10} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cUDPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="cUDPassword" name='cUDPassword' value={createUserData.cUDPassword} onChange={userDataOnChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cUDCpassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="cUDCpassword" name='cUDCpassword' value={createUserData.cUDCpassword} onChange={userDataOnChange} required />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refUserClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddnewUser}>Create Account</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateUser