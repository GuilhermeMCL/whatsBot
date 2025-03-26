import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function saveTrainingData(question: string, answer: string): Promise<void> {
    await prisma.response.upsert({
        where: { question },
        update: { answer },
        create: { question, answer },
    });
}

export async function getTrainedResponse(question: string): Promise<string | null> {
    const res = await prisma.response.findUnique({
        where: { question },
    });
    return res?.answer || null;
}
