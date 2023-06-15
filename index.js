const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/search',require('./backend/routes/searchRoutes'))
app.use('/download',require('./backend/routes/download'))

app.use(express.static(path.join(__dirname,'../ytmusic/frontend/build/')))
app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))


app.listen(4000,()=>console.log(`Server is listening at port 4000`))

