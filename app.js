const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const groupRoutes = require('./src/routes/groupRoutes');

const app = express();
app.use(express.json());
app.use(authRoutes);
app.use(groupRoutes);

mongoose.connect('mongodb://127.0.0.1/secret-santa-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
