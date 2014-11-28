TimesSchema = new SimpleSchema({
    endTime: {
        type: Date,
        label: "Endzeit"
    },
    startTime: {
        type: Date,
        label: "Startzeit",
        custom: function() {
            if (this.value >= this.field(this.endTime).value) {
                return "Startzeit darf nicht nach Endzeit liegen."
            }
        }
    },
    user: {
        type: String,
        label: "Mitarbeiter"
    }
})

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
    },
    times: {
        type: [TimesSchema],
        label: "Zeiten",
        optional: true
    }
    }
)

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
Schedules.attachSchema(SchedulesSchema)