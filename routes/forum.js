const formatDate = require("../helpers/formatDate");
const Thread = require("../models/Thread");
const createTableComponent = require("../helpers/createTableComponent");

module.exports = {
  url: "/forum",
  callback: (req, res) => {
    Thread.list()
    .then (threads => {
      res.render("forum", { threads, createTableComponent, formatDate });
    }).catch(err => {
      res.send(err);
    });

    // console.log(threads);
  },
};
