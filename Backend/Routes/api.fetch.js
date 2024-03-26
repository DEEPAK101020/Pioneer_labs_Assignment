const express = require("express");
const axios = require("axios");

const FetchRoute = express.Router();
FetchRoute.get('/', async (req, res) => {
    let { category, limit, page } = req.query;

    try {
        const response = await axios.get("https://api.publicapis.org/entries"); 
        //entries 
        let entries = response.data.entries;

        //filtering by category
        if (category) {
            entries = entries.filter((entry) => entry.Category.toLowerCase() === category.toLowerCase());
        }

        //pagination
        if (page && limit) {
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + parseInt(limit);
            entries = entries.slice(startIndex, endIndex);
        }
        
        res.json(entries);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = {
    FetchRoute
}
