const client = require("../db");

const Thread = {
  collName: "threads",
  dbQuery: function (callback) {
    return dbQuery(this.collName, callback);
  },
  list: function () {
    return this.dbQuery((collection) => {
      return collection.find({}).sort({ date: -1 }).toArray();
    });
  },
  read: function (parentType, parentId) {
    return this.dbQuery((collection) =>
      collection.findOne({ parentType, parentId })
    );
  },
  create: function (parentType, parentId, name) {
    return this.dbQuery((collection) =>
      collection.insertOne({
        parentId,
        parentType,
        name,
        replies: [],
        date: new Date(),
        repliesNumber: 0,
      })
    );
  },
  addComment: function (parentType, parentId, address, content) {
    return this.dbQuery((collection) => {
      let mongoAddress = "";
      if (address) {
        let arr = address.split(",");
        arr.forEach((step) => {
          mongoAddress += `replies.${parseInt(step)}`;
          mongoAddress += ".";
        });
      }
      mongoAddress += "replies";

      let pushObject = {};
      pushObject[mongoAddress] = { content, date: new Date(), replies: [] };

      return collection.updateOne(
        {
          parentId,
          parentType,
        },
        {
          $push: pushObject,
          $inc: {
            repliesNumber: 1,
          },
          $set: {
            date: new Date(), //date: last updated, not thread creation date
          },
        }
      );
    });
  },
};

function dbQuery(collName, callback) {
  return client.connect().then(() => {
    const collection = client.db("footballportal").collection(collName);

    return callback(collection);
  });
}

module.exports = Thread;
