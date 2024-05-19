import { useEffect, useState } from "react";
import { TaskModal } from "../components/TodoList/TaskModal";
import { TaskDetailsModal } from "../components/TodoList/TaskModelDetails";

export function Home(){
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    importance: 'normal',
    deadline: '',
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  };

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTask({
      title: '',
      description: '',
      importance: 'normal',
      deadline: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const updatedTasks = [
      ...tasks,
      {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        importance: newTask.importance,
        deadline: newTask.deadline,
        completed: false, // Nueva tarea se marca como no completada por defecto
      },
    ];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    handleCloseModal();
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedTask(null);
  };

  const handleEditTask = (editedTask) => {
    const updatedTasks = tasks.map(t =>
      t.id === editedTask.id ? editedTask : t
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    handleCloseDetailsModal();
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    handleCloseDetailsModal();
  };
{/* <Sidebar>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Lista de Tareas</h2>
          <button className="btn btn-primary" onClick={handleOpenModal}>+ Nueva Tarea</button>
        </div>
        <ul className="list-group mt-3">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`list-group-item ${task.completed ? 'bg-success' : ''}`}
              onClick={() => handleViewDetails(task)}
            >
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <p><strong>Importancia:</strong> {task.importance} | <strong>Fecha límite:</strong> {task.deadline}</p>
            </li>
          ))}
        </ul>
      </div>

      <TaskModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        newTask={newTask}
        handleChange={handleChange}
      />

      <TaskDetailsModal
        show={showDetailsModal}
        handleClose={handleCloseDetailsModal}
        task={selectedTask}
        handleEdit={handleEditTask}
        handleDelete={handleDeleteTask}
      />
    </Sidebar>  */}
  return (
    <><h1>Contenido</h1></>
  );
}