Template.schedule.helpers({
    findTimes: function(day, month, year, userid) {
        return Times.find({userid: userid, year: year, month: month, day: day})
   },
   usersanddate: function(users, date) {
       for (i=0; i < users.length; i++) {
           users[i].day = date
       }
       return users
   },
   getWorkedHours: function(month, year, id) {
       var t = Times.find({month: month, year: year, userid: id}).fetch()
       r = 0
       for (i = 0; i < t.length; i++) {
           r = r + t[i].workedhours
       }
       return moment.duration(r).asHours()
   }
})

Template.schedule.events({
    "click .deletetime": function() {
        Times.remove(this._id)
    },
    "click .addtime": function(event) {
        event.preventDefault();
        $(event.currentTarget).siblings(".addtimefield").append("<form><input type='text' name='start'><input type='text' name='end'><a href='#' class='submittime'><i class='fa fa-check'></i></a></form>")
        $(event.currentTarget).remove()
    },
    "click .submittime": function(event) {
        event.preventDefault()
        var data = $(event.currentTarget).closest("td").data()
        var starttime = $(event.currentTarget).siblings("[name=start]").val()
        var endtime = $(event.currentTarget).siblings("[name=end]").val()
        starttime = starttime.split(".")
        endtime = endtime.split(".")
        starttime = moment([data.year, data.month, data.day, starttime[0], starttime[1] || 0])
        endtime = moment([data.year, data.month, data.day, endtime[0], endtime[1] || 0])
        endtime = endtime <= starttime ? endtime.add(1, "d") : endtime
        Times.insert({userid: data.user, month: data.month, year: data.year, day: data.day, starttime: starttime.toISOString(), endtime: endtime.toISOString(), workedhours: endtime.diff(starttime)})
        var td = $(event.currentTarget).closest("td")
        $(event.currentTarget).closest(".addtimefield").html("")
        td.append('<a href="#" class="addtime"><i class="fa fa-plus"></i></a>')
    }
})