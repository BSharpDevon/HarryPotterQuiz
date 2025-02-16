// constructor to hold house info that can be accessed when buttons are clicked.
class hogwartsHouses {
  constructor(
    house,
    founder,
    backgroundColor,
    textColor,
    labelTextColor,
    radioAnswersTextColor,
    alertMotto,
    consoleLog
  ) {
    // Constructor
    this.house = house;
    this.founder = founder;
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;
    this.labelTextColor = labelTextColor;
    this.radioAnswersTextColor = radioAnswersTextColor;
    this.alertMotto = alertMotto;
    this.consoleLog = consoleLog;
  }
  //The house motto
  showAlert() {
    alert(this.alertMotto);
  }

  //console house message
  showConsoleMessage() {
    console.log(
      `The founder of ${this.house} was ${this.founder}. ${this.alertMotto}`
    );
  }

  //change the background colours when user selects a house
  changeBackground() {
    const changeBackgroundColor = document.getElementsByClassName(
      "backgroundColor"
    );

    // Retrieves classes from the dom needed to change the background colours.
    const quizQuestions = document.getElementsByClassName("quizQuestions");
    // retrives questions' text from the dom
    const questionLabel = document.getElementsByClassName("questionLabel");
    // Loops through each div with a 'backgroundColor' class and changes the background and text color.
    for (let i = 0; i < changeBackgroundColor.length; i++) {
      changeBackgroundColor[i].style.backgroundColor = this.backgroundColor;
      changeBackgroundColor[i].style.color = this.textColor;
    }
    // Loops through each div with a 'quizQuestions' class and changes the background and text color.
    for (let i = 0; i < quizQuestions.length; i++) {
      quizQuestions[i].style.backgroundColor = this.backgroundColor;
      quizQuestions[i].style.color = this.textColor;
    }
    // Loops through each div with a 'questionLabel' class and changes the background and text color.
    for (let i = 0; i < questionLabel.length; i++) {
      questionLabel[i].style.color = this.labelTextColor;
    }
    const radioAnswersText = document.getElementsByClassName("radioAnswers");
    // Loops through each div with a 'radionAnswers' class and changes the background and text color.
    for (let i = 0; i < radioAnswersText.length; i++) {
      radioAnswersText[i].style.color = this.radioAnswersTextColor;
    }
  }
}

//Gryffindor house info
const gryffindor = new hogwartsHouses(
  "Gryffindor",
  "Godric Gryffindor",
  "#740001",
  "white",
  "white",
  "black",
  "You might belong in Gryffindor, where dwell the brave at heart, their daring, nerve, and chivalry set Gryffindors apart."
);

//Hufflepuff house info
const hufflepuff = new hogwartsHouses(
  "Hufflepuff",
  "Helga Hufflepuff",
  "#FDB913",
  "black",
  "black",
  "black",
  "Hufflepuff: Hard Work, dedication, patience, loyalty."
);

//Ravenclaw house info
const ravenclaw = new hogwartsHouses(
  "Ravenclaw",
  "Rowena Ravenclaw",
  "#0E1A40",
  "white",
  "white",
  "black",
  "Ravenclaw: Wit beyond measure, is man’s greatest treasure."
);

//Slytherin house info
const slytherin = new hogwartsHouses(
  "Slytherin",
  "Salazar Slytherin",
  "#0D6217",
  "white",
  "white",
  "black",
  "Or perhaps in Slytherin, you'll make your real friends, those cunning folk use any means, to achieve their ends."
);

// Function to change background color, text in alert and text in console log, depending on house button clicked.
function selectHouse(house) {
  house.changeBackground();
  house.showAlert();
  house.showConsoleMessage();
}

const declareHouse = document.getElementById("declareHouse");

// Start button event listener
document.getElementById("startQuiz").addEventListener("click", function () {
  declareHouse.classList.remove("show");
  setTimeout(() => {
    declareHouse.style.display = "none";
    questions[0].style.display = "flex";
    setTimeout(() => questions[0].classList.add("show"), 20);
  }, 500);
});

const gryffindorOption = document
  .getElementById("gryffindorOption")
  .addEventListener("click", function () {
    selectHouse(gryffindor);
  });

const slytherinOption = document
  .getElementById("slytherinOption")
  .addEventListener("click", function () {
    selectHouse(slytherin);
  });

const ravenclawOption = document
  .getElementById("ravenclawOption")
  .addEventListener("click", function () {
    selectHouse(ravenclaw);
  });

const hufflepuffOption = document
  .getElementById("hufflepuffOption")
  .addEventListener("click", function () {
    selectHouse(hufflepuff);
  });

const questions = Array.from(document.getElementsByClassName("quizQuestions"));
const resultsDiv = document.getElementById("quizScores");

let currentIndex = 0;

function showNextQuestion(currentIndex) {
  if (currentIndex < questions.length - 1) {
    // hide current question
    questions[currentIndex].classList.remove("show");
    setTimeout(() => {
      questions[currentIndex].style.display = "none";

      let nextIndex = currentIndex + 1;
      questions[nextIndex].style.display = "flex";
      setTimeout(() => {
        questions[nextIndex].classList.add("show");
        questions[nextIndex].classList.add("fade-in");
      }, 50);
    }, 500);
    //If it is the last question check results
  } else {
    questions[currentIndex].style.display = "none";
    resultsDiv.style.display = "flex";
    setTimeout(() => {
      resultsDiv.classList.add("show");
      resultsDiv.classList.add("fade-in");
    }, 50);
  }
}

const correctAnswers = {
  questionOneAnswers: "Marauder's Map",
  questionTwoAnswers: "Thestral",
  questionThreeAnswers: "Aparecium",
  questionFourAnswers: "Bathilda Bagshot",
  questionFiveAnswers: "Vault 713",
  questionSixAnswers: "Crookshanks",
  questionSevenAnswers: "Hogwarts",
  questionEightAnswers: "Moaning Myrtle",
  questionNineAnswers: "James Potter",
  questionTenAnswers: "Kingsley Shacklebolt"
};

let housePoints = 0; // A place to store the house points

function checkAllResults() {
  console.log("Checking results...");

  // Access the correctAnswers object to check the questions and answers.
  Object.keys(correctAnswers).forEach((question) => {
    // checks all the answers for the selected question
    const selectedAnswer = document.querySelector(
      `input[name="${question}"]:checked`
    );

    if (selectedAnswer) {
      if (selectedAnswer.value === correctAnswers[selectedAnswer.name]) {
        housePoints += 20; // Increase score by 20 for correct answer
      } else {
        housePoints++; // Increment score by 1 for each attempt
      }
    }
  });

  // Define message based on score range
  let resultsMessage;
  if (housePoints === 200) {
    resultsMessage =
      "Merlin’s beard! You’re basically the Chosen One. Give yourself a pat on the back for sheer brilliance. ✨";
  } else if (housePoints >= 150) {
    resultsMessage =
      "Blimey, you’re giving Hermione a run for her money! Not quite a perfect score, but definitely Prefect material. 📚";
  } else if (housePoints >= 100) {
    resultsMessage =
      "Mmm... you’re hovering somewhere between a Weasley twin prank and a decent O.W.L. Keep at it, Hogwarts student! 🏆";
  } else if (housePoints >= 50) {
    resultsMessage =
      "Yikes! Even Neville in first year had better luck. Did you take a Bludger to the head or something? Try again, mate. 🧹";
  } else {
    resultsMessage =
      "Are you sure you’re not a Squib? Even Gilderoy Lockhart might have done better. Time to hit the books, love. 📖✨";
  }

  console.log(`Your total score is: ${housePoints}, ${resultsMessage}`);

  // Display final score
  const finalScore = document.getElementById("finalScoreSection");
  finalScore.textContent = `You scored ${housePoints} out of 200. ${resultsMessage}`;
}

// Event listeners for all radio buttons
questions.forEach((question, index) => {
  const quizQuestionID = question.id;
  const radioButtons = question.querySelectorAll('input[type="radio"]');

  // Stores the value of the answered question
  let lastAnswerSelected = null;

  // for each radio button perform this function
  radioButtons.forEach((radioButton) => {
    // Add event listeners, and when they are clicked perform one of the functions below:
    radioButton.addEventListener("click", () => {
      // Gets the buttons(div around the labels) of the radio buttons
      const radioAnswerDiv = radioButton.closest(".radioAnswers");
      // check if answer is correct
      let answer = radioButton.value;

      // gets the correct answer from the correctAnswers object
      let questionName = radioButton.name;
      let correctAnswer = correctAnswers[questionName];

      console.log(`Checking question: ${questionName}`);
      console.log(`User Answer: ${answer}, Correct Answer: ${correctAnswer}`);

      if (correctAnswer === undefined) {
        console.error(`Correct answer not found for key: ${questionName}`);
        return;
      }

      // resets previously selected answers
      if (lastAnswerSelected) {
        lastAnswerSelected.style.backgroundColor = "white";
      }
      //change background color if correct
      radioAnswerDiv.style.backgroundColor =
        answer === correctAnswer ? "lightgreen" : "lightcoral";
      // store the current selection
      lastAnswerSelected = radioAnswerDiv;

      //Delays the next question appearing, to see what answers where right (red and green)
      setTimeout(() => {
        if (index === questions.length - 1) {
          checkAllResults();
          showNextQuestion(index);
        } else {
          showNextQuestion(index);
        }
      }, 1000);
    });
  });
});

document.getElementById("resetQuizBtn").addEventListener("click", resetQuiz);

function resetQuiz() {
  housePoints = 0;
  currentIndex = 0; // Reset the quiz to the first question

  // uncheck all radio buttons
  document
    .querySelectorAll('input[type="radio"]:checked')
    .forEach((radio) => (radio.checked = false));

  // Hide all questions & only show the first one
  questions.forEach((question) => {
    question.style.display = "none";
    question.classList.remove("show");
  });
  // Hides result area
  resultsDiv.style.display = "none";
  resultsDiv.classList.remove("show");

  // Show the house selection section again
  declareHouse.style.display = "flex";
  declareHouse.classList.add("show");

  // Clear final score message
  document.getElementById("finalScoreSection").textContent = "";

  console.log("Quiz has been reset!");
}
