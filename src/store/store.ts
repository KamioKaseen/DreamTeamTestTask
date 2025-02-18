import { reactive, computed } from 'vue';

export interface Date {
  monthName: string;
  day: string,
  fullDate: string,
}

export interface Task {
  id: number;
  date: Date;
  text: string;
  completed: boolean;
}

export type FilterType = 'all' | 'completed' | 'uncompleted';

const state = reactive({
  taskArray: [] as Task[],
  currentFilter: 'all' as FilterType,
});

const filteredTasks = computed((): Task[] => {
  if (state.currentFilter === 'completed') {
    return state.taskArray.filter((task) => task.completed);
  } 
  else if (state.currentFilter === 'uncompleted') {
    return state.taskArray.filter((task) => !task.completed);
  }

  return state.taskArray;
});

const formatDate = (): {
  monthName: string;
  day: string,
  fullDate: string,
} => {
  function capitalizeFirstLetter(string: string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const shortMonthName = capitalizeFirstLetter(currentDate.toLocaleString('ru-RU', { month: 'long' }));
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const date = {
    monthName: shortMonthName,
    day: day,
    fullDate: `${year}-${month}-${day}`,
  }

  return date;
};

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(state.taskArray));
};

const loadTasks = () => {
  const tasks = localStorage.getItem('tasks');

  if (tasks) {
    state.taskArray = JSON.parse(tasks);
  }
};

const addTask = (newTaskText: string) => {
  const formattedDateTime = formatDate();

  state.taskArray.push({
    id: Math.random(),
    date: formattedDateTime,
    text: newTaskText,
    completed: false,
  });

  saveTasks();
};

const removeTask = (taskId: number) => {
  state.taskArray = state.taskArray.filter((task) => task.id !== taskId);

  saveTasks();
};

const clearList = () => {
  state.taskArray.length = 0;
};

const toggleTask = (taskId: number) => {
  const task = state.taskArray.find((task) => task.id === taskId);

  if (task) {
    task.completed = !task.completed;
    saveTasks();
  }
};

const updateTask = (updatedTask: { id: number; text: string }) => {
  const task = state.taskArray.find((task) => task.id === updatedTask.id);

  if (task) {
    task.text = updatedTask.text;
    saveTasks();
  }
};

const filterList = (filter: FilterType) => {
  state.currentFilter = filter;
};

loadTasks();

export default function useStore() {
  return {
    state,
    filteredTasks,
    addTask,
    removeTask,
    clearList,
    toggleTask,
    updateTask,
    filterList,
    saveTasks,
    loadTasks,
    formatDate,
  };
}
