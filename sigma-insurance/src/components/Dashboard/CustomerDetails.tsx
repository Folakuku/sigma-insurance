import React from 'react';

const CustomerDetails: React.FC = () => {
    const customerData = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        policyNumber: "ABC123456",
        engagementHistory: [
            { date: "2023-01-01", interaction: "Policy Renewal" },
            { date: "2023-02-15", interaction: "Claim Filed" },
            { date: "2023-03-10", interaction: "Customer Inquiry" },
        ],
    };

    return (
        <div className="customer-details">
            <h2>Customer Details</h2>
            <div className="customer-info">
                <p><strong>Name:</strong> {customerData.name}</p>
                <p><strong>Email:</strong> {customerData.email}</p>
                <p><strong>Phone:</strong> {customerData.phone}</p>
                <p><strong>Policy Number:</strong> {customerData.policyNumber}</p>
            </div>
            <h3>Engagement History</h3>
            <ul>
                {customerData.engagementHistory.map((engagement, index) => (
                    <li key={index}>
                        {engagement.date}: {engagement.interaction}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerDetails;