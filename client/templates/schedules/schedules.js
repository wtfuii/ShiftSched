Template.schedules.helpers({
    groupedSchedules: function() {
        var groups = Schedules.find().fetch()
        var distinctGroups = _.uniq(groups, false, function(x) {
            return x.group
        })
        var pluckedGroups = _.pluck(distinctGroups, "group")
        var groupedSched = []
        for (var i=0; i < pluckedGroups.length; i++) {
            var f = Schedules.find({
                group: pluckedGroups[i]
            })
            groupedSched.push(f)
        }
        return groupedSched
    },
    
    settings: function() {
        return {
            fields: [
                {key: "year", label: "Jahr"},
                {key: "month", label: "Monat", fn: function(value, object) { return value + 1}},
                {key: "actions", label: "Aktionen", fn: function(value, object) {return new Spacebars.SafeString('<a href="#" class="edit">bearbeiten</a>')}}]
        }
    }
})

Template.schedules.events ({
 'click .reactive-table tr': function(e) {
    e.preventDefault();
    if (e.target.className == "edit") {
        Router.go("schedule", {_id: this._id})
        
    }
 }
})