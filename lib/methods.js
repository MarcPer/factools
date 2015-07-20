Meteor.methods({
  addEntry: function (entry) {
    entry.createdAt = new Date();

    if (Meteor.userId()) {
      var usr = Meteor.users.findOne({_id: Meteor.userId(), "services.google.picture": {$exists : true}},
       {fields: {'services.google.picture': 1}});
      if (usr) {
        entry.pictureUrl = usr.services.google.picture;
      }
    }

    Entries.insert(entry);
  },
  deleteEntry: function (entryId) {
    Entries.remove(entryId);
  }
});