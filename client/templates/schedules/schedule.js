Template.schedule.helpers({
    findTimes: function(day, month, year, userid) {
        return Times.find({userid: userid, year: year, month: month, day: day})
   },
   usersanddate: function(users, date) {
       for (i=0; i < users.length; i++) {
           users[i].day = date
       }
       return users
   }
})

Template.schedule.events({
    "click .deletetime": function() {
        Times.remove(this._id)
    }
})