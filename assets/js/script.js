// establish js variables that link to the correct html item. the biggest thing we will target will be the main element wwith "quizbox" id, to populate with each set of question/answers during the actual quiz. secondly, we want our button in the quizbox to have an event listener to start the game when clicked. 3rd, we want to target the h3 in the div in the header with id "time" where we will populate "Time: " with however ever many seconds there are, based on the variable storing the countdown (which can be affected by getting a question right or wrong)
var quizBox = document.querySelector("#quizbox");
var startQuiz = document.querySelector("#start");
var timer = document.querySelector("#timer");
var problem = document.querySelector("#problem");

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
    },
}


var timeLeft = 30; //initialize variable for timer
var score = 0;  // will hold the score if the user finishes the test before the time runs out
var questionList = [q1, q2, q3, q4];
// console.log(q1[1].isTrue);

function getQuestions(index) {
    currentQuestion = questionList[index];
    problem.textContent = currentQuestion.q;
    answerList = document.createElement("ol");
    console.log(currentQuestion.q);
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
        console.log(response);
        if (response > 0 && response < 5) { //if the key pressed is one of the possible answers (keys 1-4) then invoke getResults
            getResults(response, currentQuestion);
        }
        if (index < questionList.length && timeLeft > 0) {
            index ++; // this will let me iterate through all the questions but with more control than a for loop
            answerList.remove(); // remove the ol for the current question set so that the next question set isn't just lumped in with the current set.
            getQuestions(index); // recursion ftw! if current question was answered, the index is incrememnted and recalling the function will repopulate the question area but with the next question/answer set
        } 
        
    });

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
        
    if(timeLeft <= 0) {clearInterval(timerInterval); //
        problem.textContent = "Time's up!!!!!"; 
        answerList.textContent = "";
    };
    // if (index === questionList.length) {
    //     score = timeLeft;
    //     clearInterval(timerInterval);
    //     console.log(score);
    // };
    }, 1000); //step-size = 1000ms (1s)
    index = 0;
    getQuestions(index);

}


startQuiz.addEventListener("click", function(){
    takeQuiz();
}
);