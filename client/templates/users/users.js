Template.users.helpers({
    settings: function(){
        return {
            collection: Meteor.users.find(),
            fields: [
                {key: "username", label: "Benutzer"},
                {key: "roles.group.0", label: "Gruppe"},
                {key: "hours", label: "Arbeitsstunden"},
                {key: "emails.0.address", label: "E-Mail-Adresse"},
                {key: "deleteuser", label: "Aktion", fn: function(value, object) {return new Spacebars.SafeString('<a href="#" class="delete">löschen</a>')}}]
        }
    }
})

Template.users.events ({
 'click .reactive-table tr': function(e) {
    e.preventDefault();
    if (e.target.className == "delete") {
        if (confirm("Nutzer " + this.username + " löschen?" )) {
            Meteor.users.remove(this._id)
        }
    }
 }
})