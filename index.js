const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./dbConnection");
const path = require('path');
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
// Get client side data
app.use(express.json()); //req.body

if (process.env.NODE_ENV === "production") {
    // server static content
    app.use(express.static(path.join(__dirname, "client/build")));    
}

//ROUTES// (post, get, put , delete)
app.get("/location/:country/:state/:city", async(req,res) => {
    try {
        // get data from client side
        let { country, state, city } = req.params;
        country = country.toUpperCase();
        state = state.toUpperCase();
        city = city.toUpperCase();

        // no state selected
        if (state === "NONE") {
            state = "";
        }
        
        const location = await pool.query(
            `SELECT location_id 
             FROM locations 
             WHERE (country_abbreviation = $1 OR country_name = $1) 
                    AND (state_abbreviation = $2 OR state_name = $2) 
                    AND city = $3`, 
            [country, state, city]
        );
        
        if (location.rows === undefined || location.rows.length === 0) {
            res.json("Location not found. Try again.");
        } else {
            res.json(location.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
    }
});

// catch all method
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// port number
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})
