Meteor.publish('entries', function() {
  return Entries.find();
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({"services.google.picture": {$exists : true}}, {fields: {'services.google.picture': 1}});
  } else {
    this.ready();
  }
});