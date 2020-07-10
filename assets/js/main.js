var userPrompt = '';
var botPrompt = '[[b;#333;transparent]Echo][[;#333;transparent] ·] ';
var url = 'https://4642df6207b3.ngrok.io/chat';

set_size();

var num_candidates = 10000;
var dialog = ["Hi.."];
var persona = [];
var topic = "";

// var num_candidates = $('input[name="num_candidates"]:checked').val();
// clear persona, topic
// update persona

$('input[type=radio][name=num_candidates]').change(function() {
  console.log(this.value);
  num_candidates = parseInt(this.value);
});


$("#persona_button").click(function(e){
  var new_persona = $('#persona_field').val();
  if (new_persona.length == 0){
    persona = []
  }else {
    persona = new_persona.split(";").slice(0, 4); // max first 4 sentences
  }
  console.log(persona);
  // persona.push($('#persona_field').val());
  // if (persona.length > 4) {
  //   persona.shift()
  // }

});


$("#topic_button").click(function(e){
  console.log($('#topic_field').val());
  topic = $('#topic_field').val();
});


$('.terminal').terminal(function(command, term) {
  var reply = null;
  if (command.length == 0) {
    return;
  }
  else {
    term.pause();
    dialog.push(command);
    get_response(term);
  }
}, {
  //prompt: '[[gb;#0c0;#000000]>_] ',
  name: 'Echo',
  onResize: set_size,
  history: false,
  greetings: null,
  onInit: function(term) {
    term.set_prompt('[[;#0074D9;transparent]][[b;#333;transparent]' + userPrompt + '][[;#0074D9;transparent]>] '); // default promptName: YOU
    header(term); // display header/logo
    botInit(term); // initialize bot 1st conversation
  },
  onClear: function(term) {
    header(term);
  },
  onBlur: function(term) {
    // call function to start counting the timer
  },
  onFocus: function(term) {
    // call function to mention the away timer
  },
  onRPCError: function(term) {},
  processRPCResponse: function(object) {},
  exceptionHandler: function(e) {
    console.log("Exception handled: " + e);
  },
});


function get_response(term) {
  console.log(num_candidates);
  console.log(persona);
  console.log(topic);
  console.log(dialog);
  axios.post(url, {
      num_candidates: num_candidates,
      persona: persona,
      topic: topic,
      dialog: dialog
  })
  .then(function (response) {
      console.log(response);
      
      num_candidates = response.data.num_candidates;
      topic = response.data.topic;
      persona = response.data.persona;
      dialog = response.data.dialog;
      botRespond(term, dialog[dialog.length-1]);
      term.resume();
  })
}


function set_size() {
  var height = $(window).height();
  var width = $(window).width();
  $('.inner-wrapper').height(height);
  $('.inner-wrapper').width(width);
  $('.terminal').height(height - 50);
}


function botRespond(term, text) {
  term.echo(botPrompt + '[[;#666;transparent]' + text + ']');
}


function header(term) {
  term.echo(
    '[[b;#333;transparent]' +
    ' _____                 \n' +
    '|       ___ |      ___ \n' +
    '|----- |   ||---- |   |\n' +
    '|__ __ |___||    ||___|\n' +
    ']' +
    '[[;#666;transparent]A Chatbot from My PhD Research.]\n\n'
  );
}


function botInit(term) {
  botRespond(term, 'Hi..');
}


function set_persona() {
  console.log("Setting persona...")
}


function set_topic() {
  console.log("Setting topic...")
}