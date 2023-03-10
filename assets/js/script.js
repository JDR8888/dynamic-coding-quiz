// initiate necessary variables
var quizBox = document.querySelector("#quizbox"); //where the quiz content will be dynamically added
var startQuiz = document.querySelector("#start"); //start button
var timer = document.querySelector("#timer"); // area to show timer
var problem = document.querySelector("#problem"); // the heading element of the quizbox to display the questions - answers will be placed into a generated ordered list each time function getQuestions is called
var scoreBoard = document.querySelector("#recent-scores"); // to target the area of the scoreboard html page to populate the new score
var scoreCheck = document.querySelector("#score-refresh"); //button to update scoreboard page by pulling data from local storage
const record = {}; //will store the object to be saved in local storage
user = ""; // will store the user's prompted initials/name
var contents; //a variable to help w/ steps from JSON to object, etc.
var answer; 

// each question set is an object containing the question, each answer, and whether each answer is true or false
const q1 = {
    q: "HTML stands for what?",
    1: {
        a: "highly tested machine language",
        isTrue: false, 
    },
    2: {
        a: "hypertext markup language",
        isTrue: true,
    },
    3: {
        a: "heavy metal laser targets",
        isTrue: false,
    },
    4: {
        a: "hotmail.com",
        isTrue: false,
    },
};
const q2 = {
    q: "what is not a primitive data type?",
    1: {
        a: "object",
        isTrue: true,
    },
    2: {
        a: "boolean",
        isTrue: false,
    },
    3: {
        a: "string",
        isTrue: false,
    },
    4: {
        a: "number",
        isTrue: false,
    },
};
const q3 = {
    q: "how can you tell if your query is for the ID of an element?",
    1: {
        a: "there should be a # symbol at the start of the id name",
        isTrue: true,
    },
    2: {
        a: "all IDs say id in the name",
        isTrue: false,
    },
    3: {
        a: "spidey-sense",
        isTrue: false,
    },
    4: {
        a: "IDs have a . at the beginning of the id name",
        isTrue: false,
    },
};
const q4 = {
    q: "how can i find out if a number is even using JavaScript code?",
    1: {
        a: "ask chatGPT to do it for you",
        isTrue: false,
    },
    2: {
        a: "if % (modulo) 2 = 0 there is no remainder when dividing the number by 2 which means it is even",
        isTrue: true,
    },
    3: {
        a: "ask your mum",
        isTrue: false,
    },
    4: {
        a: "use a for loop to iterate from 1 to your number with stepsize = 2 and if you reach your number it is even",
        isTrue: false,
    },
};
const q5 = {
    q: "what method can i use to add something to the beginning of an array?",
    1: {
        a: "use the .unshift() method",
        isTrue: true,
    },
    2: {
        a: "use the .shift() method",
        isTrue: false,
    },
    3: {
        a: "use the .pop() method",
        isTrue: false,
    },
    4: {
        a: "captains.log(add.front() )",
        isTrue: false,
    },
};
const q6 = {
    q: "for an empty object, I can initiate a variable equal to what?",
    1: {
        a: "''",
        isTrue: false,
    },
    2: {
        a: "[]",
        isTrue: false,
    },
    3: {
        a: "<>",
        isTrue: false,
    },
    4: {
        a: "{}",
        isTrue: true,
    },
};
const q7 = {
    q: "what sort of data/info does a window.confirm() return?",
    1: {
        a: "a string based on user input",
        isTrue: false,
    },
    2: {
        a: "cookies",
        isTrue: false,
    },
    3: {
        a: "a boolean value",
        isTrue: true,
    },
    4: {
        a: "an object",
        isTrue: false,
    },
};
const q8 = {
    q: "what does myArray.pop() do?",
    1: {
        a: "removes the last item of the array",
        isTrue: true,
    },
    2: {
        a: "pops an item into the array at the end",
        isTrue: false,
    },
    3: {
        a: " hmmm...42",
        isTrue: false,
    },
    4: {
        a: "creates a popup window that displays the index of the array listed in the parentheses",
        isTrue: false,
    },
};
const q9 = {
    q: "you look a bit rough today so here's a freebie",
    1: {
        a: "this is the right answer, so if you can read then you should be set",
        isTrue: true,
    },
    2: {
        a: "i sweat to god if you pick this option just to spite me...",
        isTrue: false,
    },
    3: {
        a: "OMG why are you still reading the answers you already saw the right answer please stop oh god",
        isTrue: false,
    },
    4: {
        a: "this is the fourth option, also incorrect, like 2 and 3.",
        isTrue: false,
    },
};
// const q10 = {
//     q: "what does CSS stand for?",
//     1: {
//         a: "Cast-stating type sheets",
//         isTrue: false,
//     },
//     2: {
//         a: "capsizing centipedes",
//         isTrue: false,
//     },
//     3: {
//         a: "cascading stylesheets",
//         isTrue: true,
//     },
//     4: {
//         a: "c(ascadia) s(national) s(park)",
//         isTrue: false,
//     },
// };

var timerInterval; //declaring outside of takeQuiz so that i can stop the timer from within getQuestions if i run out of questions
var timeLeft = 35; //initialize variable for timer
var score = 0;  // will hold the score if the user finishes the test before the time runs out
var questionList = [q1, q2, q3, q4, q5, q6, q7,q8,q9];
var currentQuestion;
var answerList;

function takeQuiz() {
    alert("welcome to the quiz! follow the prompts and if you pass you will automatically be taken to the scoreboard page, if not you will be yelled at.")
    user = prompt("please put your initals or name to begin quiz", 'aaa');
    startQuiz.setAttribute("style","display:none"); // get rid of the button to make space in the quizbox area
    index = 0;
    timer.textContent = ""; //clear the text in the timer area 
    timer.textContent = "Time: " + timeLeft + "s";  //populate the timer area with "time" and how many seconds remain
    alert("answer a question by clicking the one of the options");
    timerInterval = setInterval(function() { // start the timer
        timeLeft--;
        timer.textContent ="Time: " +timeLeft + "s"; 
        
    if(timeLeft <= 0) {clearInterval(timerInterval); //
        problem.textContent = "Time's up and you lost! not surprising."; 
        answerList.remove();
    };
  
    }, 1000); //step-size = 1000ms (1s)
    getQuestions(index); //now that timer is going, call the getQuestions function
};


function getQuestions(index) { //called from takeQuiz
    currentQuestion = questionList[index]; //takes question form array of questions based on index
    problem.textContent = currentQuestion.q; //changes quizbox heading to display current question text
    answerList = document.createElement("div"); //generates ordered list to display answer options
    var a1 = currentQuestion[1].a; //set variable to log each answer value for the current question
    var a2 = currentQuestion[2].a;
    var a3 = currentQuestion[3].a;
    var a4 = currentQuestion[4].a;
    quizBox.appendChild(answerList); // create buttons that will be placed in the the quizbox area 
    answer1 = document.createElement("button"); // create list item that will populate the div
    answer1.textContent = a1;
    var v1 = currentQuestion[1].isTrue; //set variable to log each true/false value 
    var v2 = currentQuestion[2].isTrue;
    var v3 = currentQuestion[3].isTrue;
    var v4 = currentQuestion[4].isTrue; 
    answerList.appendChild(answer1);  //now we want to append it to the list
    var answer2 = document.createElement("button") //do the exact same thing for questions 2-3
    answer2.textContent = a2;
    answerList.appendChild(answer2);
    var answer3 = document.createElement("button")
    answer3.textContent = a3;
    answerList.appendChild(answer3);
    var answer4 = document.createElement("button")
    answer4.textContent = a4;
    answerList.appendChild(answer4);
    // tried to take care of getting answers with a single event listener for keypress but could not make it work. when doing event listeners for buttons it would skip them and go straight to incrementing index repeatedly, so i put the same set of code for each event listener so that it only triggers once we get one of the four buttons clicked 
    answer1.addEventListener("click", function() {
        answer = v1;
        if (answer === false) {
            timeLeft = timeLeft - 5;
            index ++;
            if (index == questionList.length) {
                clearInterval(timerInterval);
                score = timeLeft;
                newScore(score, user);
                scoreChecker();
            } else {
                answerList.remove();
                getQuestions(index);
            };
        } else if (answer === true) {

            index ++;
            if (index == questionList.length) {
                clearInterval(timerInterval);
                score = timeLeft;
                newScore(score, user);
                scoreChecker();
            } else {
                answerList.remove();
                getQuestions(index);
            };
        };
    });

    answer2.addEventListener("click", function() {
        answer = v2;
        if (answer === false) {
            timeLeft = timeLeft - 5;
            index ++;
            if (index == questionList.length) {
                clearInterval(timerInterval);
                score = timeLeft;
                newScore(score, user);
                scoreChecker();
            } else {
                answerList.remove();
                getQuestions(index);
                };
        } else if (answer === true) {
            index ++;
            if (index == questionList.length) {
                clearInterval(timerInterval);
                score = timeLeft;
                newScore(score, user);
                scoreChecker();
            } else {
                answerList.remove();
                getQuestions(index);
            };
        };
    });

    answer3.addEventListener("click", function() {
        answer = v3;
        if (answer === false) {
            timeLeft = timeLeft - 5;
            index ++;
            if (index == questionList.length) {
                clearInterval(timerInterval);
                score = timeLeft;
                newScore(score, user);
                scoreChecker();
            } else {
                answerList.remove();
                getQuestions(index);
                };
        } else if (answer === true) {
            console.log(index);
            index ++;
            if (index == questionList.length) {
                clearInterval(timerInterval);
                score = timeLeft;
                newScore(score, user);
                scoreChecker();
            } else {
                answerList.remove();
                getQuestions(index);
            };
        };

    });

    answer4.addEventListener("click", function() {
        answer = v4;
        if (answer === false) {
            timeLeft = timeLeft - 5;
            index ++;
            if (index == questionList.length) {
                clearInterval(timerInterval);
                score = timeLeft;
                newScore(score, user);
                scoreChecker();
            } else {
                answerList.remove();
                getQuestions(index);
                };
        } else if (answer === true) {
            index ++;
            if (index == questionList.length) {
                clearInterval(timerInterval);
                score = timeLeft;
                newScore(score, user);
                scoreChecker();
            } else {
                answerList.remove();
                getQuestions(index);
            };
        };
    });  
};


function newScore(score, user) { //put user name/intials and score into local storage
        record.user = user;
        record.score = score; // save to local storage with JSON
        window.localStorage.setItem("record", JSON.stringify(record));
        index = 0;     
        return;        
};

function scoreChecker() { // take the user to scoreboard page when quiz is complete
    window.location.href ="https://jdr8888.github.io/dynamic-coding-quiz/assets/scoreboard.html";
};

function getMyData() { //called with event listener (button on scoreboard page) 
    nextScore = scoreBoard.appendChild(document.createElement("li"));
    var storage = localStorage.getItem("record"); // get saved score/name from local web storage
    var contents = JSON.parse(storage); //turn back into an object
    var user = contents.user; // target the values and put the values on the scoreboard
    var score = contents.score;
    nextScore.textContent = user + " : " + score;
};


// putting each event-listener in an if statement since they are for different pages - if a button does not exist in the current DOM (i.e. if it is on the other page) it will be considered null which means it will evaluate to false and throw an error. with each event-listener in an if statement, each button's event listener will only try to "listen" when the button actually exists on the page 
if (startQuiz) {
    startQuiz.addEventListener("click", function(){
    takeQuiz();
}
);
};

if (scoreCheck) {
    scoreCheck.addEventListener("click", function() {
    getMyData();
}
);
};
