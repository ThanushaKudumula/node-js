const express =require('express');
const multer = require('multer');
const cors =require('cors')


const app =express();
app.use(cors())

const ds=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
});
const upload =multer({
    storage:ds
});

app.listen(3000,()=>{
    console.log('server running at port no 3000')
})


app.post('/upload', upload.single('file'),
    (req,res)=>{
        res.send("uploaded succesfully")
    }
)