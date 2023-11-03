const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // <-- Add this

const app = express();
const PORT = process.env.PORT || 3002;


const API_KEY = 'Ek8zOvr4GbmeYX5mIVVuxEIcd9Xphhcm_KujQv_yiZsvB9ZcjSJ-XRlKqw0v0YHXuaUFZN25M7mvuSt6NHS644Af9cBrhSiAF5BtncZPZTvOvoXQCuogcMmU2DFEZXYx';
const YELP_ENDPOINT = 'https://api.yelp.com/v3/businesses/search';

app.use(cors());

// Serve static files from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', async (req, res) => {
    const { term, location } = req.query;

    try {
        const response = await axios.get(YELP_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
            params: {
                term,
                location,
                limit: 20
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching from Yelp API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

