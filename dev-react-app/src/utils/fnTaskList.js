
// Función auxiliar para agrupar las tareas por fecha
const groupTasksByDate = (tasks) => {
  return tasks.reduce((groupedTasks, task) => {
    const date = task.startDate || 'Sin fecha';
    if (!groupedTasks[date]) {
      groupedTasks[date] = [];
    }
    groupedTasks[date].push(task);
    return groupedTasks;
  }, {});
};
// Función auxiliar para obtener el color del borde según la importancia de la tarea
  const getBorderColor= (importance) => {
    switch (importance) {
      case 'Baja':
        return 'light';
      case 'Normal':
        return 'info';
      case 'Alta':
        return 'warning';
      default:
        return 'light';
    }
  };

  

  export {groupTasksByDate, getBorderColor}