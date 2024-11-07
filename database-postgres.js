import { randomUUID } from "node:crypto";
import sql from "./db.js";

export class DatabasePostgres {
    async list(search) {
        if (search) {
            return await sql`
                SELECT *
                FROM videos
                WHERE ilike "%${search}%"
            `;
        } else {
            return await sql`
                SELECT *
                FROM videos    
            `;
        }
    }

    async create(video) {
        const videoId = randomUUID();

        const { title, description, duration } = video;

        await sql`
            INSERT INTO videos (id, title, description, duration) 
            VALUES (${videoId}, ${title}, ${description}, ${duration})
        `;
    }

    async update(videoId, video) {
        const { title, description, duration } = video;

        await sql`
            UPDATE videos
            SET title = ${title}, description = ${description}, duration = ${duration}
            WHERE id = ${videoId}
        `;
    }

    async delete(videoId) {
        await sql`
            DELETE FROM videos
            WHERE id = ${videoId}
        `;
    }
}
