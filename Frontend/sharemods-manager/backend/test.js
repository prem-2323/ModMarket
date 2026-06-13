const axios = require('axios');

async function test() {
  try {
    const res = await axios.get('https://sharemods.com/api/upload/server?key=135467d2nlfxehnh44pwfn9o8aelumf5acm339');
    console.log("Success:", res.data);
  } catch (err) {
    console.log("Error:", err.message);
    if(err.response) console.log(err.response.data);
  }
}
test();
