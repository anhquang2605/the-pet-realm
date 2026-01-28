import OpenAI from "openai";
const baseUrl = 'https://api.aimlapi.com/v1';
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: baseUrl,
});