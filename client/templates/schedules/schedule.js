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
    },
    "click .addtime": function(event) {
        event.preventDefault();
        console.log($(event.target).siblings(".addtimefield"))
        $(event.target).siblings(".addtimefield").html("<form><input type='text' name='start'><input type='text' name='end'></form>")
    }
})