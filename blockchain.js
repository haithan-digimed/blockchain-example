const Block = require("./block");

class BlockChain {
    constructor() {
        this.chain = [Block.genesisBlock()]
    }

    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1]
        const block = new Block(Date.now(), lastBlock.hash, data)
        this.chain.push(block)
        return block
    }

    mineBlockData(data) {
        const lastBlock = this.chain[this.chain.length - 1]
        const block = Block.mineBlock(lastBlock, data)
        this.chain.push(block)
        return block
    }

    toString() {
        return `Blockchain
            ${this.chain.map(t => t.toString()).join('\r\n')}
        `
    }

    isValid(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisBlock())) {
            return false
        }
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i]
            const lastblock = chain[i - 1]
            if (lastblock.hash !== block.lastHash) {
                return false
            }
        }
        return true
    }

    replace(newChain) {
        console.log('newChain', newChain.length)
        console.log('this.chain', this.chain.length)
        if (newChain.length <= this.chain.length) {
            console.log('new chain must be longer than current chain')
            return
        }
        if (!this.isValid(newChain)) {
            console.log('new chain is invalid')
            return
        }
        console.log('replace new chain')
        this.chain = newChain

    }
}
module.exports = BlockChain;