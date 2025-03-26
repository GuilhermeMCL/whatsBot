import axios from "axios";


export async function getAIResponse(question: string): Promise<string> {
    /*   
       const trainedResponse = await prisma.messages.findFirst({
           where: { question },
       });
   
       
       if (trainedResponse) {
           console.log("🔍 Resposta encontrada no banco de dados.");
           return trainedResponse.answer;
       } */


    console.log("🔄 Consultando IA...");
    const response = await axios.post("http://82.25.66.11:11434/api/chat", {
        model: "llama3.2:1b",
        messages: [{ role: "user", content: question }],
        stream: false
    });





    console.log("Resposta da IA:", response.data);


    if (response.data && response.data.message && response.data.message.content && response.data.message.content.trim() !== '') {
        const aiResponse = response.data.message.content.trim();


        await trainBot(question, aiResponse);

        return aiResponse;
    }


    return "Desculpe, não consegui gerar uma resposta no momento.";
}

export async function trainBot(question: string, answer: string): Promise<void> {


}