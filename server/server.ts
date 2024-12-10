import express from "express";
import cors from "cors";
import { getSheetData } from "./googleSheets";
import { getAddressFromURL } from "./scrapeAddress";
import { getLatLng } from "./geocode";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5174"],
  })
);

app.get("/api/locations", async (_req, res) => {
  try {
    const urls = await getSheetData();
    console.log('urls:', urls);

    const locationPromises = urls.map(async (url) => {
      const address = await getAddressFromURL(url);
      const { lat, lng } = await getLatLng(address);
      return { lat, lng, name: url };
    });

    const locations = await Promise.all(locationPromises);

    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Internal Server Error', details: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
