const express = require('express');
const cors = require('cors');

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/search',require('./backend/routes/searchRoutes'))
app.use('/download',require('./backend/routes/download'))

app.listen(4000,()=>console.log(`Server is listening at port 4000`))

