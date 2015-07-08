var langs = [
      {name: "MeteorJS", imageName: "meteor"},
      {name: "NodeJS", imageName: "nodejs"},
      {name: "AngularJS", imageName: "angularjs"},
      {name: "JavaScript", imageName: "javascript"},
      {name: "Ruby/Rails", imageName: "ruby"}
  ];
var types = [
      {name: "Post/Tutorial", colorClass: "post"},
      {name: "Library/Documentation", colorClass: "lib"},
      {name: "Services", colorClass: "service"}
];

if (Meteor.isClient) {
  Session.setDefault("selectedLanguage", "All");
  Session.setDefault("selectedType", "All");

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

    languages: langs,
    types: types

  });

  Template.body.events({
    "submit .create-entry": function(event) {
      var title = event.target.title.value;
      var description = event.target.description.value;
      var type = event.target.type.value;
      var language = event.target.language.value;
      var url = event.target.url.value;

      Entries.insert({
        title: title,
        type: type,
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
    },

    "click .filter-type": function(event) {
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

UI.registerHelper('isSelectedType', function(options) {
  var name = options.hash.name;
  var selectedType = Session.get("selectedType");

  if (name == selectedType) {
    return 'selected';
  } else {
    return 'not-selected';
  }

});

UI.registerHelper('isSelectedLanguage', function(options) {
  var name = options.hash.name;
  var selectedLanguage = Session.get("selectedLanguage");

  if (name == selectedLanguage) {
    return 'selected';
  } else {
    return 'not-selected';
  }

});

UI.registerHelper('typeColor', function(options) {
  var type = options.hash.type;

  for(var i = 0; i < types.length; i++) {
    if (type == types[i].name) {
      return types[i].colorClass;
    }
  } 
});