const fetchData = require('../helpers/fetchData');
const formatDate = require("../helpers/formatDate");

module.exports = {
  url: "/match/:matchId",
  callback: (req, res) => {
    fetchData(`matches/${req.params.matchId}`)
    .then(matchData => {
      res.render("match", { matchData, formatDate });
    })
    .catch((err) => {
      res.send(err);
    });
  },
};
