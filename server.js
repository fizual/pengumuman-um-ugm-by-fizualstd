const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Konfigurasi koneksi ke database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Ganti dengan password MySQL kamu
    database: 'pengumuman_um'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint untuk menerima data hasil seleksi
app.post('/pengumuman/hasil', (req, res) => {
    const { no_peserta, tgl_lahir } = req.body;

    const query = `
        SELECT m.no_peserta, m.nama, m.tgl_lahir, m.prodi, m.diterima, m.qr
        FROM mahasiswa m
        JOIN hasil_seleksi h ON m.no_peserta = h.no_peserta
        WHERE m.no_peserta = ? AND m.tgl_lahir = ?;
    `;

    db.query(query, [no_peserta, tgl_lahir], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Database error');
            return;
        }

        if (results.length > 0) {
            const data = results[0];
            res.json(data);
        } else {
            res.json({ data: 'not found' });
        }
    });
});

// Mulai server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
