const parseCSV = require("./csvParser");
const sendWhatsApp = require("./whatsappService");

let leadsStore = [];

exports.uploadLeads = async (req, res) => {
  try {

    const leads = await parseCSV(req.file.path);
    leadsStore = leads;

    res.json({
      message: "Leads uploaded successfully",
      count: leads.length
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.startCampaign = async (req, res) => {

  const { template } = req.body;

  for (const lead of leadsStore) {

    let message = template;

    Object.keys(lead).forEach(key => {
      message = message.replace(`{${key}}`, lead[key]);
    });

    await sendWhatsApp(lead.phone, message);
  }

  res.json({
    message: "Campaign started",
    totalLeads: leadsStore.length
  });

};