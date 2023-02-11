// establish js variables that link to the correct html item. the biggest thing we will target will be the main element wwith "quizbox" id, to populate with each set of question/answers during the actual quiz. secondly, we want our button in the quizbox to have an event listener to start the game when clicked. 3rd, we want to target the h3 in the div in the header with id "time" where we will populate "Time: " with however ever many seconds there are, based on the variable storing the countdown (which can be affected by getting a question right or wrong)
var quizBox = document.querySelector("#quizbox");
var startQuiz = document.querySelector("#start");
var timer = document.querySelector("#timer");

// make the question list as an array and the actual question sets will be nested objects

const q1 = {
    q: "HTML stands for what?",
    a1: {
        a: "highly tested machine language",
        isTrue: false, 
    },
    a2: {
        a: "hypertext markup language",
        isTrue: true,
    },
    a3: {
        a: "heavy metal taco logos",
        isTrue: false,
    } ,
};

const q2 = {
    q: "this is the question",
    a1: {
        a: "this is the bloody answer so pick this answer goddammit",
        isTrue: true,
    },
    a2: {
        a: "this is not the answer i swear to god if you pick this one you will make me physically ill",
        isTrue: false,
    },
    a3: {
        a: "this is also false just pick the first one oh my god we told you the answer what are you doing with your life",
    },
};

const q3 = {
    q: "is this a question",
    a1: {
        a: "bruh",
        isTrue: true,
    },
    a2: {
        a: "just pick #1",
        isTrue: false,
    },
    a3: {
        a: "i wish i had done arrays kinda but pick one that is the answer",
        isTrue: false,
    },
};

console.log(q1.q);

var timeLeft = 30; //initialize variable for timer
var score = 0; 
var questionList = [q1, q2, q3];
 
function takeQuiz() {
    startQuiz.setAttribute("style","display:none");

    timer.textContent = ""; //clear the text in the timer area 
    timer.textContent = "Time: " + timeLeft + "s";  //populate the timer area with "time" and how many seconds remain
    var timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent ="Time: " +timeLeft + "s"; 
    
        loadQuestion(); //define: load question (plus each answer in a numbered list) on the page. eventlistener to wait for press of 1,2,3,or 4 --> event stored in var answer, and if object(q#)[answer][0] === false --> timeLeft -= 5. while questionList.length > 0, keep loading questions. otherwise keep loading questions.
    
    if(timeLeft === 0) {clearInterval(timerInterval);
        alert('pencils down! test is over!');
    }
    }, 1000); //step-size = 1000ms (1s)
    // 


}


startQuiz.addEventListener("click", function(){
    takeQuiz();
}
);