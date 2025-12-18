import TaskList from './components/TaskList.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const BASE_URL = 'http://localhost:5000';


const getAllTasksAPI = () => {
  return axios.get(`${BASE_URL}/tasks`)
    .then(res => res.data)
    .catch(err => console.error(err));
};

const addTaskAPI = (newTask) => {
  return axios.post(`${BASE_URL}/tasks`, newTask)
    .then(res => res.data)
    .catch(err => console.error(err));
};

const markCompleteAPI = (taskId) => {
  return axios.patch(`${BASE_URL}/tasks/${taskId}/mark_complete`);
};

const markIncompleteAPI = (taskId) => {
  return axios.patch(`${BASE_URL}/tasks/${taskId}/mark_incomplete`);
};

const deleteTaskAPI = (taskId) => {
  return axios.delete(`${BASE_URL}/tasks/${taskId}`);
};
// // finish this function
// const onHandleSubmit = (data) => {
//   axios.post(`${BASE_URL}/tasks, data`)

// }

const App = () => {
  const [tasks, setTasks] = useState([]);
  // use this way below

  //   const toggleTaskComplete = (taskId) => {
  //     setTasks((tasks) => (
  //       tasks.map((task) => {
  //         if (task.id === taskId) {
  //           return { ...task, isComplete: !task.isComplete };
  //         }
  //         return task;
  //       })
  //     ))
  //   };
  // //  reorganize - functional set state or callback style 
  //   const deleteTask = (taskId) => {
  //     const updatedTasks = tasks.filter((task) => task.id !== taskId);
  //     setTasks(updatedTasks);
  //   };


  // --------------------
  // Load tasks on mount
  // --------------------
  useEffect(() => {
    console.log(getAllTasksAPI());
    getAllTasksAPI().then(tasksFromAPI => {
      setTasks(tasksFromAPI);
    });
  }, []);

  // --------------------
  // Toggle completion
  // --------------------
  const toggleTaskComplete = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    const apiCall = task.isComplete
      ? markIncompleteAPI
      : markCompleteAPI;
      

    return apiCall(taskId).then(() => {
      return setTasks(tasks => {
      
        const newTask = tasks.map(task =>
          task.id === taskId
            ?
            { ...task, isComplete: !task.isComplete } : task
        )
        console.log(newTask)
      })
     
    })

  }
    
  };


  // --------------------
  // Delete task
  // --------------------
  const deleteTask = (taskId) => {
    return deleteTaskAPI(taskId).then(() => {
      setTasks(tasks =>
        tasks.filter(task => task.id !== taskId)
      );
    });
  };

  const handleCreateTask = (newTaskData) => {
  return addTaskAPI(newTaskData).then((createdTask) => {
    setTasks(prevTasks => [createdTask, ...prevTasks]);
  });
};

      return (
      <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList
          tasks={tasks}
          onTaskClickCallback={toggleTaskComplete}
          onTaskDeleteCallback={deleteTask} />}
          <NewTaskForm onSubmitTask={handleCreateTask} />
        </div>
      </main>
      </div>
      );



export default App;
