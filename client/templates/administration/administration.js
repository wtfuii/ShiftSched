//Template.administration.helpers({
//
//}

Template.administration.events({
    "click .submittime": function(event) {
        event.preventDefault();
        var days = $(event.currentTarget).siblings("[name=days]").val()
        var times = checkTime($(event.currentTarget).siblings("[name=start]").val(), $(event.currentTarget).siblings("[name=end]").val())
        if (!times) {
            return undefined
        }
        var starttime = moment([1989, 11, 15, times.start[0], times.start[1] || 0])
        var endtime = moment([1989, 11, 15, times.end[0], times.end[1] || 0])
        var nextday = 0
        if (endtime <= starttime) {
            endtime = endtime.add(1, "d")
            nextday = 1
        }
        var multi = $(event.currentTarget).siblings("[name=multi]").val()
        multi = parseFloat(multi)
        if (isNaN(multi)) {
            return alert("Bitte nur Zahlen als Multiplikator eingeben.")
        }
        Presets.insert({days: days, starttime: starttime.toISOString(), endtime: endtime.toISOString(), nextday: nextday, multi: multi})
},
    "click .deletetime": function() {
        Presets.remove(this._id)
    }
})