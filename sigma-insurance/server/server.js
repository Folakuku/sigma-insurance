const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../public')); // Serve static files (HTML, CSS, JS)

// Get all applications with engagement details
app.get('/api/applications', (req, res) => {
    const query = `
        SELECT a.*, e.socialMediaPlatform, e.socialMediaInteractions, e.socialMediaLastInteraction, 
               e.emailsCount, e.emailsLastEmail, e.formLinksLink, e.formLinksClicks, e.formLinksLastClick
        FROM Applications a
        LEFT JOIN EngagementDetails e ON a.id = e.applicationId
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const applications = rows.map(row => ({
            id: row.id,
            firstName: row.firstName,
            lastName: row.lastName,
            companyName: row.companyName,
            insuranceType: row.insuranceType,
            coverageAmount: row.coverageAmount,
            industrySector: row.industrySector,
            engagementLevel: row.engagementLevel,
            status: row.status,
            applicationDate: row.applicationDate,
            engagementDetails: {
                socialMedia: {
                    platform: row.socialMediaPlatform,
                    interactions: row.socialMediaInteractions,
                    lastInteraction: row.socialMediaLastInteraction
                },
                emails: {
                    count: row.emailsCount,
                    lastEmail: row.emailsLastEmail
                },
                formLinks: {
                    link: row.formLinksLink,
                    clicks: row.formLinksClicks,
                    lastClick: row.formLinksLastClick
                }
            }
        }));
        res.json(applications);
    });
});

// Add new application (from buy-insurance form)
app.post('/api/applications', (req, res) => {
    const {
        firstName, lastName, companyName, insuranceType, coverageAmount, industrySector,
        engagementLevel, status, applicationDate
    } = req.body;
    const query = `
        INSERT INTO Applications (firstName, lastName, companyName, insuranceType, coverageAmount, industrySector, engagementLevel, status, applicationDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [firstName, lastName, companyName, insuranceType, coverageAmount, industrySector, engagementLevel, status, applicationDate], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const appId = this.lastID;
        const engagementQuery = `
            INSERT INTO EngagementDetails (applicationId, socialMediaPlatform, socialMediaInteractions, socialMediaLastInteraction, emailsCount, emailsLastEmail, formLinksLink, formLinksClicks, formLinksLastClick)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.run(engagementQuery, [appId, 'Unknown', 0, null, 0, null, 'https://sigma-insurance.com/forms/default', 0, null], (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: appId });
        });
    });
});

// Update engagement details (e.g., after sending emails)
app.put('/api/applications/:id/engagement', (req, res) => {
    const { id } = req.params;
    const { emailsCount, emailsLastEmail } = req.body;
    const query = `
        UPDATE EngagementDetails
        SET emailsCount = ?, emailsLastEmail = ?
        WHERE applicationId = ?
    `;
    db.run(query, [emailsCount, emailsLastEmail, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Engagement details updated' });
    });
});

// Delete application
app.delete('/api/applications/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Applications WHERE id = ?`;
    db.run(query, id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Application deleted' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});