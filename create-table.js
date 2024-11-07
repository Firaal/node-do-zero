import sql from "./db.js";

(async function () {
    await sql`
    CREATE TABLE videos (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        duration INTEGER
    );
    `;
})();
