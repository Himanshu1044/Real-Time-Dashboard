import { getAllEvents, createEvent } from '../models/eventModel.js'
import { io } from '../../server.js'

export const addEvent = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { eventType, eventData } = req.body

        const event = await createEvent(userId, eventType, eventData)

        // Real time broadcast
        io.emit('eventUpdate', event)
        res.status(201).json(event);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const fetchEvent = async (req, res) => {
    try {
        const events = await getAllEvents()
        res.status(200).json(events)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}