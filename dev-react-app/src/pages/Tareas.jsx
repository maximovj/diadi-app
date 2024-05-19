import { useCallback, useEffect, useState } from "react";
import { TaskModal } from "../components/TodoList/TaskModal";
import { TaskDetailsModal } from "../components/TodoList/TaskModelDetails";

export function Tareas() {
    const [currentUser, setCurrentUser] = useState('admin'); // Usuario estático por ahora
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
    });
  
    // Función para obtener las tareas desde el localStorage
    const fetchTasks = useCallback(() => {
      const storedTasks = JSON.parse(localStorage.getItem(currentUser)) || [];
      setTasks(storedTasks);
    }, [currentUser]);
  
    // Cargar las tareas al cargar el componente
    useEffect(() => {
      fetchTasks();
    }, [fetchTasks]);
  
    // Función para abrir el modal de nueva tarea
    const handleOpenModal = () => setShowModal(true);
  
    // Función para cerrar el modal de nueva tarea
    const handleCloseModal = () => {
      setShowModal(false);
      // Reiniciar el estado de newTask
      setNewTask({
        title: '',
        description: '',
        importance: 'normal',
        deadline: '',
        startDate: '',
        inProgress: false,
        completed: false,
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
  
    // Función para manejar el submit del formulario de nueva tarea
    const handleSubmit = () => {
      const updatedTasks = [
        ...tasks,
        {
          ...newTask,
          id: tasks.length + 1, // Generar un ID único para la nueva tarea
        },
      ];
      saveTasksToLocalStorage(updatedTasks); // Guardar las tareas actualizadas en el localStorage
      handleCloseModal(); // Cerrar el modal después de guardar
    };
  
    // Función para abrir el modal de detalles de tarea
    const handleViewDetails = (task) => {
      setSelectedTask(task);
      setShowDetailsModal(true);
    };
  
    // Función para cerrar el modal de detalles de tarea
    const handleCloseDetailsModal = () => {
      setShowDetailsModal(false);
      setSelectedTask(null); // Limpiar la tarea seleccionada
    };
  
    // Función para editar una tarea
    const handleEditTask = (editedTask) => {
      const updatedTasks = tasks.map(task =>
        task.id === editedTask.id ? editedTask : task
      );
      saveTasksToLocalStorage(updatedTasks); // Guardar las tareas actualizadas en el localStorage
      handleCloseDetailsModal(); // Cerrar el modal de detalles después de editar
    };
  
    // Función para eliminar una tarea
    const handleDeleteTask = (taskId) => {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      saveTasksToLocalStorage(updatedTasks); // Guardar las tareas actualizadas en el localStorage
      handleCloseDetailsModal(); // Cerrar el modal de detalles después de eliminar
    };
  
    // Función para manejar los cambios en la tarea seleccionada en el modal de detalles
    const handleSelectedTaskChange = (e) => {
      const { name, value } = e.target;
      setSelectedTask({
        ...selectedTask,
        [name]: value,
      });
    };
  
    // Función para guardar las tareas actualizadas en el localStorage
    const saveTasksToLocalStorage = (updatedTasks) => {
      localStorage.setItem(currentUser, JSON.stringify(updatedTasks));
      setTasks(updatedTasks); // Actualizar el estado de las tareas
    };
  
    // Agrupar las tareas por fecha
    const groupTasksByDate = (taskList) => {
      return taskList.reduce((acc, task) => {
        const date = task.startDate || task.deadline; // Usar startDate o deadline
        const formattedDate = date ? date : 'Fecha sin asignar';
        if (!acc[formattedDate]) acc[formattedDate] = [];
        acc[formattedDate].push(task);
        return acc;
      }, {});
    };
  
    // Renderizar las tareas agrupadas por fecha
    const renderTasksByDate = (taskList) => {
      const groupedByDate = groupTasksByDate(taskList);
      return Object.keys(groupedByDate).map(date => (
        <div key={date}>
          <h5>{date}</h5>
          {groupedByDate[date].map(task => (
            <div
              key={task.id}
              className={`card mb-2 border-${task.importance}`}
              onClick={() => handleViewDetails(task)}
            >
              <div className={`card h-100 ${document.body.classList.contains('dark-mode') ? 'card-dark-mode' : ''}`}>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <p><strong>Importancia:</strong> {task.importance} | <strong>Fecha limite:</strong> {task.deadline|| ' sin asignar'}</p>
              </div>
            </div>
          ))}
        </div>
      ));
    };
  
    // Componente principal de la página de tareas
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
            <div className={`card h-100 ${document.body.classList.contains('dark-mode') ? 'card-dark-mode' : ''}`}>
              <div className="card-header">
                <h1 className="txt-h1-css">Para hacer</h1>
              </div>
              <div className="card-body">
                {tasks.filter(task => !task.inProgress && !task.completed).length > 0 ? (
                  renderTasksByDate(tasks.filter(task => !task.inProgress && !task.completed))
                ) : (
                  <p>Sin tareas asignadas</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className={`card h-100 ${document.body.classList.contains('dark-mode') ? 'card-dark-mode' : ''}`}>
              <div className="card-header">
                <h1 className="txt-h1-css">En proceso</h1>
              </div>
              <div className="card-body">
                {tasks.filter(task => task.inProgress && !task.completed).length > 0 ? (
                  renderTasksByDate(tasks.filter(task => task.inProgress && !task.completed))
                ) : (
                  <p>Sin tareas asignadas</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className={`card h-100 ${document.body.classList.contains('dark-mode') ? 'card-dark-mode' : ''}`}>
              <div className="card-header">
                <h1 className="txt-h1-css">Hecho</h1>
              </div>
              <div className="card-body">
                {tasks.filter(task => task.completed).length > 0 ? (
                  renderTasksByDate(tasks.filter(task => task.completed))
                ) : (
                  <p>Sin tareas asignadas</p>
                )}
              </div>
            </div>
          </div>
        </div>
  
        {/* Modal para crear nueva tarea */}
        <TaskModal
          show={showModal}
          handleClose={handleCloseModal}
          handleSubmit={handleSubmit}
          newTask={newTask}
          handleChange={handleChange}
        />
  
        {/* Modal para ver detalles de tarea */}
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