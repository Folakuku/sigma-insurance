// filepath: c:\Users\Ugorumeyh\Desktop\si_bot\sigma-insurance\public\bundle.js
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    root.innerHTML = '<h2>Welcome to Sigma Insurance CRM</h2><p>Manage your clients, policies, claims, and reports efficiently.</p>';

    // Handle login and signup interactions
    const loginLink = document.getElementById('login');
    const signupLink = document.getElementById('signup');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    loginLink.addEventListener('click', () => {
        loginForm.classList.add('active');
    });

    signupLink.addEventListener('click', () => {
        signupForm.classList.add('active');
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Signup functionality is not implemented yet.');
        signupForm.classList.remove('active');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate successful login
        alert('Login successful!');
        loginForm.classList.remove('active');
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    });

    // Handle chatbot interactions
    const chatbot = document.getElementById('chatbot');
    const closeChatbotButton = document.getElementById('close-chatbot');
    const chatbotButton = document.getElementById('chatbot-button');

    chatbotButton.addEventListener('click', () => {
        chatbot.classList.add('active');
    });

    closeChatbotButton.addEventListener('click', () => {
        chatbot.classList.remove('active');
    });

    // Dashboard data
    const dashboardData = [
        {
            companyName: 'HealthCorp',
            industrySector: 'Healthcare',
            engagementLevel: 'High',
            email: 'contact@healthcorp.com',
            phoneNumber: '123-456-7890',
            lastInteraction: '2025-03-10 14:30'
        },
        {
            companyName: 'FinanceInc',
            industrySector: 'Finance',
            engagementLevel: 'Medium',
            email: 'info@financeinc.com',
            phoneNumber: '987-654-3210',
            lastInteraction: '2025-03-09 10:15'
        },
        {
            companyName: 'TechSolutions',
            industrySector: 'Technology',
            engagementLevel: 'Low',
            email: 'support@techsolutions.com',
            phoneNumber: '555-123-4567',
            lastInteraction: '2025-03-08 09:00'
        }
    ];

    const dashboardTableBody = document.getElementById('dashboard-data');

    dashboardData.forEach((data) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.companyName}</td>
            <td>${data.industrySector}</td>
            <td>${data.engagementLevel}</td>
            <td>${data.email}</td>
            <td>${data.phoneNumber}</td>
            <td>${data.lastInteraction}</td>
        `;
        dashboardTableBody.appendChild(row);
    });

    // Handle logout interaction
    const logoutLink = document.getElementById('logout');
    logoutLink.addEventListener('click', () => {
        alert('Logout functionality is not implemented yet.');
    });
});