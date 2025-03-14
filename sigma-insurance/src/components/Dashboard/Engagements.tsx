import React from 'react';

const Engagements: React.FC = () => {
    const engagementsData = [
        { id: 1, customer: 'John Doe', interaction: 'Email', date: '2023-10-01', notes: 'Follow-up on policy renewal.' },
        { id: 2, customer: 'Jane Smith', interaction: 'Call', date: '2023-10-02', notes: 'Discussed new service offerings.' },
        { id: 3, customer: 'Alice Johnson', interaction: 'Meeting', date: '2023-10-03', notes: 'Reviewed claim status.' },
    ];

    return (
        <div className="engagements">
            <h2>Customer Engagements</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Interaction Type</th>
                        <th>Date</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {engagementsData.map(engagement => (
                        <tr key={engagement.id}>
                            <td>{engagement.id}</td>
                            <td>{engagement.customer}</td>
                            <td>{engagement.interaction}</td>
                            <td>{engagement.date}</td>
                            <td>{engagement.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Engagements;