const fetchData = require('../helpers/fetchData');
const createTableComponent = require("../helpers/createTableComponent");

module.exports = {
  url: "/team/:teamId",
  callback: async (req, res) => {
    fetchData(`teams/${req.params.teamId}`)
    .then(teamData => {
      res.render("team", { teamData, createTableComponent });
    })
    .catch(err => {
      res.send(err);
    });
  },
};
