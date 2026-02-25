import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export interface IntelligenceMetadata {
    category: string;
    importanceScore: number;
    impactLevel: string;
    region: string;
    tags: string[];
    publishRecommended: boolean;
}

export interface ComplianceMetadata {
    riskLevel: string;
    safeToPublish: boolean;
    complianceReason: string;
}

export async function classifyIntelligence(news: { title: string; content: string }): Promise<IntelligenceMetadata> {
    const prompt = `
You are a Web3 intelligence analyst. 

Analyze the following news and return EXACTLY a JSON object with these fields:
- category: (Government Policy | Market | Technology | Regulation | Adoption)
- importanceScore: (1–10)
- impactLevel: (LOW | MEDIUM | HIGH)
- region: (country or Global)
- tags: (array of keywords)
- publishRecommended: (true or false)

News Title: ${news.title}
News Content: ${news.content}

Return ONLY the JSON object.
`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Invalid JSON returned from Gemini");
    } catch (error) {
        console.error("Gemini Classification Error:", error);
        return {
            category: "Unknown",
            importanceScore: 5,
            impactLevel: "MEDIUM",
            region: "Global",
            tags: [],
            publishRecommended: true,
        };
    }
}

export async function checkCompliance(news: { title: string; content: string }): Promise<ComplianceMetadata> {
    const prompt = `
You are a compliance officer for Digital South Trust. 

Analyze the following news for compliance risks (False information, Scam tokens, Unverified claims, Illegal activities) and return EXACTLY a JSON object with these fields:
- riskLevel: (LOW | MEDIUM | HIGH)
- safeToPublish: (true | false)
- complianceReason: (explanation)

News Title: ${news.title}
News Content: ${news.content}

Return ONLY the JSON object.
`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Invalid JSON returned from Gemini");
    } catch (error) {
        console.error("Gemini Compliance Error:", error);
        return {
            riskLevel: "HIGH",
            safeToPublish: false,
            complianceReason: "Error during compliance check",
        };
    }
}

export async function generateLinkedInPost(news: {
    title: string;
    content: string;
    source: string;
    topic: string;
}) {
    const prompt = `
You are an expert Web3 analyst writing LinkedIn posts for Digital South Trust.

Write a professional LinkedIn post based on this news.

Requirements:
- Professional tone
- Government and institutional audience
- Clear insights
- Under 150 words
- Add relevant hashtags
- Avoid hype
- Focus on impact

News:
TITLE: ${news.title}
CONTENT: ${news.content}
SOURCE: ${news.source}
TOPIC: ${news.topic}
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        throw new Error("Failed to generate LinkedIn post");
    }
}
