Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe('userData');}
});

Router.route('/users', {name: 'users'});
Router.route('/newuser', {name: 'newUser'})
Router.route('/schedules', {name: 'schedules'});
Router.route('/newschedule', {name: 'newSchedule'});