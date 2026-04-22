import db from '../config/db.js'

export const createEvent = async (userId, eventType, eventData) => {
    const result = await db.query(`INSERT INTO events (user_id, event_type, event_data) VALUES ($1,$2,$3) RETURNING *`, [userId, eventType, eventData]);

    return result.rows[0];
}

export const getAllEvents = async () => {
    const result = await db.query(`SELECT e.*, u.email 
         FROM events e
         JOIN users u ON e.user_id = u.id
         ORDER BY e.created_at DESC`);

    return result.rows;
}