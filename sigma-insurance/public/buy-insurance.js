document.getElementById("buy-insurance-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        companyName: formData.get("company-name"),
        insuranceType: formData.get("insurance-type"),
        coverageAmount: parseInt(formData.get("coverage-amount")),
        industrySector: formData.get("industry-sector"),
        engagementLevel: formData.get("industry-sector") === "Technology" ? "high" : "medium", // Example logic
        status: "Pending",
        applicationDate: formData.get("start-date")
    };

    const response = await fetch('http://localhost:3000/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Application submitted successfully!");
        e.target.reset();
    } else {
        alert("Error submitting application.");
    }
});
document.getElementById('buy_insurance_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Optional: prevents default submission (e.g., page reload)
    // Add your form submission logic here (e.g., AJAX call to server)
    // On success:
    displayThankYouMessage();
});

function displayThankYouMessage() {
    document.getElementById('thank-you-message').style.display = 'block';
}
