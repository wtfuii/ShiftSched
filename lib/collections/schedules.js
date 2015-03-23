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

        //this function returns an array of Date objects containing all days within the planned month
        var getDaysList = function(sched) {
            var d = new Date(sched.year, sched.month, 0).getDate()
            var a = []
            for (var i = 1; i <= d; i++) {
                a.push(i)
            }
            return a
        }

        //utilizes the previous defined function to generate the array of dates for this plan
        var days = getDaysList(submission)


        var s = Schedules.insert({group: submission.group, month: submission.month, year: submission.year, users: users, days: days})

        if (Meteor.isClient) {
            Router.go('schedule', {
                _id: s
            })
        }
    }
})