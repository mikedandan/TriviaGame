var quizBox = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});
//Questions and answers
var questions = [
  {
    question: "Who will win in a fight with Superman?",
    answers: ["Batman", "The Terminator", "Snoopy"],
    correctAnswer: "Batman",
    image:"assets/images/batman.gif"
  },
  {
    question: "You're 3rd place right now in a race. What place are you in when you pass the person in 2nd place?",
    answers: ["2nd", "1st", "last"],
    correctAnswer: "2nd",
    image:"assets/images/tenor.gif"
  },
  {
    question: "How many months have 29 days?",
    answers: ["2", "1", "all of them", "Depends if there's a leap year or not."],
    correctAnswer: "Depends if there's a leap year or not.",
    image:"assets/images/leapyear.jpg"
  },
  {
    question: "How many 0.5cm slices of breads can you cut from a whole bread that's 25cm long?",
    answers: ["1", "25", "39", "None of the above."],
    correctAnswer: "None of the above",
    image:"assets/images/bread.gif"
  }
];

//game functions
var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    quizBox.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      quizBox.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  //Game Over timer
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    quizBox.html('<h2>Out of Time!</h2>');
    quizBox.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    quizBox.append('<img src="assets/images/emoticono-rock-.gif' + questions[this.currentQuestion] + '" />');
    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  //results
  results: function() {
    clearInterval(timer);

    quizBox.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    quizBox.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    quizBox.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    quizBox.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    quizBox.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  //incorrect answer functions
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    quizBox.html('<h2>Nope!</h2>');
    quizBox.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    quizBox.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  //correct answer functions
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    quizBox.html('<h2>Correct!</h2>');
    quizBox.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  //game reset
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};