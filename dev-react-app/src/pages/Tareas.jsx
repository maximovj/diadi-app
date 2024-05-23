import { useCallback, useEffect, useState } from "react";
import { TaskModal } from "../components/TodoList/TaskModal";
import { TaskDetailsModal } from "../components/TodoList/TaskModelDetails";
import { getBorderColor, groupTasksByDate} from "../utils/fnTaskList";

export function Tareas() {
    const [currentUser, setCurrentUser] = useState('admin');
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newTask, setNewTask] = useState({
      title: '',
      description: '',
      importance: 'normal',
      deadline: '',
      startDate: '',
      inProgress: false,
      completed: false,
      category: 'to-do',
    });
  
    // Función para obtener las tareas del localStorage para el usuario actual
    const fetchTasks = useCallback(() => {
      const storedTasks = JSON.parse(localStorage.getItem(currentUser)) || [];
      setTasks(storedTasks);
    }, [currentUser]);
  
    // UseEffect para cargar las tareas cuando el componente se monta o cuando currentUser cambia
    useEffect(() => {
      fetchTasks();
    }, [fetchTasks]);
  
    // Función para abrir el modal de nueva tarea
    const handleOpenModal = () => setShowModal(true);
  
    // Función para cerrar el modal de nueva tarea y reiniciar el estado de nueva tarea
    const handleCloseModal = () => {
      setShowModal(false);
      resetNewTask();
    };
  
    // Función para reiniciar el estado de nueva tarea
    const resetNewTask = () => {
      setNewTask({
        title: '',
        description: '',
        importance: 'normal',
        deadline: '',
        startDate: '',
        inProgress: false,
        completed: false,
        category: 'to-do',
      });
    };
  
    // Función para manejar los cambios en el formulario de nueva tarea
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewTask({
        ...newTask,
        [name]: value,
      });
    };
  
    // Función para agregar una nueva tarea a la lista de tareas
    const handleSubmit = () => {
      const updatedTasks = [
        ...tasks,
        {
          ...newTask,
          id: tasks.length + 1,
        },
      ];
      saveAndSetTasks(updatedTasks);
      handleCloseModal();
    };
  
    // Función para ver los detalles de una tarea
    const handleViewDetails = (task) => {
      setSelectedTask(task);
      setShowDetailsModal(true);
    };
  
    // Función para cerrar el modal de detalles de la tarea
    const handleCloseDetailsModal = () => {
      setShowDetailsModal(false);
      setSelectedTask(null);
    };
  
    // Función para editar una tarea existente
    const handleEditTask = (editedTask) => {
        let updatedTasks = [];
      
        if (editedTask.completed) {
          // Si la tarea se marca como completada
          updatedTasks = tasks.map((task) =>
            task.id === editedTask.id ? { ...editedTask, category: 'completed' } : task
          );
        } else if (editedTask.inProgress) {
          // Si la tarea se mueve a 'in-progress'
          updatedTasks = tasks.map((task) =>
            task.id === editedTask.id ? { ...editedTask, category: 'in-progress', completed: false } : task
          );
        } else {
          // Si la tarea se mueve a 'to-do'
          updatedTasks = tasks.map((task) =>
            task.id === editedTask.id ? { ...editedTask, category: 'to-do', completed: false, inProgress: false } : task
          );
        }
      
        saveAndSetTasks(updatedTasks);
        handleCloseDetailsModal();
      };
  
    // Función para eliminar una tarea
    const handleDeleteTask = (taskId) => {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      saveAndSetTasks(updatedTasks);
      handleCloseDetailsModal();
    };
  
    // Función para manejar los cambios en los detalles de la tarea seleccionada
    const handleSelectedTaskChange = (e) => {
      const { name, value } = e.target;
      setSelectedTask({
        ...selectedTask,
        [name]: value,
      });
    };
  
    // Función para guardar las tareas en el localStorage y actualizar el estado
    const saveAndSetTasks = (updatedTasks) => {
      localStorage.setItem(currentUser, JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    };
  
    // Función para manejar el inicio del arrastre de una tarea
    const handleDragStart = (e, taskId) => {
      e.dataTransfer.setData('taskId', taskId);
    };
  
    // Función para permitir el arrastre sobre un área de drop
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    // Función para manejar el evento de soltar una tarea en una nueva categoría
    const handleDrop = (e, dropCategory) => {
      const taskId = e.dataTransfer.getData('taskId');
      const updatedTasks = tasks.map((task) => {
        if (task.id === parseInt(taskId)) {
          return {
            ...task,
            category: dropCategory,
            inProgress: dropCategory === 'in-progress',
            completed: dropCategory === 'completed',
          };
        }
        return task;
      });
      saveAndSetTasks(updatedTasks);
    };
  
    // Función para renderizar las tareas agrupadas por categoría y fecha
    const renderTasksByCategory = (category) => {
      const tasksByCategory = tasks.filter(task => task.category === category);
      const tasksByDate = groupTasksByDate(tasksByCategory);
  
      if (tasksByCategory.length === 0) {
        return <p>Tareas sin asignar</p>;
      }
  
      return Object.keys(tasksByDate).map(date => (
        <div key={date}>
          <h5>{date}</h5>
          {tasksByDate[date].map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              className={`card mb-2 border-${getBorderColor(task.importance)} border-3`}
            >
              <div className="card-body">
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <p style={{fontSize:"15px"}}>
                  <strong>Importancia:</strong> {task.importance} |{' '}
                  <strong>Límite:</strong> {task.startDate || 'Fecha sin asignar'}
                </p>
                <button className="btn btn-info btn-sm" onClick={() => handleViewDetails(task)}>Ver detalles</button>
              </div>
            </div>
          ))}
        </div>
      ));
    };
  
    return (
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Lista de Tareas</h2>
          <button className="btn btn-primary" onClick={handleOpenModal}>
            + Nueva Tarea
          </button>
        </div>
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div
              className="card"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'to-do')}
            >
              <div className="card-header">
                <h1 className="txt-h1-css">Para hacer</h1>
              </div>
              <div className="card-body">
                {renderTasksByCategory('to-do')}
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div
              className="card"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'in-progress')}
            >
              <div className="card-header">
                <h1 className="txt-h1-css">En proceso</h1>
              </div>
              <div className="card-body">
                {renderTasksByCategory('in-progress')}
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div
              className="card"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'completed')}
            >
              <div className="card-header">
                <h1 className="txt-h1-css">Hecho</h1>
              </div>
              <div className="card-body">
                {renderTasksByCategory('completed')}
              </div>
            </div>
          </div>
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
          handleChange={handleSelectedTaskChange}
        />
      </div>
    );
  }