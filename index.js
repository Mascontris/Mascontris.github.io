// start Quiz
function startQuiz(){
    $('form').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/Quiz.png" alt="Picture of quiz logo">`)
    generateButton()
    $('header').on('click', '.startButton', function(){     
        hideButton();
        displayCurrentQuestion();
    })
}

function displayCurrentQuestion(){
    displayQuestion(getCurrentQuestion())
}

function getCurrentQuestion(){
    return QUIZ.questions[QUIZ.currentQuestion];
}

function displayQuestion(question){
    console.log('displayQuestion ran')
    $('main').html(generateQuestion(question));
    displayScore();
}

function hideButton(){
    console.log("hideButton ran")
    $('.mainButton').hide();
}

function generateButton(){
    if (QUIZ.currentQuestion == 0) {
        console.log("generate start Button")
        $('.mainButton').html(`<button type="button" class="startButton">Start</button>`);
    }
    else {
        console.log("generate restart Button")
        $('.mainButton').show();
        $('.mainButton').html(`<button type="button" class="restartButton">Restart Quiz</button>`);
    }}

//Display Current Question and Total Score
function displayScore(){
    console.log('displayScore ran')
    $('.score').html(
       `<div class="onQuestion">Question: ${QUIZ.currentQuestion + 1}/${Object.keys(QUIZ.questions).length}</div>
        <div class="scoreTotal">Score: ${QUIZ.numberCorrect}</div>`
    )
}

//generate question formated with radio buttons
function generateQuestion(question){
        return `
          <form>
          <fieldset>
          <input class="align-center button" type="submit"></input>
          <legend>${question.text}</legend>
          <ul>
          ${question.answers.map((answer, index) => {
            return `<li><input type="radio" name="answer" value="${index}" id="${index}"><label for="${index}">${answer.text}<label></input></li>`
          }).join("\n")}
          </ul>
          </fieldset>
          </form>
        `
}

//evaluate which radio button is selected
$(function evalSelection(){
    $('main').on('submit', 'form', function(event){
            event.preventDefault();
            hideQuestion();
            showResponse();
            let selected = $('input[name="answer"]:checked');
            let answerIndex = selected.val();
            let question = getCurrentQuestion();
            let answer = question.answers[answerIndex];
            let correctAnswer = question.answers.find(answer => answer.isCorrect);
            if (answer.isCorrect) {
                console.log("Correct answer selected")
                QUIZ.numberCorrect += 1;
                displayScore();
                displayCorrect();
            } else {
                console.log("Incorrect answer selected")
                displayIncorrect(correctAnswer);
            
           }
        })
})

function hideQuestion(){
    console.log('hideQuestion ran')
    $("legend").hide();
}

function hideResponse(){
    console.log('hideResponse ran')
    $('h2').hide();
}

function showResponse(){
    console.log('showResponse ran')
    $('h2').show();
}

//if answer was correct adjust score and run generate Correct Page function.
function displayCorrect(){
    console.log("displayCorrect ran")
    if (QUIZ.currentQuestion == ((QUIZ.questions).length)-1) {
        console.log("end of quiz")
        generateCorrectPage();
        quizEnd();
    }
    else {
    generateCorrectPage();
    generateNextButton();
    }
}

//Changes the main form to the correct page with picture
function generateCorrectPage(){
    console.log("generateCorrectPage ran");
    replaceRadioButtonsWithPicture();
    $('h2.intro').removeClass('incorrect').addClass('correct').html('Great Job! This is the correct answer!');
}


//if answer was incorrect adjust score and run generate incorrect page.
function displayIncorrect(correctAnswer){
    if (QUIZ.currentQuestion == ((QUIZ.questions).length)-1) {
        console.log("end of quiz");
        generateIncorrectPage(correctAnswer);
        quizEnd();
    }
    else {
    generateNextButton();
    generateIncorrectPage(correctAnswer);
    }
}

//Changes the main form to the incorrect page with picture
function generateIncorrectPage(correctAnswer){
    console.log("generateIncorrectPage ran");
    incorrectPicture();
    $('h2.intro').removeClass('correct').addClass('incorrect').html(`Sorry, that is not correct, the correct answer is ${correctAnswer.text}`);
}

//changes the Submit button to a Next Button
function generateNextButton(){
    console.log("generateNextButton ran")
    $('input.button').addClass('nextButton').attr('type', 'button').attr('value', 'Next Question');
}

//Listen for the next Button Click
$(function nextQuestion(){
    $('main').on('click', '.nextButton', function(){
            console.log('nextQuestion ran')
            QUIZ.currentQuestion += 1
            displayCurrentQuestion();
            hideResponse();
    })
})

//replaces the radio buttons section with a picture of the answer.
function replaceRadioButtonsWithPicture(){
    console.log('Add Picture')
    //depending on the question number display approriate picture
    switch (QUIZ.currentQuestion) {
        case 0:
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/Monitor.png" alt="Picture of a computer monitor">`);
        break;
        case 8:
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/browsers.jpg" alt="Picture of different browsers">`);
        break;
        case 1:
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/Computer.png" alt="Picture of a computer">`);
        break;
        case 6:   
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/ISP.jpg" alt="Picture of internet service provider logos">`)
        break;
        case 9:   
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/Java.png" alt="Picture of the JAVA language logo">`)
        break;
        case 2:
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/Motherboard.png" alt="Picture of a computer motherboard">`)
        break;
        case 5:    
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/Terminal.png" alt="Picture of a terminal">`)
        break;
        case 4:    
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/USB.png" alt="Picture of a USB connector">`)
        break;
        case 7:   
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/WWW.png" alt="Picture of a www logo">`)
        break;
        case 3:   
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/IP.png" alt="Picture of an IP address">`)
    }
}

function incorrectPicture(){
    $('ul').addClass('picture align-center').html(
        `<img src="https://mascontris.github.io/images/Oops.png" alt="Picture of a yellow road sign that says Ooops">`
    )
}

function quizEnd(){
    console.log("reached end of quiz")
    $("input").hide();
    generateButton();
    restartQuiz();
}
//When at end of QUIZ listens to restartQuiz click
function restartQuiz(){
    $('header').on('click', '.restartButton', function(){     
        location.reload();
    })
}

$(startQuiz);
