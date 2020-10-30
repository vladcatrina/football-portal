const fetchData = require("../helpers/fetchData");
const Thread = require("../models/Thread");
const formatDate = require("../helpers/formatDate");

module.exports = {
  url: "/:parentType/:parentId/discussion",
  callback: (req, res) => {
    Thread.read(req.params.parentType, parseInt(req.params.parentId)).then(
      async (thread) => {
        if (thread === null) {
          let name; 

          switch (req.params.parentType) {
            case "competition":
            case "team":
            case "player":
              name = (await fetchData(
                `${req.params.parentType}s/${req.params.parentId}`
              )).name;
              break;
            case "match":
              let { homeTeam, awayTeam } = (await fetchData(
                `matches/${req.params.parentId}`
              )).match;
              name = `${homeTeam.name} - ${awayTeam.name}`;
          }

          Thread.create(
            req.params.parentType,
            parseInt(req.params.parentId),
            name
          ).then(() => {
            res.redirect("./discussion");
          });
        } else {
          res.render("discussion", { thread, formatDate });
        }
      }
    );
  },
};
