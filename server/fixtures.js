if (Meteor.users.find().count() == 0) {
    var a = Accounts.createUser({username: "EPutin", password:"123456", email:"Put@gmx.de"})
    var b = Accounts.createUser({username: "HMeier", password:"123456", email:"dafuqington@gmail.com"})
    var c = Accounts.createUser({username: "PSchlau", password:"123456", email:"oh@hai.de"})
    var d = Accounts.createUser({username: "BMaja", password:"123456", email:"biene@maja.net"})
    Meteor.users.update({username : "EPutin"}, {$set: {hours: 39}})
    Meteor.users.update({username : "HMeier"}, {$set: {hours: 38}})
    Meteor.users.update({username : "PSchlau"}, {$set: {hours: 38}})
    Meteor.users.update({username : "BMaja"}, {$set: {hours: 38}})
    Roles.addUsersToRoles(a, "3", "group")
    Roles.addUsersToRoles(b, "2", "group")
    Roles.addUsersToRoles(c, "2", "group")
    Roles.addUsersToRoles(d, "AG", "group")
    Meteor.call("onNewSchedule", {year: 2014, month: 2, group: "3"}, function (err, res) {
        Times.insert({userid: a, year: 2014, month: 2, day: 4, group: 3, starttime: moment([2014, 2, 4, 13]).toISOString(), endtime: moment([2014, 2, 4, 19]).toISOString()})
        Times.insert({userid: a, year: 2014, month: 2, day: 6, group: 3, starttime: moment([2014, 2, 6, 12]).toISOString(), endtime: moment([2014, 2, 6, 21]).toISOString()})
    })
}