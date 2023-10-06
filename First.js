const fs = require('fs');
const { program } = require('commander');
const stringifiedTasks = fs.readFileSync('./tasks.json', 'utf8');
const tasks = JSON.parse(stringifiedTasks);

const writeUpdatedTasks = (tasks) => {
  fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));
};

const addNewTask = (options) => {
  const { title, status } = options;
  tasks.push({
    id: Date.now(),
    title,
    status,
  });
  writeUpdatedTasks(tasks);
};

const editTask = (id, newTitle, newStatus) => {
    const taskIndex = tasks.findIndex((task) => task.id === +id);
  
    if (taskIndex !== -1) {
      tasks[taskIndex].title = newTitle;
      tasks[taskIndex].status = newStatus;
      writeUpdatedTasks(tasks);
      console.log(`Task with ID ${id} updated.`);
    } else {
      console.log(`Task with ID ${id} not found.`);
    }
  };
  

const listTasks = () => console.log(tasks);

const deleteTask = (id) => {
  const filteredTasks = tasks.filter((task) => task.id !== +id);
  writeUpdatedTasks(filteredTasks);
};

program
  .name('to-do CLI')
  .description('CLI to operate on to-do list')
  .version('1.0.0');

program.command('add')
  .description('Add a task to the to-do list')
  .option('-t, --title <string>', 'task title')
  .option('-s, --status <string>', 'task status')
  .action((options) => {
    addNewTask(options);
  });


  program.command('edit')
  .description('Edit a task by ID')
  .argument('<id>', 'ID of the task to edit')
  .option('-t, --title <string>', 'new task title')
  .option('-s, --status <string>', 'new task status')
  .action((id, options) => {
    editTask(id, options.title, options.status);
  });


program.command('list')
  .description('List all tasks in the to-do list')
  .action(() => {
    listTasks();
  });

program.command('delete')
  .description('Delete a task from the to-do list by ID')
  .argument('<id>', 'ID of the task')
  .action((id) => {
    deleteTask(id);
  });

program.parse();
