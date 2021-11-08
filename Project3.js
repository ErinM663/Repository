let questions =20;
let appState = {
    current_view : "#intro_view",
    current_question : -1,
    current_quiz: "",
    current_model : {},
    current_correct:0,
    current_wrong:0,
    current_percentage:0

}


async function getQuestions(questionId, quizSelection) {
  let api_url = "";

  if (quizSelection == "quiz1") {
    api_url = 'https://my-json-server.typicode.com/ErinM663/repository/'
  }
  else if (quizSelection == "quiz2") {
    api_endpoint_url = 'https://my-json-server.typicode.com/ErinM663/QUIZ1/'
  }

  let api_end = `${api_url}/${quizSelection}/${questionId}`
  const response = await fetch(api_end);
  const result = await response.json();

  appState.current_model = result;

  setQuestionView(appState);
  update_view(appState);

  document.getElementById("AnsweredQuestions").innerHTML = appState.current_correct + appState.current_wrong;
  if (questionId == 1) {
    document.getElementById("currentScore").innerHTML = 0;
  }
  else {
    document.getElementById("currentScore").innerHTML = +(((appState.current_correct / (appState.current_correct + appState.current_wrong)) * 100).toFixed(2));
  appState.current_percentage=(((appState.current_correct / (appState.current_correct + appState.current_wrong)) * 100));
  }


  return (result);
}

document.addEventListener('DOMContentLoaded', () => {
  // Set the state
  appState.current_view =  "#intro_view";
  appState.current_model = {
    action : "quiz1",
    action2: "quiz2"
  }
  update_view(appState);
  //
  // EventDelegation - handle all events of the widget
  //

  document.querySelector("#widget_view").onclick = (e) => {
      handle_widget_event(e)
  }
});


let minutesLabel = "";
let secondsLabel = "";
let timer = 0;
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));

}






function handle_widget_event(e) {

  if (appState.current_view == "#intro_view"){
        timer = setInterval(setTime, 1000);
         minutesLabel = document.getElementById("minutes");
         secondsLabel = document.getElementById("seconds");
    if (e.target.dataset.action == "quiz1") {
        appState.current_quiz ="quiz1";
        appState.current_question=0;
        getQuestions(appState.current_question + 1, appState.current_quiz)


       }
      else if (e.target.dataset.action == "quiz2") {

         appState.current_quiz ="quiz2";
         appState.current_question=0;
         getQuestions(appState.current_question + 1, appState.current_quiz)
               }
  }

  // Handle the answer event.
  if (appState.current_view == "#question_view_true_false") {

    if (e.target.dataset.action == "answer") {
       // Controller - implement logic.
       isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
        if (isCorrect) {
                appState.current_correct++;
              }
              else {
                appState.current_wrong++;
              }


       // Update the state.
       updateQuestion(appState);
       setQuestionView(appState);
        setFeedback(isCorrect);
       // Update the view.
       update_view(appState);
       }

   }

   // Handle answer event for  text questions.
   if (appState.current_view == "#question_view_text_input") {
       if (e.target.dataset.action == "submit") {
       user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
          isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
           if (isCorrect) {
           appState.current_correct++;
           }
           else {
             appState.current_wrong++;
           }
            setFeedback(isCorrect);
           updateQuestion(appState)
           setQuestionView(appState);
           update_view(appState);
       }
    }
    if (appState.current_view == "#question_view_multiple") {

        if (e.target.dataset.action == "submit") {
             let selection = document.getElementsByName("selection");
             let user_response;

             for (let i = 0; i < choices.length; i++) {
               if (selection[i].checked) {
                 user_response = selection[i].value;
               }
             }

             isCorrect = check_user_response(user_response, appState.current_model);
             if (isCorrect) {
               appState.current_correct++;
             }
             else {
               appState.current_wrong++;
             }

             setFeedback(isCorrect);
             update_view(appState);
             updateQuestion(appState);
             setQuestionView(appState);

           }
         }
if (appState.current_view == "#question_view_check") {
    if (e.target.dataset.action == "submit") {
      var check = document.getElementsByName("box");
      var checkChecked = [];

      for (var i = 0; i < check.length; i++) {
        if (check[i].checked) {
          checkChecked.push(check[i].value);
        }
      }

      isCorrect = check_user_response(checkChecked, appState.current_model);
      if (isCorrect) {
        appState.current_correct++;
      }
      else {
        appState.current_wrong++;
      }

      setFeedback(isCorrect);
      update_view(appState);
       updateQuestion(appState);
      setQuestionView(appState);
    }
  }
  if (appState.current_view == "#question_view_multi_input") {
      if (e.target.dataset.action == "submit") {
        user_response1 = document.querySelector(`#${appState.current_model.answerField1}`).value;
        user_response2 = document.querySelector(`#${appState.current_model.answerField2}`).value;

        let textResponses = [];
        textResponses.push(user_response1);
        textResponses.push(user_response2);

        isCorrect = check_user_response(textResponses, appState.current_model);
        if (isCorrect) {
          appState.current_correct++;
        }
        else {
          appState.current_wrong++;
        }

        setFeedback(isCorrect);
        update_view(appState);
        updateQuestion(appState);
        setQuestionView(appState);
      }
    }
    if (appState.current_view == "#end_view") {
        clearInterval (timer);
        if (e.target.dataset.action == "start_again") {
              appState.current_view = "#intro_view";
              appState.current_question = -1,
                appState.current_quiz = "",
                appState.current_model = {},
                appState.current_correct = 0,
                appState.current_wrong = 0
              appState.current_model = {
                action: "quiz1",
                action2: "quiz2"
              }
              update_view(appState);
            }

        }


 } // end of handle_widget_event




function check_user_response(user_answer, model) {
  if (user_answer == model.correctAnswer) {
   appState.current_correct +=1
    return true;
  }
  appState.current_wrong +=1
  return false;

}

function updateQuestion(appState) {
    if (appState.current_question < (questions-1)) {

      appState.current_question =   appState.current_question + 1;
      getQuestions(appState.current_question + 1, appState.current_quiz);

    }
    else {
      appState.current_question = -2;
      appState.current_model = {};
    }
}

function setQuestionView(appState) {
  if (appState.current_question == -2) {
    appState.current_view  = "#end_view";
    return
  }

  if (appState.current_model.questionType == "true_false") {
    appState.current_view = "#question_view_true_false";}
  else if (appState.current_model.questionType == "text_input") {
    appState.current_view = "#question_view_text_input";
  }
  else if (appState.current_model.questionType == "multiple") {
      appState.current_view = "#question_view_multiple";
  }else if (appState.current_model.questionType == "multi_input") {
           appState.current_view = "#question_view_multi_input";
     }
  else if (appState.current_model.questionType == "checkBox") {
             appState.current_view = "#question_view_check";
       }




}
function setFeedback(isCorrect) {
  if (isCorrect == true) {
    appState.current_view = "#feedback_positive";
  } else {
    appState.current_view = "#feedback_negative";
  }
}
function update_view(appState) {

  const html_element = render_widget(appState.current_model, appState.current_view)
  document.querySelector("#widget_view").innerHTML = html_element;
}
//

const render_widget = (model,view) => {
   template_source = document.querySelector(view).innerHTML
    // Handlebars compiles the above source into a template
    var template = Handlebars.compile(template_source);

    // apply the model to the template.
    var html_widget_element = template({...model,...appState})

  return html_widget_element
