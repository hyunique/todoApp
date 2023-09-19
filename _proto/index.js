// Create new todos

let projects=[]



class Project {
    constructor(name,taskList, id = `P${(Date.now() + '').slice(-6)}`) {
        this.name = name;
        this.taskList = { taskList };
        this.id = id
    }
}

class Task {
    
    constructor(project, title, id = `L${(Date.now() + '').slice(-6)}`) {
        this.project=project
        this.title = title;
        this.id = id
    }

    // constructor(title, note, due, priority, id = `L${(Date.now() + '').slice(-6)}`) {
    //     this.title = title;
    //     this.note = note;
    //     this.due = due;
    //     this.priority = priority;
    //     this.id = id
    // }

    addToProject(task){
        projects.push(task)
    }

    removeTask() {
        projects.find(x => x === this)
    }

    // set due(dueDate) {
    //     this.due = dueDate
    // }

    // get due() {
    //     return this.due
    // }

}


// DOM Manipulation

const form = document.querySelector('.form')
const title = document.querySelector('.input--task')
const description = document.querySelector('.description')
const dueDate = document.querySelector('.duedate')
const priority = document.querySelector('.priority')
const addBtn = document.querySelector('.addTask')
const projectContainer = document.querySelector('.project--list')
const pjtTitle = document.querySelector('.project--title')
const pjtBtn = document.querySelector('.addProject')

class DOM {
    constructor() {      
        addBtn.addEventListener('click', this.addTaskData)
        addBtn.addEventListener('click', this.showTasks)
        pjtBtn.addEventListener('click', this.addNewProject)
        pjtBtn.addEventListener('click', this.showProjects)
        
        const defaultProject = new Project('General')
        projects.push(defaultProject)
        this.showDefaultProject()
    }

    addNewProject(e) {
        e.preventDefault() 
        let pjt = new Project(pjtTitle.value)
        projects.push(pjt)
        
    }

    addTaskData(e) {
        e.preventDefault()   
        let task = new Task(title.value)
        task.addToProject(task)
        

    }  

    showDefaultProject() {
        let html = `
        <h2 class="project--title">${projects[0].name}</h3>
        `
        projectContainer.insertAdjacentHTML('afterbegin', html)
    }

    showProjects() {
        let html = `
        <h2 class="project--title">${pjtTitle.value}</h3>
        `
        projectContainer.insertAdjacentHTML('afterbegin', html)
        pjtTitle.value = ''

    }

    showTasks() {
      
            let html = `
            <h3 class="task--title">${title.value}</h3>
            `
            // <h5 class="task--description">${description.value}</h3>
            // <h5 class="task--due">${dueDate.value}</h3>
            // <h5 class="task--priority">${priority.value}</h3>
            const taskCard = document.querySelector('.task--card')
            taskCard.insertAdjacentHTML('afterbegin', html)
            title.value=''
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