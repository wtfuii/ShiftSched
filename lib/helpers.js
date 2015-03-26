UI.registerHelper("formatDateHHMM", function (date) {
  return moment(date).format("HH:mm");
});

UI.registerHelper("formatDateD", function (day, month, year) {
  return moment([year, month, day]).format("D, dd");
});