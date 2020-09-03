//Items creeeren om taken weer te geven
const createTaskItem = (item) => {
    const div = document.createElement('div');
    const divText = document.createTextNode(
        `${item.description}`
    );
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
        deleteTask(`${item.id}`);
        document.getElementById("result-list").innerHTML = "";
        setTasksFromDatabaseToDom();
    })
    div.appendChild(divText);
    div.appendChild(deleteButton);
    return div;
}

//Maak variabele van de div om de taken in te zetten
const divResultList = document.getElementById("result-list");

//Voeg de taken toe aan de DOM
//Zie voorbeelden in uitwerking in M05_L03 opdracht 'oefenen met async/await'
const setTasksFromDatabaseToDom = async () => {
    const tasks = await makeArrayFromTasks();
    const taskItems = tasks.map(item => {
        const taskItem = createTaskItem(item);
        return taskItem;
    })
    taskItems.forEach(item => {
        divResultList.appendChild(item);
    })
}

//Maak een variabelen van de inpunt van de nieuwe taak
const taskInput = document.getElementById('task-input');
//Niewe taak toevoegen 
const setNewTaskToDom = async () => {
    const taskDescription = taskInput.value;
    const data = { description: taskDescription, done: false };
    const post = await postTask(data);
    const json = await post.json();
    data.id = json.name;
    const taskItem = createTaskItem(data);
    divResultList.appendChild(taskItem);
}

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', setNewTaskToDom);

document.addEventListener('DOMContentLoaded', () => {
    setTasksFromDatabaseToDom();
})

