const endpoint = `https://wincacademydatabase.firebaseio.com/sandra/tasks`;

//Functie om taken op te halen uit de database
//Zie voorbeeld in M05_L03 opdracht 'async/await de nieuwe manier van leren'
const getTasksFromDatabase = async () => {
    try {
        const response = await fetch(`${endpoint}.json`, { method: 'GET' });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

//Functie die een moeilijk object met hashes omzet in een schone array met task objecten
//Deze functie staat in deze eindopdracht
const makeArrayFromTasks = async () => {
    const result = await getTasksFromDatabase();
    console.log("Before (the raw result):", result);
    let tasks = Object.keys(result).map(key => ({
        id: key,
        description: result[key].description,
        done: result[key].done
    }));
    console.log("After the tasks array", tasks);
    return tasks;
}

//Nieuwe taak posten in de database
//Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const postTask = async (data) => {
    try {
        const response = await fetch(`${endpoint}.json`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        return response;
    } catch (error) {
        console.log(error);
    }
}

//Taken verwijderen uit de database
const deleteTask = async (hash) => {
    try {
        await fetch(`${endpoint}/${hash}.json`, { method: 'DELETE' });
    } catch (error) {
        console.log(error);
    }
}


