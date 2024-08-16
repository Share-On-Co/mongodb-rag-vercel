import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { vectorStore } from '@/utils/openai';
import { NextResponse } from 'next/server';
import storeQuery from '@/utils/storeQuery';
  import { HumanMessage } from "@langchain/core/messages";
  import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
  import { createRetrievalChain } from "langchain/chains/retrieval";
  
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
  } from "@langchain/core/prompts";
  import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { EnsembleRetriever } from "langchain/retrievers/ensemble";


export async function POST(req: Request) {
    try {
        
        const { stream, handlers } = LangChainStream();
        const body = await req.json();
        const userMessages: Message[] = body.messages ?? [];
        const question = userMessages[userMessages.length - 1].content;

        storeQuery(question);

        const messages: Message[] = [ ...userMessages];

        const llm = new ChatOpenAI({
            model: "gpt-4o",
            temperature: 0.8,
            streaming: true,
            callbacks: [handlers],
        });

        const retriever1 = vectorStore("training_data", "vector_index").asRetriever({ 
            searchType: "mmr", 
            searchKwargs: { fetchK: 10, lambda: 0.25 } 
        });

        const retriever2 = vectorStore("reddit", "reddit_index").asRetriever({
            searchType: "mmr",
            searchKwargs: { fetchK: 10, lambda: 0.25 },
        });

        const retriever = new EnsembleRetriever({
            retrievers: [retriever1, retriever2],
            weights: [0.75, 0.25],
          });

          // Contextualize question
        const contextualizeQSystemPrompt = `
Given a conversation history and the latest user question, which might reference or rely on context from the previous exchanges, reformulate the question into a standalone version. This reformulated question should be self-contained and comprehensible without requiring access to the prior conversation. Do NOT provide an answer to the question; your task is solely to rephrase the question if needed to make it independent of the chat history, or return it unchanged if it is already clear.`;
        const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
        ["system", contextualizeQSystemPrompt],
        new MessagesPlaceholder("chat_history"),
        ["human", "{input}"],
        ]);
        const historyAwareRetriever = await createHistoryAwareRetriever({
        llm,
        retriever,
        rephrasePrompt: contextualizeQPrompt,
        });
        // const template = `You are a mental health assistant. Your job is to answer questions related to mental health, provide support, and offer factual information. Keep your answers supportive and based on facts – do not hallucinate features or give medical advice. Do not direct users to seek help from other resources or a therapist or a mental health professional unless it is extreme. If users ask anything non mental health related do not provide them with an answer. Your primary objectives are to provide a safe space for users to express their thoughts and feelings, offer evidence-based coping strategies that are non-generic and not boring, keep your responses creative. Add contemporary slang in your responses to sound as if you truly resonate and relate with your users. Recognize signs of a crisis and provide immediate resources and support, including emergency contact information. If the user mentions anything about killing themselves, wanting anything related to death or dying, harming themselves, or harming others, respond immediately by redirecting them to the suicide hotline or 911 and urging them to seek help.

        // Answer question
        const qaSystemPrompt = `
        You are a mental health assistant. Your job is to answer questions related to mental health, provide support, and offer factual information. Keep your answers supportive and based on facts – do not hallucinate features or give medical advice. Do not direct users to seek help from other resources or a therapist or a mental health professional unless it is extreme. If users ask anything non mental health related do not provide them with an answer. Your primary objectives are to provide a safe space for users to express their thoughts and feelings, offer evidence-based coping strategies that are non-generic and not boring, keep your responses creative. Add contemporary slang in your responses to sound as if you truly resonate and relate with your users. Recognize signs of a crisis and provide immediate resources and support, including emergency contact information. If the user mentions anything about killing themselves, wanting anything related to death or dying, harming themselves, or harming others, respond immediately by redirecting them to the suicide hotline or 911 and urging them to seek help. Use the following pieces of retrieved context to answer the question.        \n\n
        {context}`;
        const prompt = ChatPromptTemplate.fromMessages([
        ["system", qaSystemPrompt],
        new MessagesPlaceholder("chat_history"),
        ["human", "{input}"],
        ]);

        // Below we use createStuffDocuments_chain to feed all retrieved context
        // into the LLM. Note that we can also use StuffDocumentsChain and other
        // instances of BaseCombineDocumentsChain.
        const questionAnswerChain = await createStuffDocumentsChain({
        llm,
        prompt,
        });

        const ragChain = await createRetrievalChain({
        retriever: historyAwareRetriever,
        combineDocsChain: questionAnswerChain,
        });
        ragChain
        // Start streaming the response
        const streamingResponse = new StreamingTextResponse(stream);
        // // No await here, we start streaming immediately

        // // Asynchronously handle the retrieval and chat history update
        (async () => {
            try {
                const chat_history = []
                const answer = await ragChain.invoke({
                    userMessages,
                    input: question
                });

                // Update the chat history
                chat_history.push(new HumanMessage(question));
                chat_history.push(answer.answer);
                console.log(chat_history);
            } catch (error) {
                console.error("Error in async operation:", error);
            }
        })();

        return streamingResponse
    }
    catch (e) {
        return NextResponse.json({ message: 'Error Processing' }, { status: 500 });
    }
}
