// Cree ou met a jour un compte administrateur defini dans back_end/.env.
// Usage : node seed_admin.js
require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("./db");

const USERNAME = process.env.ADMIN_USERNAME;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!USERNAME || !PASSWORD) {
    console.error("Definir ADMIN_USERNAME et ADMIN_PASSWORD dans back_end/.env avant l'execution.");
    process.exit(1);
}

async function seed() {
    const hash = await bcrypt.hash(PASSWORD, 10);

    const sql = `
        INSERT INTO users (username, password_hash, role)
        VALUES (?, ?, 'admin')
        ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)
    `;

    db.query(sql, [USERNAME, hash], (err) => {
        if (err) {
            console.error("Erreur lors de la creation du compte administrateur.");
            console.error(err);
            process.exit(1);
        }
        console.log(`Compte administrateur configure : ${USERNAME}`);
        process.exit(0);
    });
}
seed();
