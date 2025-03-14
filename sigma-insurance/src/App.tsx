import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import DataAnalysis from './components/DataAnalysis';
import ServiceOfferings from './components/ServiceOfferings';
import Chatbot from './components/Chatbot';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/data-analysis" element={<DataAnalysis />} />
                    <Route path="/service-offerings" element={<ServiceOfferings />} />
                </Routes>
                <Chatbot />
            </div>
        </Router>
    );
};

export default App;