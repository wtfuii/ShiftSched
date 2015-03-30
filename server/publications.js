Meteor.publish("userData", function () {
    return Meteor.users.find({}, {fields: {username: 1, hours: 1, emails: 1, roles: 1}})
})

Meteor.publish("scheduleData", function() {
    return Schedules.find()
})

Meteor.publish("presetsData", function() {
    return Presets.find()
})