Template.schedule.helpers({
    findTimes: function(day, month, year, userid) {
        return Times.find({userid: userid, year: year, month: month, day: day})
   },
   usersanddate: function(users, date) {
       return {users: users, date: date}
   },
   getWorkedHours: function(month, year, id) {
       var t = Times.find({month: month, year: year, userid: id}).fetch()
       r = 0
       for (i = 0; i < t.length; i++) {
           r = r + t[i].workedhours
       }
       return moment.duration(r).asHours()
   },
   getDaysList: function(days) {
        var a = []
            for (var i = 1; i <= days; i++) {
                a.push(i)
            }
        return a
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
        var time = checkTime(starttime, endtime)
        if (!time) {
            return undefined
        }
        starttime = time.start
        endtime = time.end
        starttime = moment([data.year, data.month, data.day, starttime[0], starttime[1] || 0])
        endtime = moment([data.year, data.month, data.day, endtime[0], endtime[1] || 0])
        endtime = endtime <= starttime ? endtime.add(1, "d") : endtime
        var multi = undefined
        if (holidayCheck(starttime.toDate(), "NW")) {
            multi = Presets.find({days: "f"}).fetch()
        } else {
            switch (starttime.day()) {
                case 0:
                    multi = Presets.find({days: "o"}).fetch()
                    break
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    multi = Presets.find({days: "w"}).fetch()
                    break
                case 6:
                    multi = Presets.find({days: "a"}).fetch()
                    break
            }
            
        }
        var multihours = 0
        var workrange = moment().range(starttime, endtime)
        for (i = 0; i < multi.length; i++) {
            var momentstartmulti = moment(multi[i].starttime)
            var momentendmulti = moment(multi[i].endtime)
            momentstartmulti = moment([starttime.year(), starttime.month(), starttime.date(), momentstartmulti.hour(), momentstartmulti.minute()])
            momentendmulti = moment([starttime.year(), starttime.month(), starttime.date() + multi[i].nextday, momentendmulti.hour(), momentendmulti.minute()])
            var multirange = moment().range(momentstartmulti, momentendmulti)
            var intersect = workrange.intersect(multirange)
            console.log({workrange: workrange, multirange: multirange})
            if (intersect) {
                var countedhours = intersect.diff()
                multihours = multihours + (countedhours * (multi[i].multi - 1))
            }
        }
        Times.insert({userid: data.user, month: data.month, year: data.year, day: data.day, starttime: starttime.toISOString(), endtime: endtime.toISOString(), workedhours: endtime.diff(starttime), multihours: multihours})
        var td = $(event.currentTarget).closest("td")
        $(event.currentTarget).closest(".addtimefield").html("")
        td.append('<a href="#" class="addtime"><i class="fa fa-plus"></i></a>')
    }
})