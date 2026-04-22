import http from 'http';
import { Server } from 'socket.io';
import app from './src/app.js';
import { initSocket } from './src/sockets/socketHandler.js'

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

initSocket(io);


const port = 3000;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})