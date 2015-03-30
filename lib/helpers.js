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

checkTime = function(start, end) {
    start = start.split(".")
    end = end.split(".")
    if (invalidHour(start[0]) || invalidMinute(start[1]) || invalidHour(end[0]) || invalidMinute(end[1])) {
        return alert("Bitte gültige Uhrzeit eingeben.")
    }
    return {start: start, end: end}
}