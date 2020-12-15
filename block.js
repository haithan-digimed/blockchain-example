const SHA256 = require('crypto-js/sha256');
const BLOCKTIME = 10000
class Block {
    constructor(timestamp, lastHash, hash, data, nonce, dificulty) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.nonce = nonce
        this.dificulty = dificulty
        this.hash = hash
        this.data = data
    }

    static genesisBlock() {
        return new Block('genesis-time', '', '', '', 0, 1)
    }

    toString() {
        return `Block --
        timestamp   : ${this.timestamp}
        lastHash    : ${this.lastHash}
        hash        : ${this.hash}
        data        : ${this.data}`
    }

    static mineBlock(lastBlack, data) {
        let timestamp = Date.now()
        let nonce = 0
        let hash
        let dificulty = lastBlack.dificulty
        do {
            timestamp = Date.now()
            nonce++
            dificulty = Block.adjustDificulty(lastBlack, timestamp)
            hash = SHA256(`${timestamp}${lastBlack.hash}${data}${nonce}${dificulty}`).toString()
        }
        while (hash.substring(0, dificulty) !== '0'.repeat(dificulty))
        return new this(timestamp, lastBlack.hash, hash, data, nonce, dificulty)
    }

    static adjustDificulty(lastBlock, timestamp) {
        return (lastBlock.timestamp + BLOCKTIME) > timestamp ? (lastBlock.dificulty + 1) : (lastBlock.dificulty - 1)
    }
}
module.exports = Block;