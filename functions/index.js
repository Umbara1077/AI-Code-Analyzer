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
