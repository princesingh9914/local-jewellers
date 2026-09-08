import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Jewellers Voice AI Assistant" });
  });

  // Voice Query & AI Customer Assistant Endpoint
  app.post("/api/ai/voice-query", async (req, res) => {
    try {
      const { query, vendor, products = [] } = req.body;

      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query is required" });
      }

      const client = getAIClient();
      const vendorName = vendor?.name || "Our Jewellery Showroom";
      const vendorCity = vendor?.city || "Jaipur";
      const vendorAbout = vendor?.aboutText || "";
      const businessHours = vendor?.businessHours || "Monday to Saturday: 10:30 AM to 8:30 PM";

      // If Gemini client is available, generate smart contextual response
      if (client) {
        try {
          const productSummaries = products.slice(0, 20).map((p: any) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            purity: p.purity,
            category: p.categoryName || "",
            description: p.description || ""
          }));

          const prompt = `You are the prestigious Royal AI Voice Concierge for "${vendorName}", a renowned BIS Hallmarked fine gold & diamond jewellery showroom located in ${vendorCity}.
The customer asked or spoke the following query using voice input:
"${query}"

Showroom Context:
- Name: ${vendorName}
- City: ${vendorCity}
- About: ${vendorAbout}
- Business Hours: ${businessHours}
- Hallmark Assurance: 100% BIS Hallmarked 22K (916) and 18K with 6-digit laser HUID
- Diamond Certification: IGI / GIA natural diamonds & syndicate Kundan Polki
- Purity Transparency: Zero deduction on pure gold, live digital scale weighing

Current Available Showroom Ornaments Catalog (Sample):
${JSON.stringify(productSummaries, null, 2)}

Instructions:
1. Analyze the customer's query and classify the intent:
   - "product_search": If they are looking for, asking about, or searching ornaments (e.g., necklaces, rings, jhumkas, kadas, bridal sets, gold weight, price range).
   - "customer_query": If they are asking questions about showroom policies, gold purity, hallmark verification, making charges, custom orders, timings, return/exchange, or location.
   - "general_chat": Greetings, general compliments, or assistance.

2. If "product_search":
   - Find matching product IDs from the catalog that best match what the user is asking for.
   - Extract a clean search keyword string for filtering the catalog (e.g. "Bridal Choker" or "22K Ring").
   - Extract suggested purity filter if mentioned (e.g. "22K (916)", "18K (750)", "Polki / Kundan", "Diamond Certified", "all").
   - Formulate a respectful, gracious audio response in the same language the customer spoke (Hindi, English, or Hinglish with Indian royal warmth, e.g., "Namaste ji, hamare paas 22 Karat certified...").

3. If "customer_query":
   - Provide a clear, respectful, and comforting answer reflecting traditional Indian jeweller hospitality and trust.
   - Keep answers concise and audio-friendly (2-4 sentences max so it sounds natural when read aloud).

4. Return ONLY a valid JSON object strictly matching this schema:
{
  "intent": "product_search" | "customer_query" | "general_chat",
  "spokenResponse": "Concise, warm spoken reply to be read to customer",
  "searchKeyword": "Clean search term or empty string",
  "suggestedPurity": "all" | "22K (916)" | "18K (750)" | "Polki / Kundan" | "Diamond Certified" | "925 Silver",
  "matchedProductIds": ["prod_id1", "prod_id2"],
  "whatsappFollowupText": "Suggested text if customer wants to ask on WhatsApp"
}`;

          const response = await client.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
            }
          });

          const rawText = response.text || "{}";
          const parsed = JSON.parse(rawText);

          return res.json({
            success: true,
            ...parsed
          });
        } catch (geminiError) {
          console.error("Gemini API error in voice query, falling back to local handler:", geminiError);
          // Fall back to rule-based matcher below
        }
      }

      // Rule-based Fallback (when GEMINI_API_KEY is not set or network fails)
      const qLower = query.toLowerCase();
      const isPolicyQuery = /hallmark|purity|return|exchange|guarantee|time|hours|open|address|location|making charge|discount|gold rate/i.test(qLower);
      
      if (isPolicyQuery) {
        let answer = `At ${vendorName}, all our gold jewellery is 100% BIS Hallmarked with a 6-digit HUID code ensuring pure 22K (916) or 18K purity. Our showroom in ${vendorCity} is open ${businessHours}.`;
        if (/making charge/i.test(qLower)) {
          answer = `Our making charges are completely transparent and calculated purely on net gold weight with zero hidden deductions.`;
        } else if (/return|exchange/i.test(qLower)) {
          answer = `We offer a lifetime buyback and exchange guarantee on all BIS hallmarked ornaments at current market gold value.`;
        }

        return res.json({
          success: true,
          intent: "customer_query",
          spokenResponse: answer,
          searchKeyword: "",
          suggestedPurity: "all",
          matchedProductIds: [],
          whatsappFollowupText: `Hello ${vendorName}, I have an inquiry: ${query}`
        });
      }

      // Product search fallback
      const matching = (products as any[]).filter((p) => {
        const text = `${p.title} ${p.description} ${p.purity} ${p.categoryName || ""}`.toLowerCase();
        const words = qLower.split(/\s+/).filter((w) => w.length > 2);
        return words.some((w) => text.includes(w));
      });

      const matchedIds = matching.map((p) => p.id);
      const cleanSearch = qLower.replace(/(dikhao|chahiye|hai kya|show me|search for|look for|please)/gi, "").trim();

      return res.json({
        success: true,
        intent: "product_search",
        spokenResponse: matchedIds.length > 0 
          ? `I found ${matchedIds.length} ornaments matching your request at ${vendorName}. Here are the handpicked pieces for you.`
          : `I am searching for "${cleanSearch}" across our 22K and 18K collections. Here is what we have in stock.`,
        searchKeyword: cleanSearch,
        suggestedPurity: /18k/i.test(qLower) ? "18K (750)" : /22k|916/i.test(qLower) ? "22K (916)" : "all",
        matchedProductIds: matchedIds,
        whatsappFollowupText: `Hello ${vendorName}, I am looking for ${cleanSearch}`
      });

    } catch (err: any) {
      console.error("Voice query route error:", err);
      return res.status(500).json({ error: "Failed to process voice query", details: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
