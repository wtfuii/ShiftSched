Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return [Meteor.subscribe('userData'), Meteor.subscribe('scheduleData')]
  }
});

Router.route('/users', {
  name: 'users'
});
Router.route('/newuser', {
  name: 'newUser'
})
Router.route('/schedules', {
  name: 'schedules'
});
Router.route('/newschedule', {
  name: 'newSchedule'
});
Router.route('/schedule/:_id', {
  name: 'schedule',
  data: function() {
    var sched = Schedules.findOne(this.params._id)
    var users = Meteor.users.find({
      "roles.group": sched.group
    }).fetch()
    
    //this function returns an array of Date objects containing all days within the planned month
    var getDaysList = function (sched) {
      var d = new Date(sched.year, sched.month, 0).getDate()
      var a = []
      for (var i = 1; i <= d; i++) {
        a.push(new Date(sched.year, sched.month - 1, i))
      }
      return a
    }
    
    //utilizes the previous defined function to generate the array of dates for this plan
    var days = getDaysList(sched)
    
    //this function accepts a Date object, adds 1 day and returns this new Date object. 
    function addDay(date) {
      var r = new Date(date)
      return new Date(r.setDate(r.getDate() + 1))
    }
    
    //the array which will be filled and returned
    var returnDaysWithTimes = []
    
    
    for (var i = 0; i < days.length; i++) {
      var d = { day: days[i] }
      var a = []
      for (var l = 0; l < users.length; l++) {
        a.push(Times.find({user: users[l]._id, schedule: sched._id, startTime: { $gte: d.day, $lt: addDay(d.day) }}))
      }
      d.times = a
      returnDaysWithTimes.push(d)
    }
    
    return {
      users: users,
      schedule: sched,
      days: returnDaysWithTimes
    }
  }
})