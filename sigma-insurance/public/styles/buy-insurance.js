// filepath: c:\Users\Ugorumeyh\Desktop\si_bot\sigma-insurance\public\buy-insurance.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('buy-insurance-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Insurance purchase submitted successfully!');
        form.reset();
    });

    // Handle logout interaction
    const logoutLink = document.getElementById('logout');
    logoutLink.addEventListener('click', () => {
        alert('Logout functionality is not implemented yet.');
    });
});