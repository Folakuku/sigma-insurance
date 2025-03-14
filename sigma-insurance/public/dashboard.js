// Fetch applications from the backend
async function fetchApplications() {
    const response = await fetch('http://localhost:3000/api/applications');
    const data = await response.json();
    return data;
}

// Populate Overview Cards
async function updateOverviewCards() {
    const applications = await fetchApplications();
    document.getElementById("total-applications").textContent = applications.length;
    document.getElementById("pending-reviews").textContent = applications.filter(app => app.status === "Pending").length;
    document.getElementById("total-coverage").textContent = `$${applications.reduce((sum, app) => sum + app.coverageAmount, 0).toLocaleString()}`;
}
updateOverviewCards();

// Populate Table
const tbody = document.getElementById("dashboard-data");
const engagementContent = document.getElementById("engagement-content");

async function populateTable(filteredApps = null) {
    const applications = filteredApps || await fetchApplications();
    tbody.innerHTML = "";
    applications.forEach(app => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td data-label="Name">${app.firstName} ${app.lastName}</td>
            <td data-label="Company">${app.companyName}</td>
            <td data-label="Insurance Type">${app.insuranceType}</td>
            <td data-label="Coverage Amount">$${app.coverageAmount.toLocaleString()}</td>
            <td data-label="Industry Sector">${app.industrySector}</td>
            <td data-label="Engagement Level">${app.engagementLevel}</td>
            <td data-label="Status">${app.status}</td>
            <td data-label="Application Date">${app.applicationDate}</td>
            <td data-label="Actions">
                <div class="action-buttons">
                    <button class="view-btn">View</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn" onclick="deleteApplication(${app.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Initial table population
populateTable();

// Populate Engagement Details
async function populateEngagementDetails(filteredApps = null) {
    const applications = filteredApps || await fetchApplications();
    engagementContent.innerHTML = "";
    applications.forEach(app => {
        const div = document.createElement("div");
        div.className = "engagement-item";
        div.innerHTML = `
            <p><strong>Name:</strong> ${app.firstName} ${app.lastName} (${app.companyName})</p>
            <p><strong>Social Media:</strong> ${app.engagementDetails.socialMedia.platform} - ${app.engagementDetails.socialMedia.interactions} interactions (Last: ${app.engagementDetails.socialMedia.lastInteraction || "N/A"})</p>
            <p><strong>Emails:</strong> ${app.engagementDetails.emails.count} sent (Last: ${app.engagementDetails.emails.lastEmail || "N/A"})</p>
            <p><strong>Form Links:</strong> <a href="${app.engagementDetails.formLinks.link}" target="_blank">${app.engagementDetails.formLinks.link}</a> - ${app.engagementDetails.formLinks.clicks} clicks (Last: ${app.engagementDetails.formLinks.lastClick || "N/A"})</p>
        `;
        engagementContent.appendChild(div);
    });
}

// Toggle Engagement Details
const toggleEngagementBtn = document.getElementById("toggle-engagement");
const engagementSection = document.getElementById("engagement-details");
toggleEngagementBtn.addEventListener("click", () => {
    if (engagementSection.style.display === "none") {
        engagementSection.style.display = "block";
        toggleEngagementBtn.textContent = "Hide Engagement Details";
        populateEngagementDetails();
    } else {
        engagementSection.style.display = "none";
        toggleEngagementBtn.textContent = "Show Engagement Details";
    }
});

// Insurance Types Chart
async function updateCharts() {
    const applications = await fetchApplications();
    const insuranceTypesChart = new Chart(document.getElementById("insurance-types-chart"), {
        type: "pie",
        data: {
            labels: ["General Liability", "Workers' Compensation", "Property", "Professional Liability", "Cyber Insurance"],
            datasets: [{
                data: [
                    applications.filter(app => app.insuranceType === "General Liability").length,
                    applications.filter(app => app.insuranceType === "Workers' Compensation").length,
                    applications.filter(app => app.insuranceType === "Property").length,
                    applications.filter(app => app.insuranceType === "Professional Liability").length,
                    applications.filter(app => app.insuranceType === "Cyber Insurance").length,
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                },
            },
        },
    });

    const industrySectorChart = new Chart(document.getElementById("industry-sector-chart"), {
        type: "bar",
        data: {
            labels: ["Technology", "Healthcare", "Finance", "Manufacturing", "Retail"],
            datasets: [{
                label: "Applications",
                data: [
                    applications.filter(app => app.industrySector === "Technology").length,
                    applications.filter(app => app.industrySector === "Healthcare").length,
                    applications.filter(app => app.industrySector === "Finance").length,
                    applications.filter(app => app.industrySector === "Manufacturing").length,
                    applications.filter(app => app.industrySector === "Retail").length,
                ],
                backgroundColor: "#36A2EB",
            }],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}
updateCharts();

// Search and Filter Functionality
document.getElementById("search-input").addEventListener("input", filterTable);
document.getElementById("filter-status").addEventListener("change", filterTable);
document.getElementById("filter-engagement").addEventListener("change", filterTable);

async function filterTable() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const statusFilter = document.getElementById("filter-status").value;
    const engagementFilter = document.getElementById("filter-engagement").value;

    const applications = await fetchApplications();
    const filteredApps = applications.filter(app => {
        const matchesSearch = `${app.firstName} ${app.lastName} ${app.companyName}`.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter;
        const matchesEngagement = engagementFilter === "all" || app.engagementLevel.toLowerCase() === engagementFilter;
        return matchesSearch && matchesStatus && matchesEngagement;
    });

    populateTable(filteredApps);
    if (engagementSection.style.display !== "none") {
        populateEngagementDetails(filteredApps);
    }
}

// File Upload Functionality
const uploadForm = document.getElementById("upload-form");
const uploadMessage = document.getElementById("upload-message");

uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("company-data-file");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = async function(event) {
            const text = event.target.result;
            const rows = text.split("\n").map(row => row.split(","));

            // Validate headers
            const expectedHeaders = ["firstName", "lastName", "companyName", "insuranceType", "coverageAmount", "industrySector", "engagementLevel", "status", "applicationDate"];
            const headers = rows[0].map(header => header.trim());
            if (!expectedHeaders.every((header, index) => header === headers[index])) {
                uploadMessage.textContent = "Invalid CSV format. Please use the correct headers.";
                uploadMessage.style.color = "#e74c3c";
                return;
            }

            // Parse and validate data rows
            const newApplications = rows.slice(1).map(row => {
                if (row.length < expectedHeaders.length) return null;
                const coverageAmount = parseInt(row[4].trim());
                const applicationDate = row[8].trim();
                const engagementLevel = row[6].trim().toLowerCase();
                if (isNaN(coverageAmount) || !/^\d{4}-\d{2}-\d{2}$/.test(applicationDate) || !["high", "medium", "low"].includes(engagementLevel)) {
                    return null;
                }
                return {
                    firstName: row[0].trim(),
                    lastName: row[1].trim(),
                    companyName: row[2].trim(),
                    insuranceType: row[3].trim(),
                    coverageAmount,
                    industrySector: row[5].trim(),
                    engagementLevel,
                    status: row[7].trim(),
                    applicationDate
                };
            }).filter(app => app !== null);

            if (newApplications.length === 0) {
                uploadMessage.textContent = "No valid data found in the CSV file.";
                uploadMessage.style.color = "#e74c3c";
                return;
            }

            // Send new applications to the backend
            let uploadedCount = 0;
            for (const app of newApplications) {
                const response = await fetch('http://localhost:3000/api/applications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...app, status: app.status || 'Pending' })
                });
                if (response.ok) uploadedCount++;
            }

            updateOverviewCards();
            populateTable();
            updateCharts();
            uploadMessage.textContent = `Successfully uploaded ${uploadedCount} new companies!`;
            uploadMessage.style.color = "#2ecc71";
            fileInput.value = "";
        };
        reader.onerror = function() {
            uploadMessage.textContent = "Error reading file. Please try again.";
            uploadMessage.style.color = "#e74c3c";
        };
        reader.readAsText(file);
    } else {
        uploadMessage.textContent = "Please select a file to upload.";
        uploadMessage.style.color = "#e74c3c";
    }
});

// Auto-Generated Emails Functionality
const emailMessage = document.getElementById("email-message");

async function sendEmails(engagementLevel) {
    const applications = await fetchApplications();
    const clients = applications.filter(app => app.engagementLevel === engagementLevel);
    if (clients.length === 0) {
        emailMessage.textContent = `No clients found with ${engagementLevel} engagement.`;
        emailMessage.style.color = "#e74c3c";
        return;
    }

    for (const client of clients) {
        const emailContent = generateEmailContent(client, engagementLevel);
        console.log(`Sending email to ${client.firstName} ${client.lastName} (${client.companyName}):`, emailContent);
        const updatedEngagement = {
            emailsCount: client.engagementDetails.emails.count + 1,
            emailsLastEmail: new Date().toISOString().split("T")[0]
        };
        await fetch(`http://localhost:3000/api/applications/${client.id}/engagement`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEngagement)
        });
    }

    emailMessage.textContent = `Emails sent to ${clients.length} clients with ${engagementLevel} engagement!`;
    emailMessage.style.color = "#2ecc71";
    populateEngagementDetails();
}

function generateEmailContent(client, engagementLevel) {
    let subject, body;
    switch (engagementLevel) {
        case "high":
            subject = "Exclusive Offer for Our Valued Client!";
            body = `Dear ${client.firstName},\n\nWe appreciate your active engagement with Sigma Insurance! As a valued client, we're offering you an exclusive discount on our premium insurance plans. Contact us today to learn more!\n\nBest regards,\nSigma Insurance Team`;
            break;
        case "medium":
            subject = "Explore More with Sigma Insurance";
            body = `Dear ${client.firstName},\n\nWe've noticed your interest in our services! Let's take the next step together. Schedule a consultation with us to explore insurance options tailored for ${client.companyName}.\n\nBest regards,\nSigma Insurance Team`;
            break;
        case "low":
            subject = "Let's Reconnect with Sigma Insurance";
            body = `Dear ${client.firstName},\n\nIt's been a while! We'd love to reconnect and discuss how Sigma Insurance can support ${client.companyName}. Reply to this email to get started.\n\nBest regards,\nSigma Insurance Team`;
            break;
        default:
            return "";
    }
    return { subject, body };
}

document.getElementById("email-high-engagement").addEventListener("click", () => sendEmails("high"));
document.getElementById("email-medium-engagement").addEventListener("click", () => sendEmails("medium"));
document.getElementById("email-low-engagement").addEventListener("click", () => sendEmails("low"));

// Delete Application
async function deleteApplication(id) {
    if (confirm("Are you sure you want to delete this application?")) {
        await fetch(`http://localhost:3000/api/applications/${id}`, { method: 'DELETE' });
        updateOverviewCards();
        populateTable();
        updateCharts();
    }
}

// Download CSV Template Functionality
document.getElementById("download-template").addEventListener("click", () => {
    const templateCsv = `firstName,lastName,companyName,insuranceType,coverageAmount,industrySector,engagementLevel,status,applicationDate
John,Doe,Doe Enterprises,General Liability,500000,Technology,high,Pending,2025-01-15
Jane,Smith,Smith Healthcare,Workers' Compensation,750000,Healthcare,medium,Approved,2025-01-10
Alice,Johnson,Johnson Tech,Cyber Insurance,300000,Technology,low,Pending,2025-01-05
Bob,Williams,Williams Retail,Property,600000,Retail,high,Approved,2025-01-20
Emma,Brown,Brown Finance,Professional Liability,400000,Finance,medium,Rejected,2025-01-18`;

    const blob = new Blob([templateCsv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company-data-template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

// Download Current Data Functionality
document.getElementById("download-data").addEventListener("click", async () => {
    const applications = await fetchApplications();
    const headers = ["firstName", "lastName", "companyName", "insuranceType", "coverageAmount", "industrySector", "engagementLevel", "status", "applicationDate"];
    const csvRows = [headers.join(",")];

    applications.forEach(app => {
        const row = [
            app.firstName,
            app.lastName,
            app.companyName,
            app.insuranceType,
            app.coverageAmount,
            app.industrySector,
            app.engagementLevel,
            app.status,
            app.applicationDate
        ].map(value => `"${value}"`);
        csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "current-dashboard-data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});