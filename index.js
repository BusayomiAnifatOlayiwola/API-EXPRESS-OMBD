//gives us access to variables in  our .env
require('dotenv').config()

//See variables using process.env
// console.log(process.env)
// console.log(process.env.API_KEY)

const express = require('express')
const app = express()
const axios = require('axios')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')


//middleware
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


//Routes
app.get('/', (req, res)=>{
    res.send('hello gold')
})


// app.get('/omdb', (req, res)=>{
//     const qs = {
//         params:{
//             s: 'stars wars',
//             apikey: process.env.API_KEY
//         }
//     }
//     //axios.get('http://www.omdbapi.com/?s=star+wars&apikey=OUR+key')
//     axios.get('http://www.omdbapi.com', qs)
//     .then((response)=>{
//         console.log(response.data)
        
//     })
// })

//Route for swapi api
//SWAPI api
// https://swapi.dev/api/
//localhost:8000/swapi/search
app.get('/swapi/search', (req, res)=>{
    res.render('search')
})

app.get('/swapi/show', (req, res)=>{
   console.log('made it here')
    console.log('query', req.query)
//    console.log('body', req.body)
//    console.log('param', req.params)
     axios.get(`https://swapi.dev/api/people/${req.query.personId}`)  //api - pass query through form search- return all info through show 

        .then((response)=>{
            console.log(response.data)
            //make  a person object
            const person={
                name: response.data.name,
                birth: response.data['birth_year'],
                home: response.data.homeworld
            }
            res.render('show', person)
        })
    })

//PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Listening on ${PORT}`))