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
    if (!$("input[type=radio]:checked").val()) {
        alert('Please make a selection!');
        }else
            {
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
        lastPage();
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
        lastPage();
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
    $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/browsers.png" alt="Picture of different browsers">`);
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

//last page after quiz ends
function lastPage(){
    console.log('lastPage ran');
    genSeeResultsButton();
    $('main').on('click', '.results', function(){ 
        hideResponse();
        $('h1').hide();
        $(".onQuestion").html(`The results are in, You got a score of: ${QUIZ.numberCorrect}`)
        uniqueResponse();
        quizEnd();
    })
}

function genSeeResultsButton() {
    $('input.button').addClass('results').attr('type', 'button').attr('value', 'See Results');
}

//generate response at end of quiz dependent on number of answers that were correct
function uniqueResponse(){
    switch (QUIZ.numberCorrect) {
        case 0:
        case 1:
        case 2:
        case 3:
            $(".scoreTotal").html('You need to study up on your PC knowledge.')
            $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/bsod.png" alt="Picture of the dreaded blue screen of death.">`)
            break;
        case 4:
        case 5:
        case 6:
            $(".scoreTotal").html('Not bad, but you should try again.')
            $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/Scotty.gif" alt="Gif of Scotty from Star Trek talking into a computer mouse.">`)
            break;
        case 7:
        case 8:
        case 9:
            $(".scoreTotal").html('Almost! I think you can get a perfect score next time.')
            $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/Geek.png" alt="Picture of the geek squad car with two geeks in front of it.">`)
            break;
            default:
            $(".scoreTotal").html('Wow amazing job! you got them all right.')
            $('ul').addClass('picture align-center').html(`<img src="https://mascontris.github.io/images/PCguy.png" alt="Picture of a PC superhero call PCguy.">`)
    }
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
