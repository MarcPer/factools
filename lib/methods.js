Meteor.methods({
  addEntry: function (entry) {
    entry.createdAt = new Date();
    Entries.insert(entry);
  },
  deleteEntry: function (entryId) {
    Entries.remove(entryId);
  }
});