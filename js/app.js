const express = require('express')
const request = require('request')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000 

app.use(express.static(path.join(__dirname,'../public/script.js')))

const viewsPath = path.join(__dirname,'../templates/views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)

const newsApiUrl = `https://newsapi.org/v2/everything?q=keyword&apiKey=b08d425ab014431fb7805d1e5f25be5d`
request({url:newsApiUrl,json: true,
    headers:{
    'User-Agent': 'request'}},
    (error, response)=>{
    if (error){
        console.log(`${error} Found`)
    }
    app.get('/news', (req, res) => {
        res.render('index', {
            new: response.body.articles
        })
    })
})  

app.listen(port, ()=>{ 
    console.log(`Server Running Successfully`)})