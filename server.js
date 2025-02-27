import fastify from "fastify";
import { DatabasePostgres } from "./database-postgres.js";
import fastifyCors from "@fastify/cors";

const server = fastify();
const database = new DatabasePostgres();

server.register(fastifyCors, {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
});

server.post("/videos", (request, reply) => {
    const { title, description, duration } = request.body;

    database.create({
        title: title,
        description: description,
        duration: duration,
    });

    return reply.status(201).send;
});

server.get("/videos", (request) => {
    const search = request.query.search;

    const videos = database.list(search);

    return videos;
});

server.put("/videos/:id", (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;

    database.update(videoId, {
        title: title,
        description: description,
        duration: duration,
    });

    return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
    const id = request.params.id;

    database.delete(id);

    return reply.status(204).send();
});

try {
    server.listen({
        host: "0.0.0.0",
        port: process.env.PORT || 3333,
    });
    console.log("Server running!");
} catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
}
