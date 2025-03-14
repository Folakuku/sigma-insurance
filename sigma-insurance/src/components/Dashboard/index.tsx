import React from 'react';
import CustomerDetails from './CustomerDetails';
import Engagements from './Engagements';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h1>Customer Dashboard</h1>
            <CustomerDetails />
            <Engagements />
        </div>
    );
};

export default Dashboard;