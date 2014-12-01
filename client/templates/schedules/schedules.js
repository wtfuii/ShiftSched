Template.schedules.helpers({
    groupedSchedules: function() {
        var groups = Schedules.find().fetch()
        var distinctGroups = _.uniq(groups, false, function(x) {
            return x.group
        })
        console.log(distinctGroups)
        var pluckedGroups = _.pluck(distinctGroups, "group")
        console.log(pluckedGroups)
        var groupedSched = []
        for (var i=0; i < pluckedGroups.length; i++) {
            var f = Schedules.find({
                group: pluckedGroups[i]
            })
            groupedSched.push(f)
        }
        console.log(groupedSched)
        return groupedSched
    }
})