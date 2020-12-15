const express = require('express')
const bodyParser = require('body-parser')
const BlockChain = require('./blockchain')
const HTTP_POST = process.env.HTTP_POST || 3000

const app = express()
app.use(bodyParser.json())

const bc = new BlockChain()
app.get('/blocks', (req, res) => {
    res.json(bc.chain)
})

app.post('/mine', (req, res) => {
    const data = req.body.data
    bc.mineBlockData(data)
    res.json(bc.chain)
})
app.listen(HTTP_POST, () => {
    console.log('hello')
})