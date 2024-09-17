const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());
const users = [];
app.get('/users', (req, res) => {
    try {
        res.status(200).json({ users });
        console.log(users.length);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const name = req.body.Name;
        const pwd = req.body.password;

        if (!name || !pwd) {
            return res.status(400).json({ message: "Name and password are required" });
        }

        const hashedpwd = await bcrypt.hash(pwd, 10);
        const user = { 'Name': name, 'password': hashedpwd };
        users.push(user);
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    const user = users.find(user => user.Name === req.body.Name);
    
    if (!user) {
        return res.status(404).json({ message: "User with this name is not present" });
    }

    try {
        const pwd = req.body.password;
        if (await bcrypt.compare(pwd, user.password)) {
            res.status(200).json({ message: "Yahoo! User has logged in" });
        } else {
            res.status(400).json({ message: "Incorrect password" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
