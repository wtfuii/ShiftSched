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
        return hour === "" || isNaN(hour) || hour < 0 || hour > 23 ? true : false
}

invalidMinute = function(minute) {
    if (minute !== undefined) {    
        return isNaN(minute) || minute < 0 || minute > 59 ? true : false
    }
    return false
}