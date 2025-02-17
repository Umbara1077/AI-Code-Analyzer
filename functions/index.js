const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const OpenAI = require("openai");

admin.initializeApp();

const openai = new OpenAI({
    apiKey: "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",
});

exports.analyzeCode = onCall(async (request) => {
    console.log("🔥 Function Called: analyzeCode");
    console.log("📡 Received Data:", JSON.stringify(request.data, null, 2));

    try {
        if (!request.data || !request.data.code || typeof request.data.code !== "string" || request.data.code.trim() === "") {
            console.error("❌ Invalid Request: Code snippet is required.");
            throw new Error("Code snippet is required.");
        }

        console.log("✅ Code Snippet Received:", request.data.code);

        const response = await openai.chat.completions.create({
            model: "gpt-4o", // Uses GPT-4 Omni
            messages: [{ role: "user", content: `Analyze this code and suggest fixes:\n\n${request.data.code}` }],
        });

        console.log("✅ OpenAI API Response:", JSON.stringify(response, null, 2));

        if (!response.choices || response.choices.length === 0) {
            console.error("❌ OpenAI API returned an invalid response:", response);
            throw new Error("Invalid response from OpenAI.");
        }

        console.log("✅ Successfully analyzed code.");
        return { explanation: response.choices[0].message.content };

    } catch (error) {
        console.error("🔥 Function Error:", error);
        throw new Error(error.message);
    }
});
