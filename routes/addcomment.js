const Thread = require("../models/Thread");

module.exports = {
  url: "/:parentType/:parentId/addcomment",
  callback: async (req, res) => {
    const client = require("../db");
    client.connect(async (err) => {
      if (err) {
        throw err;
      }
      const { parentType, parentId } = req.params;
      const { address, content } = req.body;

      if (content) {
        await Thread.addComment(parentType, parseInt(parentId), address, content);
      }

      res.redirect("./discussion");
    });
  },
};
