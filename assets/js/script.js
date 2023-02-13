// establish js variables that link to the correct html item. the biggest thing we will target will be the main element wwith "quizbox" id, to populate with each set of question/answers during the actual quiz. secondly, we want our button in the quizbox to have an event listener to start the game when clicked. 3rd, we want to target the h3 in the div in the header with id "time" where we will populate "Time: " with however ever many seconds there are, based on the variable storing the countdown (which can be affected by getting a question right or wrong)
var quizBox = document.querySelector("#quizbox");
var startQuiz = document.querySelector("#start");
var timer = document.querySelector("#timer");
var problem = document.querySelector("#problem");
var scoreBoard = document.querySelector("#recent-scores");
var scoreCheck = document.querySelector("#score-refresh");
const record = {};
user = "";
var contents;

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
    q: "how do i add my newly made element to what i want to be its parent element",
    1: {
        a: "parentElement.appendchild(newlyMadeEl)",
        isTrue: true,
    },
    2: {
        a: "you can't do that",
        isTrue: false,
    },
    3: {
        a: "use the .pop() method",
        isTrue: false,
    },
    4: {
        a: "",
        isTrue: false,
    },
};
const q7 = {
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
const q8 = {
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
const q9 = {
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
const q10 = {
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


var timerInterval; //declaring outside of takeQuiz so that i can stop the timer from within getQuestions if i run out of questions
var timeLeft = 100; //initialize variable for timer
var score = 0;  // will hold the score if the user finishes the test before the time runs out
var questionList = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
// console.log(q1[1].isTrue);

function getQuestions(index) {
    currentQuestion = questionList[index];
    problem.textContent = currentQuestion.q;
    answerList = document.createElement("ol");
    var a1 = currentQuestion[1].a; //set variable to log each answer value for the current question
    var a2 = currentQuestion[2].a;
    var a3 = currentQuestion[3].a;
    var a4 = currentQuestion[4].a;
    quizBox.appendChild(answerList); // dynamically create ordered list that will be placed in the the quizbox area 
    answer1 = document.createElement("li") // create list item that will populate ol
    answer1.textContent = a1; // set a1 to take the 1st li spot because then the numbers of the ol will match up with the answer #
    answerList.appendChild(answer1);  //now that it's created we want to actually append it to the list
    answer2 = document.createElement("li") //do the exact same thing for questions 2-3
    answer2.textContent = a2;
    answerList.appendChild(answer2);
    answer3 = document.createElement("li")
    answer3.textContent = a3;
    answerList.appendChild(answer3);
    answer4 = document.createElement("li")
    answer4.textContent = a4;
    answerList.appendChild(answer4);
    response = addEventListener("keydown", function(event) { // wait for user to type a key 1-4 to answer
        response = event.key; //record the value of that key
        if (response > 0 && response <= 4) { //if the key pressed is one of the possible answers (keys 1-4) then invoke getResults
            getResults(response, currentQuestion);
            index ++;
        }
        if (index < questionList.length && timeLeft > 0) {
             // this will let me iterate through all the questions but with more control than a for loop
            answerList.remove(); // remove the ol for the current question set so that the next question set isn't just lumped in with the current set.
            getQuestions(index); // recursion ftw! if current question was answered, the index is incrememnted and recalling the function will repopulate the question area but with the next question/answer set
        } else if (index == questionList.length && timeLeft > 0) { 
            score = timeLeft;
            clearInterval(timerInterval);
            newScore(score, user);
            scoreChecker();
            // this.alert('you did ok i guess');
            // checker();
        };  
    });
    
};

function getResults(response, index) { //takes filtered response from user along with index of question object
    // console.log(response);
    result = (index[response].isTrue); 
    // console.log(result);
    if (result === false) {timeLeft = timeLeft - 5}; //if answer was wrong and boolean is false then timeleft loses 5 seconds
    return;
};
function newScore(score, user) {
        console.log(score + user);
        record.user = user;
        record.score = score;
        window.localStorage.setItem("record", JSON.stringify(record));
        console.log(record.user); 
        index = 0;     
        return;        
};

function scoreChecker() {
    // alert("let's check out the scoreboard");
    window.location.href ="https://jdr8888.github.io/dynamic-coding-quiz/assets/scoreboard.html";
    

};


function getMyData() {
    nextScore = scoreBoard.appendChild(document.createElement("li"));
    console.log(scoreBoard);
    var storage = localStorage.getItem("record");
    var contents = JSON.parse(storage);
    var user = contents.user;
    var score = contents.score;
    nextScore.textContent = user + " : " + score;
};

function takeQuiz() {
    alert("welcome to the quiz! follow the prompts and if you pass you will automatically be taken to the scoreboard page, if not you will be yelled at.")
    user = prompt("please put your initals or name to begin quiz", 'aaa');
    startQuiz.setAttribute("style","display:none");
    index = 0;
    timer.textContent = ""; //clear the text in the timer area 
    timer.textContent = "Time: " + timeLeft + "s";  //populate the timer area with "time" and how many seconds remain
    alert("answer a question by pressing keys corresponding to answer # (1-4)");
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent ="Time: " +timeLeft + "s"; 
        
    if(timeLeft <= 0) {clearInterval(timerInterval); //
        problem.textContent = "Time's up and you lost! wow."; 
        answerList.textContent = "";
    };

    
    }, 1000); //step-size = 1000ms (1s)

    //timer has started counting down, and with index set to 0 i will generate the question/answer sets using getQuestions() function with index = 0 (so that i know to start with the first question from my array)
    getQuestions(index);

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
