const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const config = require('config');

//Body-Parser Middleware
app.use(express.json());

//DB Config
const db = config.get('mongoURI');

//Connect to Mongo
mongoose
    .connect(db,  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Connected'))
    .catch(() => console.log(err));

app.use('/api/items', require('./routes/api/items'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if we are in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at ${port}`));