if (Meteor.users.find().count() == 0) {
    var a = Accounts.createUser({username: "ESchoeneberg", password:"123456", email:"els@gmx.de"})
    var b = Accounts.createUser({username: "HMeier", password:"123456", email:"dafuqington@gmail.com"})
    var c = Accounts.createUser({username: "PSchlau", password:"123456", email:"oh@hai.de"})
    var d = Accounts.createUser({username: "BMaja", password:"123456", email:"biene@maja.net"})
    Meteor.users.update({username : "ESchoeneberg"}, {$set: {hours: 39}})
    Meteor.users.update({username : "HMeier"}, {$set: {hours: 38}})
    Meteor.users.update({username : "PSchlau"}, {$set: {hours: 38}})
    Meteor.users.update({username : "BMaja"}, {$set: {hours: 38}})
    Roles.addUsersToRoles(a, "3", "group")
    Roles.addUsersToRoles(b, "2", "group")
    Roles.addUsersToRoles(c, "2", "group")
    Roles.addUsersToRoles(d, "AG", "group")
}