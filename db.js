const MongoClient = require('mongodb').MongoClient;
const uri = require("./config").dbUri;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;