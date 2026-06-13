const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testUpload() {
  try {
    const res = await axios.get('https://sharemods.com/api/upload/server?key=135467d2nlfxehnh44pwfn9o8aelumf5acm339');
    console.log("Server info:", res.data);

    const uploadUrl = res.data.result;
    const sessId = res.data.sess_id;

    fs.writeFileSync('hello.txt', 'Hello ShareMods!');

    const form = new FormData();
    form.append('sess_id', sessId);
    form.append('file_0', fs.createReadStream('hello.txt'));
    form.append('upload_type', 'file');

    console.log("Uploading to:", uploadUrl);
    const uploadRes = await axios.post(uploadUrl, form, {
      headers: form.getHeaders()
    });

    console.log("Upload result:", uploadRes.data);
  } catch (err) {
    console.log("Error:", err.message);
  }
}
testUpload();
