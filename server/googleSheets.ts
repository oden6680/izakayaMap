import { google } from "googleapis";
import dotenv from "dotenv";

const spreadsheetId =
  process.env.SPREADSHEET_ID || "1wLJzHc-167dIPWwaucii36glrvq9G5ggNLEA0yARDTU";

export const getSheetData = async (): Promise<string[]> => {
  if (!spreadsheetId) {
    throw new Error("Missing spreadsheetId in environment variables");
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: "server/credentials/izakayamapping-6935fe4fecce.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const client = await auth.getClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sheets = google.sheets({ version: "v4", auth: client as any });

  dotenv.config();

  const range = "db!A2:A";

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;
  if (rows && rows.length > 0) {
    return rows.map((row) => row[0]);
  } else {
    return [];
  }
};
