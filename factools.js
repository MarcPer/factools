var langs = [
      {name: "MeteorJS", imageName: "meteor"},
      {name: "NodeJS", imageName: "nodejs"},
      {name: "AngularJS", imageName: "angularjs"},
      {name: "JavaScript", imageName: "javascript"},
      {name: "Ruby/Rails", imageName: "ruby"}
  ];

if (Meteor.isClient) {

  Template.body.helpers({
    entries: function () {
      return Entries.find({});
    },

    languages: langs,
    types: [
      {name: "Post/Tutorial"},
      {name: "Library/Documentation"},
      {name: "Services"}
    ]

  });

  Template.body.events({
    "submit .create-entry": function(event) {
      var title = event.target.title.value;
      var description = event.target.description.value;
      var language = event.target.language.value;
      var url = event.target.url.value;

      Entries.insert({
        title: title,
        description: description,
        language: language,
        url: url,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.title.value = "";
      event.target.description.value = "";
      event.target.language.value = "";
      event.target.url.value = "";

      // Prevent default form submit
      return false;
    },

    "click .delete-entry": function() {
      Entries.remove(this._id);
      return false;
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

UI.registerHelper('langImage', function(options) {
  var name = options.hash.name;

  for(var i = 0; i < langs.length; i++) {
    if (name == langs[i].name) {
      return '/img/' + langs[i].imageName + '-icon.png';
    }
  } 
});