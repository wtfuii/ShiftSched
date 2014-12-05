
UserSchema = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    hours: {
        type: Number,
        label: "Arbeitsstunden pro Woche",
        optional: true
    },
});

UserInputSchema = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        label: "Benutzername"
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-Mail-Adresse",
    },
    group: {
        type: String,
        label: "Gruppe"
    },
    hours: {
        type: Number,
        label: "Arbeitsstunden pro Woche",
        optional: true
    },
})


Meteor.methods({
    onNewUser: function(submission) {
        check(submission, UserInputSchema)
        if (Meteor.isServer) {
            var a = Accounts.createUser( { username: submission.username, email: submission.email} )
            Meteor.users.update(a, {$set: {hours: submission.hours}})
            Roles.addUsersToRoles(a, submission.group, "group")
        }
        if (Meteor.isClient) {
            Router.go('users')
        }
    }
})