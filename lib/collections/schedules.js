SchedulesSchema = new SimpleSchema({
    year: {
        type: Number,
        label: "Jahr"
    },
    month: {
        type: Number,
        label: "Monat"
    },
    group: {
        type: String,
        label: "Gruppe"
    }
})

SchedulesInputSchema = new SimpleSchema({
     year: {
        type: Number,
        label: "Jahr"
    },
    month: {
        type: Number,
        label: "Monat"
    },
    group: {
        type: String,
        label: "Gruppe"
    }
})

Schedules = new Mongo.Collection("schedules");

Meteor.methods({
    onNewSchedule: function(submission) {
        check(submission, SchedulesInputSchema)
        var s = Schedules.insert(submission)
        if (Meteor.isClient) {
            Router.go('schedule', {_id: s})
        }
    }
})