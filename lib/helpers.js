UI.registerHelper("formatDateHHMM", function (date) {
  return moment(date).format("HH:mm");
});

UI.registerHelper("formatDateD", function (day, month, year) {
  return moment([year, month, day]).format("D, dd");
});

UI.registerHelper("formatDateMY", function (month, year) {
  return moment([year, month]).format("MMMM YYYY");
});

invalidHour = function(hour) {
    if (hour !== undefined) {
        return hour < 0 || hour > 23 || isNaN(hour) ? true : false
    }
    return false
}

invalidMinute = function(minute) {
    if (minute !== undefined) {
        return minute < 0 || minute > 59 || isNaN(minute) ? true : false
    }
}