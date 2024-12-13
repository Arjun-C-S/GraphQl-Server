import { type Server } from 'http';

import { Server as SocketIOServer } from 'socket.io';

import { resolvers } from '@/graphql/resolvers/index.js';

// Define event constants
export const SocketEvents = {
    CONNECTION: 'connection',
    JOIN_ROOM: 'joinRoom',
    CREATE_MOVIE: 'create_movie',
    LEAVE_ROOM: 'leaveRoom',
    DISCONNECT: 'disconnect',
} as const;

let io: SocketIOServer | null = null;

const socketConnecter = (httpServer: Server) => {
    io = new SocketIOServer(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] } });

    // Socket.IO connection handler
    io.on(SocketEvents.CONNECTION, (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on(SocketEvents.JOIN_ROOM, (room) => {
            console.log(`Client ${socket.id} joined room: ${room}`);
            socket.join(room);
        });

        socket.on(SocketEvents.CREATE_MOVIE, async (movieDetails) => {
            return await resolvers.Mutation.createMovie(null, { movie: movieDetails });
        });

        socket.on(SocketEvents.LEAVE_ROOM, (room) => {
            console.log(`Client ${socket.id} left room: ${room}`);
            socket.leave(room);
        });

        socket.on(SocketEvents.DISCONNECT, () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

const getSocket = (): SocketIOServer => {
    if (!io) {
        throw new Error('Socket.io not initialized!!!');
    }

    return io;
};

export { socketConnecter, getSocket };
