
    document.addEventListener('DOMContentLoaded', function() {

     document.querySelector('#new_task').onsubmit = function(){

            const li= document.createElement('li');
            let task_text = document.querySelector('#task').value;
            let task_text2 = document.querySelector('#task-priority').value;
            let new_task_html = ` <span> ${task_text}</span>
                         <span> ${task_text2}</span>
                                <button class ="remove"> Remove </button>
                                 <button class ="complete"> Complete </button>`;
            li.innerHTML = new_task_html

            document.querySelector("#tasks_list").append(li);
            document.querySelector("#task").value = '';
            document.querySelector("#task-priority").value = '';




           return false;
                                }



        document.addEventListener('click', function(event){
          element = event.target;
            if(element.className ==='remove')
            {element.parentElement.remove();
            }
        })

        document.addEventListener('click', function(event){
        element= event.target;
        if(element.className ==='complete')
        {document.querySelector("#task").value = '';
        element.parentElement.style.textDecoration="line-through";
        }

        })
        document.onload=function(){
                 const Task_List = '{"TaskName":"#task", "TaskPriority"="#task-priority"}';

                 }

         document.addEventListener('click', function(event){
                  element = event.target;
                    if(element.className ==='remove')
                    {document.querySelector.element.parentElement("#task").value = '';
                    const myObj = JSON.parse(Task_List);
                    x = myObj.TaskName["task"];
                    const index = Task_List.indexOf(x)
                     if (index > -1) { Task_List.splice(index, 1)}
                     console.log(Task_List)
                    }
                })








    })