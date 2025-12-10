require('dotenv').config();

function encode(){
    const api_key = process.env.api_key;
    const base_url = process.env.base_url;
    const server = process.env.server;

    return {api_key, base_url, server};
} 

module.exports = {encode};