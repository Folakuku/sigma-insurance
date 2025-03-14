const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server/db.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create tables and insert sample data
db.serialize(() => {
    // Create Applications table
    db.run(`
        CREATE TABLE IF NOT EXISTS Applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            companyName TEXT NOT NULL,
            insuranceType TEXT NOT NULL,
            coverageAmount INTEGER NOT NULL,
            industrySector TEXT NOT NULL,
            engagementLevel TEXT NOT NULL CHECK(engagementLevel IN ('high', 'medium', 'low')),
            status TEXT NOT NULL CHECK(status IN ('Pending', 'Approved', 'Rejected')),
            applicationDate TEXT NOT NULL,
            createdAt TEXT DEFAULT (datetime('now'))
        )
    `);

    // Create EngagementDetails table
    db.run(`
        CREATE TABLE IF NOT EXISTS EngagementDetails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            applicationId INTEGER NOT NULL,
            socialMediaPlatform TEXT DEFAULT 'Unknown',
            socialMediaInteractions INTEGER DEFAULT 0,
            socialMediaLastInteraction TEXT,
            emailsCount INTEGER DEFAULT 0,
            emailsLastEmail TEXT,
            formLinksLink TEXT DEFAULT 'https://sigma-insurance.com/forms/default',
            formLinksClicks INTEGER DEFAULT 0,
            formLinksLastClick TEXT,
            FOREIGN KEY (applicationId) REFERENCES Applications(id) ON DELETE CASCADE
        )
    `);

    // Insert sample data (20 entries)
    const sampleApplications = [
        ['John', 'Doe', 'Doe Enterprises', 'General Liability', 500000, 'Technology', 'high', 'Pending', '2025-01-15'],
        ['Jane', 'Smith', 'Smith Healthcare', 'Workers\' Compensation', 750000, 'Healthcare', 'medium', 'Approved', '2025-01-10'],
        ['Alice', 'Johnson', 'Johnson Tech', 'Cyber Insurance', 300000, 'Technology', 'low', 'Pending', '2025-01-05'],
        ['Bob', 'Williams', 'Williams Retail', 'Property', 600000, 'Retail', 'high', 'Approved', '2025-01-20'],
        ['Emma', 'Brown', 'Brown Finance', 'Professional Liability', 400000, 'Finance', 'medium', 'Rejected', '2025-01-18'],
        ['Michael', 'Davis', 'Davis Tech', 'General Liability', 550000, 'Technology', 'low', 'Pending', '2025-01-16'],
        ['Sarah', 'Miller', 'Miller Manu', 'Property', 800000, 'Manufacturing', 'high', 'Approved', '2025-01-12'],
        ['David', 'Wilson', 'Wilson Health', 'Workers\' Compensation', 650000, 'Healthcare', 'medium', 'Pending', '2025-01-08'],
        ['Emily', 'Moore', 'Moore Retail', 'Cyber Insurance', 350000, 'Retail', 'low', 'Rejected', '2025-01-06'],
        ['James', 'Taylor', 'Taylor Finance', 'Professional Liability', 450000, 'Finance', 'high', 'Approved', '2025-01-14'],
        ['Linda', 'Anderson', 'Anderson Tech', 'General Liability', 700000, 'Technology', 'medium', 'Pending', '2025-01-11'],
        ['Robert', 'Thomas', 'Thomas Manu', 'Property', 900000, 'Manufacturing', 'low', 'Approved', '2025-01-09'],
        ['Patricia', 'Jackson', 'Jackson Health', 'Workers\' Compensation', 500000, 'Healthcare', 'high', 'Rejected', '2025-01-07'],
        ['Charles', 'White', 'White Retail', 'Cyber Insurance', 400000, 'Retail', 'medium', 'Pending', '2025-01-13'],
        ['Jennifer', 'Harris', 'Harris Finance', 'Professional Liability', 600000, 'Finance', 'low', 'Approved', '2025-01-17'],
        ['Mark', 'Lewis', 'Lewis Tech', 'General Liability', 800000, 'Technology', 'high', 'Pending', '2025-01-19'],
        ['Lisa', 'Walker', 'Walker Manu', 'Property', 550000, 'Manufacturing', 'medium', 'Rejected', '2025-01-04'],
        ['Steven', 'Hall', 'Hall Health', 'Workers\' Compensation', 700000, 'Healthcare', 'low', 'Approved', '2025-01-02'],
        ['Nancy', 'Allen', 'Allen Retail', 'Cyber Insurance', 450000, 'Retail', 'high', 'Pending', '2025-01-01'],
        ['Kevin', 'Young', 'Young Finance', 'Professional Liability', 650000, 'Finance', 'medium', 'Approved', '2025-01-03']
    ];

    const stmt = db.prepare(`
        INSERT INTO Applications (firstName, lastName, companyName, insuranceType, coverageAmount, industrySector, engagementLevel, status, applicationDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const engagementStmt = db.prepare(`
        INSERT INTO EngagementDetails (applicationId, socialMediaPlatform, socialMediaInteractions, socialMediaLastInteraction, emailsCount, emailsLastEmail, formLinksLink, formLinksClicks, formLinksLastClick)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Initialize counter for pending insertions
    let pendingInsertions = sampleApplications.length;

    sampleApplications.forEach(app => {
        stmt.run(app, function(err) {
            if (err) {
                console.error('Error inserting application:', err);
                pendingInsertions--;
                if (pendingInsertions === 0) {
                    stmt.finalize();
                    engagementStmt.finalize();
                }
            } else {
                const appId = this.lastID;
                const engagementData = {
                    socialMediaPlatform: 'Unknown',
                    socialMediaInteractions: 0,
                    socialMediaLastInteraction: null,
                    emailsCount: 0,
                    emailsLastEmail: null,
                    formLinksLink: 'https://sigma-insurance.com/forms/default',
                    formLinksClicks: 0,
                    formLinksLastClick: null
                };
                engagementStmt.run([
                    appId,
                    engagementData.socialMediaPlatform,
                    engagementData.socialMediaInteractions,
                    engagementData.socialMediaLastInteraction,
                    engagementData.emailsCount,
                    engagementData.emailsLastEmail,
                    engagementData.formLinksLink,
                    engagementData.formLinksClicks,
                    engagementData.formLinksLastClick
                ], function(err) {
                    if (err) {
                        console.error('Error inserting engagement details:', err);
                    }
                    pendingInsertions--;
                    if (pendingInsertions === 0) {
                        stmt.finalize();
                        engagementStmt.finalize();
                    }
                });
            }
        });
    });
});

module.exports = db;