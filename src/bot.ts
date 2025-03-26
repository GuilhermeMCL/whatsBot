import { create, Whatsapp } from "venom-bot";
import { getAIResponse } from './ia';

export async function startBot() {
    create({
        session: "chatbot",
        headless: "new",
        logQR: true,

    })
        .then((client: Whatsapp) => listenMessages(client))
        .catch((error) => console.error("Erro ao iniciar o bot:", error));
}
function listenMessages(client: Whatsapp) {
    console.log("✅ Bot conectado ao WhatsApp!");
    client.onMessage(async (message) => {
        if (message.isGroupMsg) return;

        console.log(`📩 Mensagem de ${message.sender.pushname}: ${message.body}`);

        const response = await getAIResponse(message.body);
        await client.sendText(message.from, response);
    });
}
