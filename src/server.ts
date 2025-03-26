import Fastify from "fastify";
import { startBot } from "./bot";


const fastify = Fastify({ logger: true });
startBot();

fastify.get("/", async (request, reply) => {
    return { message: "Chatbot WhatsApp rodando 🚀" };
});

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});
