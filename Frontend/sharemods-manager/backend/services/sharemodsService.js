const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const API_KEY = process.env.SHAREMODS_API_KEY;
const BASE_URL = process.env.SHAREMODS_BASE_URL;

const getAccountInfo = async () => {
  const response = await axios.get(
    `${BASE_URL}/account/info?key=${API_KEY}`
  );

  return response.data;
};

const listFiles = async () => {
  const response = await axios.get(
    `${BASE_URL}/file/list?key=${API_KEY}`
  );

  return response.data;
};

const createFolder = async (name) => {
  const response = await axios.get(
    `${BASE_URL}/folder/create?key=${API_KEY}&name=${encodeURIComponent(
      name
    )}`
  );

  return response.data;
};

const uploadFromUrl = async (url) => {
  const response = await axios.get(
    `${BASE_URL}/upload/url?key=${API_KEY}&url=${encodeURIComponent(url)}`
  );

  return response.data;
};

const uploadLocalFile = async (filePath, originalName) => {
  const serverRes = await axios.get(
    `${BASE_URL}/upload/server?key=${API_KEY}`
  );

  if (!serverRes.data.result) {
    throw new Error("Could not get upload server URL");
  }

  const uploadUrl = serverRes.data.result;
  const sessId = serverRes.data.sess_id;

  const form = new FormData();
  form.append('sess_id', sessId);
  form.append('file_0', fs.createReadStream(filePath), { filename: originalName });
  form.append('upload_type', 'file');

  const uploadRes = await axios.post(uploadUrl, form, {
    headers: form.getHeaders()
  });

  fs.unlinkSync(filePath);

  return uploadRes.data;
};

module.exports = {
  getAccountInfo,
  listFiles,
  createFolder,
  uploadFromUrl,
  uploadLocalFile,
};
