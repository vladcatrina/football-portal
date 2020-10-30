module.exports = function formatDate(date) {
  try {
    date = new Date(date); //provizoriu
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
  } catch (e) {
    return "invalid date";
  }
};
