import jwt from 'jsonwebtoken';
import { createEvent } from '../models/eventModel.js';

const onlineUsers = new Map();

export const initSocket = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // STEP 1: authenticate user
        socket.on("authenticate", (token) => {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                socket.userId = decoded.userId;

                onlineUsers.set(socket.id, socket.userId);

                console.log("Authenticated user:", socket.userId);

                io.emit("onlineUsers", Array.from(onlineUsers.values()));

            } catch (err) {
                console.log("Invalid token");
                socket.disconnect();
            }
        });

        // STEP 2: receive event
        socket.on("newEvent", async (data) => {
            try {
                if (!socket.userId) {
                    console.log("User not authenticated");
                    return;
                }

                console.log("Event received:", data);

                const event = await createEvent(
                    socket.userId,
                    data.eventType,
                    data.eventData
                );

                io.emit("eventUpdate", event);

            } catch (err) {
                console.error(err);
            }
        });

        // STEP 3: disconnect
        socket.on("disconnect", () => {
            onlineUsers.delete(socket.id);

            io.emit("onlineUsers", Array.from(onlineUsers.values()));

            console.log("User disconnected:", socket.id);
        });
    });
};