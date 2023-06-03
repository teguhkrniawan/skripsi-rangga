require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const opdRoutes = require('./routes/opd');
const indikatorRoutes = require('./routes/indikator');
const autentikasiRoutes = require('./routes/autentikasi');
const dokumenRoutes = require('./routes/dokumen');
const laporanRoutes = require('./routes/laporan');

const middlewareLogRequest = require('./middleware/logs');
// const upload = require('./middleware/multer');

const app = express();

app.use(cors());
app.use(middlewareLogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'))

app.use('/users', usersRoutes);
app.use('/opd', opdRoutes);
app.use('/indikator', indikatorRoutes);
app.use('/autentikasi', autentikasiRoutes);
app.use('/dokumen', dokumenRoutes);
app.use('/laporan', laporanRoutes);

// app.post('/upload-dokumen',upload.single('dokumen'),(req, res) => {
//     const file = req.file
//     res.status(200).json({
//         file: file.filename
//     })
// })

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server berhasil di running di port ${PORT}`);
})