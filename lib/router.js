Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return [Meteor.subscribe('userData'), Meteor.subscribe('scheduleData')]
  }
});

Router.route('/users', {
  name: 'users'
});
Router.route('/administration', {
  name: 'administration',
  data: function() {
      return Presets.find()
  }
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
    return Schedules.findOne(this.params._id)
  }
})