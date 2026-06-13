const sharemodsService = require("../services/sharemodsService");

exports.accountInfo = async (req, res) => {
  try {
    const data = await sharemodsService.getAccountInfo();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listFiles = async (req, res) => {
  try {
    const data = await sharemodsService.listFiles();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFolder = async (req, res) => {
  try {
    const { name } = req.body;

    const data = await sharemodsService.createFolder(name);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadUrl = async (req, res) => {
  try {
    const { url } = req.body;

    const data = await sharemodsService.uploadFromUrl(url);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadLocal = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const data = await sharemodsService.uploadLocalFile(req.file.path, req.file.originalname);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
