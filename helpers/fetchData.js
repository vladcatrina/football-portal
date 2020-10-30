const request = require("request");
const FOOTBALL_API_TOKEN = "779b2f1d64e74627b56f46fb8ba3ed31";
const FOOTBALL_API_ADDRESS = "https://api.football-data.org/v2";
const Cache = require("./Cache");

const MINUTE = 60000;

module.exports = function fetchData(url) {
  return new Promise((resolve, reject) => {
    const cacheEntry = Cache.get(url);
    const now = new Date().valueOf();
    if (cacheEntry && now - cacheEntry.time < MINUTE) {
      resolve(cacheEntry.value);
    } else {
      request.get(
        {
          url: `${FOOTBALL_API_ADDRESS}/${url}`,
          headers: { "X-Auth-Token": FOOTBALL_API_TOKEN },
        },
        (err, res, body) => {
          if (err) {
            reject(err);
            return;
          }
          const bodyObj = JSON.parse(body);

          if (bodyObj.errorCode || bodyObj.error) {
            if (cacheEntry) {
              resolve(cacheEntry.value);
            } else {
              reject(bodyObj.message);
            }
            return;
          }
          Cache.set(url, bodyObj);
          resolve(bodyObj);
        }
      );
    }
  });
};
