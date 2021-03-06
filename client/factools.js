Session.setDefault("selectedLanguage", "All");
Session.setDefault("selectedType", "All");
Meteor.subscribe("entries");
Meteor.subscribe("userData");

Template.body.helpers({
  entries: function () {
    var type = Session.get("type");
    var lang = Session.get("language");
    var query = {};
    if (type !== undefined) {
      query["type"] = type;
    }

    if (lang !== undefined) {
      query["language"] = lang;
    }
    
    return Entries.find(query);
  },

  currentUserprofilePicture: function() {
    var pictureUrl = Meteor.users.findOne({_id: Meteor.userId(), "services.google.picture": {$exists : true}},
     {fields: {'services.google.picture': 1}});
    if (pictureUrl) {
      return pictureUrl.services.google.picture;
    }

    return "";

  },

  languages: langs,
  types: types
});

Template.body.events({
  "submit .create-entry": function(event) {
    var entry = {title: event.target.title.value,
      description: event.target.description.value,
      type: event.target.type.value,
      language: event.target.language.value,
      url: event.target.url.value
    }

    Meteor.call("addEntry", entry);

    // Clear form
    event.target.title.value = "";
    event.target.description.value = "";
    event.target.language.value = "";
    event.target.url.value = "";

    // Prevent default form submit
    return false;
  },

  "click .filter-type": function(event) {
    if (Meteor.userId()) {
      console.log(Meteor.user());
    }

    var type = event.target.innerHTML;
    if (type === 'All') {
      Session.set("type", undefined);
    } else {
      Session.set("type", type);
    }
    Session.set("selectedType", type);
  },

  "click .filter-language": function(event) {
    var language = event.target.innerHTML;
    if (language === 'All') {
      Session.set("language", undefined);
    } else {
      Session.set("language", language);
    }
    Session.set("selectedLanguage", language);
  }

});