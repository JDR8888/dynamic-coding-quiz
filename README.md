## Module 2 Challenge (Columbia Bootcamp)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-badges.svg)](https://forthebadge.com)

# Description
A two-page dynamic API quiz. Interact with the page to initiate a timed quiz that is dynamically generated onto the page via javascript - get a question wrong and watch the timer plummet 10 seconds! think you have what it takes to finish the quiz before the timer reaches 0 to get your score logged in the top 10? You can easily navigate to the scoreboard page with a consistent theme, that utilizes the power of local storage to remember your scores when you revisit the page if you've made the top ten list. 
This project was made completely from scratch utilizing knowledge learned in Columbia University's fullstack bootcamp. The project was put together with the following acceptance criteria:

GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score

The deployed page is: https://jdr8888.github.io/dynamic-coding-quiz

Interested in the code/approach? The approach here is:
1. question/answer sets are constructed as objects, containing the question as a string, and each of the 4 answers is a nested object containing both the answer's string and a boolean set to true or false, depending on whether the specific answer is correct. the names of all question sets are stored in an array to be cycled through during the quiz.
2. an event listener waits for the user to click on a button to start the quiz. This triggers the takeQuiz function which initiates a counter variable timeLeft (with some value set beforehand, in this case timer = 30) to start decrementing by 1 every 1000ms (i.e. with every second, the timer display is minus 1 second) and set to stop the game if the timer reaches zero. 
3. within that same function, we call a function called getQuestions; this function will dynamically change the html page by getting rid of the button used to start the quiz, and generating a new heading in the quizbox area that will display a question, along with an instantly-generated ordered list of the 4 answer choices for that specific question. this function includes an event listener to wait for the user to press a key to pick their answer. 
4. the key value of the response event is taken and filtered to ensure that the key pressed is one of the four choices (keys 1-4) and, if so, an additional function, getResults, is invoked. 
5. getResults will take the users response and analyze the boolean value for that response. if the value === false, the timeLeft variable has 5(seconds) subtracted from it. 
6. while getResults is analyzing the user's response from inside the getQuestions function, the index is incremented and recursion calls getQuestions from within itself, with the new index, which allows the quizbox to be repopulated by replacing the header text and creating a new ordered list in place of the previous one. 
7. if the user answers all of the questions (i.e. if the index counter reaches the length of the array of question objects) before the time runs out, the game is stopped and the score (equal to the value of the timeLeft variable) is saved in another variable (score)
8. the user receives a prompt to enter their initials. these are saved in the variable userID
9. the userID and score is added to an additional html page that can be navigated to from the main page.
10. the id/scores should be saved with local storage so that when a user logs into the site again, they can see previous scores

The github repo is https://github.com/JDR8888/dynamic-coding-quiz

Screenshot of the page:

![screenshot of project](/assets/screenshot-1.jpg)
![screenshot of project](/assets/screenshot-2.jpg)
![screenshot of project](/assets/screenshot-3.jpg)


# Installation
N/A
# Usage
N/A
# Credits
giphy.com; forthebadge.com; Columbia U;
# License
Please see the repo for license info