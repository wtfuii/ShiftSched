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

        var users = Meteor.users.find({
            "roles.group": submission.group
        }).fetch()
        var days = new Date(submission.year, submission.month, 0).getDate()

        var s = Schedules.insert({group: submission.group, month: submission.month - 1, year: submission.year, users: users, days: days})

        if (Meteor.isClient) {
            Router.go('schedule', {
                _id: s
            })
        }
    }
})