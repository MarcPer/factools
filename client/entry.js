Template.entry.events({
  "click .delete-entry": function() {
    Meteor.call("deleteEntry", this._id);
    return false;
  }
});