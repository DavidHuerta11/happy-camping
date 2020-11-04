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
app.get("/location/:country/:state", async(req,res) => {
    try {
        // get data from client side
        let { country, state } = req.params;
        country = country.toUpperCase();
        state = state.toUpperCase();

        // no state selected
        if (state === "NONE") {
            state = "";
        }
        
        const state_code = await pool.query(
            `SELECT state_code
             FROM states 
             WHERE state_code = $1 OR state_name = $1`, 
            [state]
        );

        const country_code = await pool.query(
            `SELECT country_code
             FROM countries 
             WHERE country_code = $1 OR country_name = $1`, 
            [country]
        );
        
        // handle sql response
        if (country_code.rows.length === 0) {
            res.json("That country is not available. Try again.");
        } else if (country_code.rows[0].country_code === 'US' &&  state_code.rows.length === 0) {
            res.json("That state is not available. Try again.");
        } else {
            // combine objects
            const result = {...country_code.rows[0], ...state_code.rows[0]};
            res.json(result);
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
