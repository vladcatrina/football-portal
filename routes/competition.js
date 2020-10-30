const fetchData = require("../helpers/fetchData");
const formatDate = require("../helpers/formatDate");

const createTableComponent = require("../helpers/createTableComponent");

module.exports = {
  url: "/competition/:compId",
  callback: (req, res) => {
      Promise.all([
        fetchData(`competitions/${req.params.compId}/matches`),
        fetchData(
          `competitions/${req.params.compId}/standings?standingType=TOTAL`
        ),
      ])
      .then(([matchesData, standingsData, scorersData]) => {
        res.render("competition", { matchesData, standingsData, scorersData, createTableComponent, formatDate });
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
