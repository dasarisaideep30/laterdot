import cron from "node-cron";
import axios from "axios";


// The URL of your Next.js API route that handles the news fetching
// If running locally, this will be http://localhost:3000/api/cron/fetch-news
const CRON_ROUTE_URL = process.env.CRON_ROUTE_URL || "http://localhost:3000/api/cron/fetch-news";

console.log("🚀 Daily Intelligence Digest Cron Worker Started...");
console.log(`📡 Targeting Route: ${CRON_ROUTE_URL}`);

// Schedule: 7:00 AM IST
// IST is UTC + 5:30. 7:00 AM IST = 1:30 AM UTC
// The syntax for 1:30 AM is '30 1 * * *'
cron.schedule('30 1 * * *', async () => {
    console.log(`[${new Date().toISOString()}] 🟦 Running scheduled news fetch...`);

    try {
        const response = await axios.get(CRON_ROUTE_URL);
        console.log(`[${new Date().toISOString()}] ✅ Success:`, response.data.summary || response.data.message);
    } catch (error: any) {
        console.error(`[${new Date().toISOString()}] ❌ Error:`, error.message);
    }
}, {
    timezone: "UTC"
});

// For testing: Run once immediately if requested via flag --run-now
if (process.argv.includes("--run-now")) {
    console.log("🏃 Running immediate fetch task...");
    axios.get(CRON_ROUTE_URL)
        .then(res => console.log("✅ Immediate fetch success:", res.data.summary))
        .catch(err => console.error("❌ Immediate fetch error:", err.message));
}
