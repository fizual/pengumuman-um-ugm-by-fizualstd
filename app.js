const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // Ganti dengan port yang Anda inginkan

// Middleware untuk menyajikan file statis
app.use(express.static(path.join(__dirname, 'public')));

// Rute untuk menampilkan halaman index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan server pada port yang ditentukan
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
