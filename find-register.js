class Task {
    constructor(nome, bairro, email, telefone, cidade) {
        this.nome = nome;
        this.bairro = bairro;
        this.email = email;
        this.telefone = telefone;
        this.cidade = cidade;
    }
    
    validateData() {
        for (let i in this) {
            if (this[i] === undefined || this[i] === "") {
                return false;
            }
        }
        return true;
    }
}

class Database {
    
    constructor() {
        if (typeof(Storage)!== "undefined") {
            const id = localStorage.getItem('id');
            if(id === null){
                localStorage.setItem('id', 0); // Initialize to 0
            }
        } else {
            console.log("Sorry, your browser does not support web storage...");
        }
    }

    getTasks() {
        const tasks = Array();
        
        const id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            const task = JSON.parse(localStorage.getItem(i));

            if (task === null) {
                continue;
            }

            task.id = i;
            tasks.push(task);
        }
        return tasks;
    }

    createTask(task) {
        let id = getId();
        localStorage.setItem(id, JSON.stringify(task));
        localStorage.setItem('id', id);
    }

}

function getId() {
    const nextId = localStorage.getItem('id');
    if (nextId === null) {
        return 1; 
    } else {
        return parseInt(nextId, 10) + 1; 
    }
}

const database = new Database(); // blackbox


function registerTask(event) {

    const nome      = document.getElementById('nome').value
    const bairro    = document.getElementById('bairro').value
    const email     = document.getElementById('email').value
    const telefone  = document.getElementById('telefone').value
    const cidade    = document.getElementById('cidade').value

    if (nome === "" || bairro === "" || email === "" || telefone === "" || cidade === "") {
        alert("Você precisa completar todos os campos.");
        return; // Exit the function
    }

    const task = new Task(nome, bairro, email, telefone, cidade);

    if (task.validateData()) {
        database.createTask(task);
        event.target.form.reset(); 
    }
}

function loadTasksOnClick(event) {
    if (event) {
        event.preventDefault(); // Verifica se event está definido antes de chamar preventDefault()
    }
    const cidade = document.getElementById('cidade').value;
    if (cidade === "") {
        alert("Escolha uma cidade");
        return; // 
    }
    const tasks = database.getTasks();
    const listPlayers = document.getElementById("listPlayers");
    listPlayers.innerHTML = ""; // Clear the list
  
    let tasksFound = tasks.filter((t) => t.cidade === cidade);
  
    if (tasksFound.length === 0) {
      alert("Não existem jogadores cadastrados nesta cidade.");
    } else {
      tasksFound.forEach((t) => {
        const row = listPlayers.insertRow();
        row.insertCell(0).innerHTML = `${t.nome}`;
        row.insertCell(1).innerHTML = `${t.bairro}`;
        row.insertCell(2).innerHTML = `${t.email}`;
        row.insertCell(3).innerHTML = `${t.telefone}`;
        row.insertCell(4).innerHTML = `${t.cidade}`;
      });
    }
}

document.getElementById("search").addEventListener("click", loadTasksOnClick);

