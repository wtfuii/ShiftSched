UI.registerHelper("formatDateHHMM", function (date) {
  return moment(date).format("HH:mm");
});

UI.registerHelper("formatDateD", function (date) {
  return moment(date).format("D, dd");
});