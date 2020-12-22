const express = require('express')
const bodyParser = require('body-parser')
const BlockChain = require('./blockchain')
const P2pServer = require('./p2pserver')
const HTTP_PORT = process.env.HTTP_PORT || 3001

const app = express()
app.use(bodyParser.json())

const bc = new BlockChain()
const p2p = new P2pServer(bc)
app.get('/blocks', (req, res) => {
    res.json(bc.chain)
})

app.post('/mine', (req, res) => {
    const data = req.body.data
    bc.mineBlockData(data)
    res.json(bc.chain)
})
app.listen(HTTP_PORT, () => {
    console.log('hello')
})

p2p.listen()