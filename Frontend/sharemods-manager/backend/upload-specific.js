const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function uploadSpecificFile() {
  try {
    const filePath = 'c:\\Users\\premk\\Videos\\POJECT\\New folder\\sharemods-manager\\backend\\upload\\02_BMI_Horn.scs';
    const res = await axios.get('https://sharemods.com/api/upload/server?key=135467d2nlfxehnh44pwfn9o8aelumf5acm339');
    
    const uploadUrl = res.data.result;
    const sessId = res.data.sess_id;

    const form = new FormData();
    form.append('sess_id', sessId);
    form.append('file_0', fs.createReadStream(filePath), { filename: '02_BMI_Horn.scs' });
    form.append('upload_type', 'file');

    console.log("Uploading to:", uploadUrl);
    const uploadRes = await axios.post(uploadUrl, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    console.log("Upload result:", uploadRes.data);
  } catch (err) {
    console.log("Error:", err.message);
  }
}
uploadSpecificFile();
