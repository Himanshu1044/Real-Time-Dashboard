import db from '../config/db.js'

export const createUser = async (email, hashedPassword) => {
    const result = await db.query(`INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *`, [email.trim().toLowerCase(), hashedPassword])
    return result.rows[0];
}


export const findUserByEmail = async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email.trim().toLowerCase()])
    return result.rows[0];
}