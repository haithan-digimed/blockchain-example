const Block = require('./block')
const BlockChain = require('./blockchain')

// const block = new Block('timestamp', 'lastHash', 'hash', 'data')
const bc = new BlockChain()
const newBlock = bc.mineBlockData('food')
console.log(newBlock)
