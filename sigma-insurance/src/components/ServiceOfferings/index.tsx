import React from 'react';

const ServiceOfferings: React.FC = () => {
    const offerings = [
        {
            title: 'Home Insurance',
            description: 'Protect your home and belongings with our comprehensive home insurance plans.',
            image: '/images/home-insurance.jpg'
        },
        {
            title: 'Auto Insurance',
            description: 'Get reliable coverage for your vehicle with our customizable auto insurance options.',
            image: '/images/auto-insurance.jpg'
        },
        {
            title: 'Life Insurance',
            description: 'Secure your family’s future with our affordable life insurance policies.',
            image: '/images/life-insurance.jpg'
        },
        {
            title: 'Health Insurance',
            description: 'Access quality healthcare with our flexible health insurance plans.',
            image: '/images/health-insurance.jpg'
        }
    ];

    return (
        <div className="service-offerings">
            <h2>Our Service Offerings</h2>
            <div className="offerings-grid">
                {offerings.map((offering, index) => (
                    <div key={index} className="offering-card">
                        <img src={offering.image} alt={offering.title} />
                        <h3>{offering.title}</h3>
                        <p>{offering.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceOfferings;