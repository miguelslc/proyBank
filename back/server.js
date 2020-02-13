const express = require('express');
const userRouter = require('./server/routes/user');
const port = process.env.PORT;

require('./server/config/connection');

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})