const express = require('express');
const router = express.Router();

router.get('/home', (req, res, next) => {
    let whose = ["Thanusha", "Divya", "Vimala", "John", "Doe", "Alice", "Bob"];
    const itemsPerPage = 3;
    const page = parseInt(req.query.page) || 1;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    const paginatedWhose = whose.slice(startIndex, endIndex);
    const totalPages = Math.ceil(whose.length / itemsPerPage);

    res.render('index', {
        whose: paginatedWhose,
        currentPage: page,
        totalPages: totalPages
    });
});

module.exports = router;
