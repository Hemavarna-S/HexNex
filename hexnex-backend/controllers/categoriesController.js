const { main } = require('../utils/Lang');

const categoriesFeedback = async (req, res) => {
    // Specific prompt focused only on cybersecurity content
    const prompt = "Generate a detailed cybersecurity journal article body content of about 500–600 words. The content should be directly usable in a blog post and should focus only on cybersecurity topics, without including any prompt instructions or unrelated content.";

    try {
        const data = req.body.data;
        if (!data) {
            return res.status(400).json({ status: "failed", message: "Data is required" });
        }

        // Call the main function to generate cybersecurity-specific content
        const chatCompletion = await main(data, prompt);
        console.log(chatCompletion);

        if (!chatCompletion) {
            console.log('No data generated from AI');
            return res.status(400).json({ status: "failed", message: "No data found" });
        }

        return res.status(200).json({ message: chatCompletion });
    } catch (err) {
        console.error('Error generating cybersecurity content:', err);
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

module.exports = { categoriesFeedback };
