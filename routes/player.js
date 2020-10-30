const fetchData = require("../helpers/fetchData");
const createTableComponent = require("../helpers/createTableComponent");
const formatDate = require("../helpers/formatDate");

module.exports = {
  url: "/player/:playerId",
  callback: (req, res) => {
    Promise.all([
      fetchData(`players/${req.params.playerId}`),
      fetchData(`players/${req.params.playerId}/matches?status=FINISHED&limit=20`),
    ])
    .then(([playerData, matchesData]) => {
      res.render("player", { playerData, matchesData, createTableComponent, formatDate });
    })
    .catch(err => {
      res.send(err);
    });

  },
};
