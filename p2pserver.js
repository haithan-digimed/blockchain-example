const WebSocket = require('ws')

const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class P2PServer {
    constructor(blockchain) {
        this.blockchain = blockchain
        this.sockets = []
    }

    listen() {
        const server = new WebSocket.Server({
            port: P2P_PORT
        })
        server.on('connection', socket => {
            this.connectSocket(socket)
        })
        this.connectPeers()
        console.log('listening on p2p on : ', P2P_PORT)
    }

    connectPeers() {
        peers.forEach(peer => {
            const socket = new WebSocket(peer)
            socket.on('open', () => {
                this.connectSocket(socket)
                //2 update change
            })
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket)
        console.log('connected socket')
        this.messageHandler(socket)
        this.sendChain(socket)
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain))
    }

    messageHandler(socket) {
        socket.on('message', (message) => {
            console.log('message', message)
            const data  = JSON.parse(message)
            this.blockchain.replace(data)
        })
    }
}

module.exports = P2PServer