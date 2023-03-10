// Create new todos

let projects=[]



class Project {
    constructor(name,taskList) {
        this.name = name;
        this.taskList = {taskList}
    }
}

class Task {
    
    constructor(title, note, due, priority, id = (Date.now() + '').slice(-6)) {
        this.title = title;
        this.note = note;
        this.due = due;
        this.priority = priority;
        this.id = id
    }

    addToProject(task){
        projects.push(task)
    }

    removeTask() {
        projects.find(x => x === this)
    }

    set due(dueDate) {
        this.due = dueDate
    }

    get due() {
        return this.due
    }

}


// DOM Manipulation

const form = document.querySelector('.form')
const title = document.querySelector('.title')
const description = document.querySelector('.description')
const dueDate = document.querySelector('.duedate')
const priority = document.querySelector('.priority')
const addBtn = document.querySelector('.addTask')
const projectContainer = document.querySelector('.project')
const pjtTitle = document.querySelector('.project--title')
const pjtBtn = document.querySelector('.addProject')

class DOM {
    constructor() {      
        addBtn.addEventListener('click', this.addTaskData)
        addBtn.addEventListener('click', this.showTasks)
        pjtBtn.addEventListener('click', this.addNewProject)
        pjtBtn.addEventListener('click', this.showProjects)
    }

    addNewProject(e) {
        e.preventDefault() 
        let pjt = new Project(pjtTitle.value)
        
    }

    addTaskData(e) {
        e.preventDefault()   
        let task = new Task(title.value, description.value, dueDate.value, priority.value)
        task.addToProject(task)

    }  

    showProjects() {
        let html = `
        <h2 class="project--title">${pjtTitle.value}</h3>
        `
        projectContainer.insertAdjacentHTML('afterbegin',html)

    }

    showTasks() {
      
            let html = `
            <h3 class="task--title">${title.value}</h3>
            <h5 class="task--description">${description.value}</h3>
            <h5 class="task--due">${dueDate.value}</h3>
            <h5 class="task--priority">${priority.value}</h3>
            `
            const taskCard = document.querySelector('.task--card')
            taskCard.insertAdjacentHTML('afterbegin', html)
        
        //projects.forEach(pjt => {
        //     let html = `
        //     <h3 class="task--title">${pjt.title}</h3>
        //     <h5 class="task--description">${pjt.note}</h3>
        //     <h5 class="task--due">${pjt.due}</h3>
        //     <h5 class="task--priority">${pjt.priority}</h3>
        //     `
        //     const taskCard = document.querySelector('.task--card')
        //     taskCard.insertAdjacentHTML('afterbegin', html)
        // })
        
    }
}

const dom = new DOM()

// create project object and include todo task in the project