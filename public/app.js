import { functions, httpsCallable } from "./firebase-config.js";

document.getElementById("analyzeBtn").addEventListener("click", async () => {
    const codeSnippet = document.getElementById("codeInput").value.trim();

    if (!codeSnippet) {
        alert("❌ Please enter some code!");
        return;
    }

    document.getElementById("output").textContent = "Analyzing...";
    console.log("📡 Sending request to Firebase with code:", codeSnippet);

    try {
        const analyzeCode = httpsCallable(functions, "analyzeCode");
        const result = await analyzeCode({ code: codeSnippet });

        if (result.data && result.data.explanation) {
            console.log("✅ AI Response:", result.data.explanation);
            document.getElementById("output").textContent = result.data.explanation;
        } else {
            throw new Error("❌ Invalid response from AI.");
        }
    } catch (error) {
        console.error("🔥 Error:", error);
        document.getElementById("output").textContent = "Error: " + error.message;
    }
});