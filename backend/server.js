const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { uploadLeads, startCampaign } = require("./campaignController");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/upload-leads", upload.single("file"), uploadLeads);
app.post("/start-campaign", startCampaign);

app.listen(5000, () => {
  console.log("WhatsApp Campaign Engine running on port 5000");
});