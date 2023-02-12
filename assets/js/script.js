// establish js variables that link to the correct html item. the biggest thing we will target will be the main element wwith "quizbox" id, to populate with each set of question/answers during the actual quiz. secondly, we want our button in the quizbox to have an event listener to start the game when clicked. 3rd, we want to target the h3 in the div in the header with id "time" where we will populate "Time: " with however ever many seconds there are, based on the variable storing the countdown (which can be affected by getting a question right or wrong)
var quizBox = document.querySelector("#quizbox");
var startQuiz = document.querySelector("#start");
var timer = document.querySelector("#timer");
var problem = document.querySelector("#problem");

// make the question list as an array and the actual question sets will be nested objects

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
        a: "heavy metal taco logos",
        isTrue: false,
    } ,
};

const q2 = {
    q: "this is the question",
    1: {
        a: "this is the bloody answer so pick this answer goddammit",
        isTrue: true,
    },
    2: {
        a: "this is not the answer i swear to god if you pick this one you will make me physically ill",
        isTrue: false,
    },
    3: {
        a: "this is also false just pick the first one oh my god we told you the answer what are you doing with your life",
    },
};

const q3 = {
    q: "is this a question",
    1: {
        a: "bruh",
        isTrue: true,
    },
    2: {
        a: "just pick #1",
        isTrue: false,
    },
    3: {
        a: "i wish i had done arrays kinda but pick one that is the answer",
        isTrue: false,
    },
};



var timeLeft = 10; //initialize variable for timer
var score = 0; 
var questionList = [q1, q2, q3];
// console.log(q1[1].isTrue);

function getQuestions(index) {
    currentQuestion = questionList[index];
    problem.textContent = currentQuestion.q;
    answerList = document.createElement("ol");
    console.log(currentQuestion.q);
    var a1 = currentQuestion[1].a; //set variable to log each answer value for the current question
    var a2 = currentQuestion[2].a;
    var a3 = currentQuestion[3].a;
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
    response = addEventListener("keydown", function(event) { // wait for user to type a key 1-4 to answer
        response = event.key; //record the value of that key
        console.log(response);
        if (response > 0 && response < 4) { //if the key pressed is one of the possible answers (keys 1-4) then invoke getResults
            getResults(response, currentQuestion);
        }
        if (index < questionList.length && timeLeft > 0) {
            index ++;
            answerList.remove(); // remove the ol for the current question set so that the next question set isn't just lumped in with the current set.
            getQuestions(index);
        } 
    });
    // if  (currentQuestion[response].isTrue === false) {timeLeft =-5};
};

function getResults(response, index) { //takes filtered response from user along with index of question object
    console.log(response);
    result = (index[response].isTrue); // takes the boolean value for the isTrue key for whatever answer the user selected
    console.log(result);
    if (result === false) {timeLeft = timeLeft - 5}; //if answer was wrong and boolean is false then timeleft loses 5 seconds
    return;
}

function takeQuiz() {
    startQuiz.setAttribute("style","display:none");

    timer.textContent = ""; //clear the text in the timer area 
    timer.textContent = "Time: " + timeLeft + "s";  //populate the timer area with "time" and how many seconds remain
    alert("answer a question by pressing keys corresponding to answer # (1-4)");
    var timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent ="Time: " +timeLeft + "s"; 
        
    if(timeLeft <= 0) {clearInterval(timerInterval);
        problem.textContent = "Time's up!!!!!"; 
        answerList.textContent = "";
    }
    
    }, 1000); //step-size = 1000ms (1s)
    index = 0;
    getQuestions(index);

}


startQuiz.addEventListener("click", function(){
    takeQuiz();
}
);