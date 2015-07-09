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