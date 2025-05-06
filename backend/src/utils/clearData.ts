import fs from "fs";
import path from "path";

const dataFilePath = path.join(__dirname, "../../data/urls.json");

export function clearData() {
  const emptyData = {
    urlStore: [],
    statsStore: [],
  };
  fs.writeFileSync(dataFilePath, JSON.stringify(emptyData, null, 2));
  console.log("Data cleared successfully.");
}
