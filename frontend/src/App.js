import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


// all components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';
import Production from './components/Production';
import Quality from './components/Quality';
import EmpState from './context/empState';


function App() {
    return (
        <>
            <EmpState>
                <BrowserRouter>

                    <Navbar />

                    <Routes>
                        <Route exact path="/" element={<Login />} />
                        <Route exact path="/home" element={<Home />} />
                        <Route exact path="/admin" element={<Admin />} />
                        <Route exact path="/production" element={<Production />} />
                        <Route exact path="/quality" element={<Quality />} />
                    </Routes>

                </BrowserRouter>
            </EmpState>
        </>
    );
}

export default App;
