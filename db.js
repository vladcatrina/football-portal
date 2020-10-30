const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:bJruQ7ZvjAWfqooN@cluster0.scks5.mongodb.net/footballportal?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;