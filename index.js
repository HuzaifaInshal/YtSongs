const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/search',require('./backend/routes/searchRoutes'))



app.listen(4000,()=>console.log(`Server is listening at port 4000`))