const fetchData = require("../helpers/fetchData");

module.exports = {
  url: "/",
  callback: (req, res) => {
    fetchData("competitions?plan=TIER_ONE")
      .then((data) => {
        res.render("index", { competitions: data.competitions });
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
