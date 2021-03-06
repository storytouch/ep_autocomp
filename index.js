var eejs = require('ep_etherpad-lite/node/eejs'),
settings = require('ep_etherpad-lite/node/utils/Settings');

exports.eejsBlock_dd_view = function (hook_name, args, cb) {
  args.content = args.content + "<li><a href='#' onClick='$(\"#options-autocomp\").click();'>Table Of Contents WhereAmI-1 </a></li>"; /*what do I need this for, how is it called?*/
  return cb();
}

exports.eejsBlock_mySettings = function (hook_name, args, cb) {
  var checked_state = 'unchecked';
  if(settings.ep_autocomp){
    if (settings.ep_autocomp.disable_by_default === true){
      checked_state = 'unchecked';
    }else{
      checked_state = 'checked';
    }
  }
  args.content = args.content + eejs.require('ep_autocomp/templates/autocomp_entry.ejs', {checked : checked_state});
  return cb();
}

exports.clientVars = function (hook, context, cb) {

  var enabled = settings.ep_autocomp ? settings.ep_autocomp.enabled : true;
  var hardcodedSuggestions = settings.ep_autocomp ? settings.ep_autocomp.hardCodedSuggestions : [];
  var regexToFind = settings.ep_autocomp ? settings.ep_autocomp.regexToFind : [/(\S+)/g];
  var suggestWordsInDocument = settings.ep_autocomp ? settings.ep_autocomp.suggestWordsInDocument : false;
  var updateFromSourceObject = settings.ep_autocomp ? settings.ep_autocomp.updateFromSourceObject : false;
  var caseSensitiveMatch = settings.ep_autocomp ? settings.ep_autocomp.caseSensitiveMatch : true;

  return cb({
    "ep_autocomp": {
      enabled: enabled,
      hardcodedSuggestions: hardcodedSuggestions,
      regexToFind: regexToFind,
      suggestWordsInDocument: suggestWordsInDocument,
      updateFromSourceObject: updateFromSourceObject,
      caseSensitiveMatch: caseSensitiveMatch
    }
  });
};
