const express=require('express');
const router=express.Router();
const db=require('./../db');

router.post('/createdb', async (req, res) => {
    try {
        const result = await db.query('CREATE DATABASE IF NOT EXISTS mydatabase');
        res.json('created successfully');
    } catch (err) {
        res.json(err.message);
    }
});
router.post('/table', async (req, res)=>{
    try{
        const tablecreation=`CREATE TABLE IF NOT EXISTS mydatabase.employees(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(15) NOT NULL,phoneno VARCHAR(10) NOT NULL)`;
        const result=await db.query(tablecreation);
        res.json('table has created');
    }
    catch (err) {
        res.json(err.message);
    }
})
router.post('/insert', async (req, res)=>{
    try{
        const naam=req.body.name, pno=req.body.phoneno;
        const tablecreation=await db.query(`INSERT INTO mydatabase.employees(name, phoneno) VALUES (?,?)`, [naam, pno]);
        res.status(201).json('successfully inserted');
    }
    catch (err) {
        res.json(err.message);
    }
})
router.post('/insert', async (req, res)=>{
    try{
        const naam=req.body.name, pno=req.body.phoneno;
        const tablecreation=await db.query(`INSERT INTO mydatabase.employees(name, phoneno) VALUES (?,?)`, [naam, pno]);
        res.status(201).json('successfully inserted');
    }
    catch (err) {
        res.json(err.message);
    }
})
router.get('/selectbyname', async (req, res) => {
    try {
        const { name } = req.query; 
        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }
        const [results] = await db.query('SELECT name, phoneno FROM mydatabase.employees WHERE name = ?', [name]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}); 
router.patch('/update', async (req, res) => {
    try {
        const {name}= req.query;
        const pno=req.body.phoneno;
        const result=await db.query('UPDATE mydatabase.employees SET phoneno=? WHERE name=?', [pno, name]);
        res.json(result);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
})
router.get('/select', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM mydatabase.employees');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}); 
router.delete('/deletebyname', async (req, res) => {
    try {
        const { name } = req.query; 
        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }
        const [results] = await db.query('DELETE FROM mydatabase.employees WHERE name = ?', [name]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}); 

module.exports=router;