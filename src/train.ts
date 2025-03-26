import fs from "fs";
import { trainBot } from "./ia";

async function trainFromFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        console.error("❌ Arquivo não encontrado!");
        process.exit(1);
    }

    const content = fs.readFileSync(filePath, "utf-8");
    let trainingData: { question: string; answer: string }[] = [];

    if (filePath.endsWith(".json")) {
        trainingData = JSON.parse(content);
    } else if (filePath.endsWith(".csv")) {
        trainingData = content
            .split("\n")
            .map((line) => line.split(","))
            .map(([question, answer]) => ({ question: question.trim(), answer: answer.trim() }));
    } else {
        console.error("❌ Formato de arquivo inválido. Use JSON ou CSV.");
        process.exit(1);
    }

    for (const entry of trainingData) {
        await trainBot(entry.question, entry.answer);
        console.log(`✅ Adicionado: ${entry.question} → ${entry.answer}`);
    }

    console.log("🎉 Treinamento concluído!");
}

const filePath = process.argv[2];
if (!filePath) {
    console.error("❌ Especifique um arquivo para treinamento!");
    process.exit(1);
}

trainFromFile(filePath);
