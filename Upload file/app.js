const express = require("express");
const cors =require( 'cors')
const multer= require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
const app = express()

app.use(express.json())
app.use(cors())


app.post('/api/file-upload', upload.single('file'), (req, res) => {
    try {
        res.status(200).json({ success: "file upload successful" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})
app.get('/api/file-download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    res.download(filePath, (err) => {
        if (err) {
            res.status(500).json({ error: "File not found or unable to download" });
        }
    });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(4000, () => console.log('RUNNING ON PORT 4000'))