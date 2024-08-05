
export const maxDuration = 60; // This function can run for a maximum of 5 seconds

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';

import { getEmbeddingsTransformer, searchArgs } from '@/utils/openai';
import { MongoDBAtlasVectorSearch } from '@langchain/community/vectorstores/mongodb_atlas';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { LlamaParseReader } from "llamaindex/readers/LlamaParseReader";

import 'dotenv/config';

export async function POST(req: NextRequest) {
  try {
    const formData: FormData = await req.formData();
    const uploadedFiles = formData.getAll('filepond');
    let fileName = '';
    let parsedText = '';

    if (uploadedFiles && uploadedFiles.length > 0) {
      const uploadedFile = uploadedFiles[1];
      console.log('Uploaded file:', uploadedFile);

      if (uploadedFile instanceof File) {
        fileName = uploadedFile.name.toLowerCase();

        const tempFilePath = `/tmp/${fileName}`;
        const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

        await fs.writeFile(tempFilePath, fileBuffer);

        // Use LlamaParseReader to parse the PDF file
        const reader = new LlamaParseReader({ resultType: "text" });
        const documents = await reader.loadData(tempFilePath);

        // Extract the text from the parsed documents
        parsedText = documents.map(doc => doc.text).join('\n');
        console.log(parsedText);

        // Split text into chunks
        const chunks = await new CharacterTextSplitter({
          separator: "\n",
          chunkSize: 1000,
          chunkOverlap: 100,
        }).splitText(parsedText);
        console.log(' chunks:', chunks);

        console.log(chunks.length);

        // Store chunks into MongoDB using VectorStore
        await MongoDBAtlasVectorSearch.fromTexts(
          chunks, [],
          getEmbeddingsTransformer(),
          searchArgs("training_data", "vector_index")
        );

        return NextResponse.json({ message: "Uploaded to MongoDB" }, { status: 200 });
      } else {
        console.log('Uploaded file is not in the expected format.');
        return NextResponse.json({ message: 'Uploaded file is not in the expected format' }, { status: 500 });
      }
    } else {
      console.log('No files found.');
      return NextResponse.json({ message: 'No files found' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse("An error occurred during processing.", { status: 500 });
  }
}
