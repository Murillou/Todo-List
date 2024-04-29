import styles from './List.module.css';

import clipBoardImg from '../../assets/clipboard.svg';

import { PlusCircle } from 'phosphor-react';
import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Task } from '../Task/Task';

interface TaskProps {
  content: string;
  completed: boolean;
}

export function List() {
  const [newContent, setNewContent] = useState<TaskProps[]>([]);
  const [newTask, setNewTask] = useState('');

  function saveTaskToLocalStorage(task: TaskProps[]) {
    localStorage.setItem('task', JSON.stringify(task));
  }

  function getTaskFromLocalStorage() {
    const taskString = localStorage.getItem('task');
    return taskString ? JSON.parse(taskString) : [];
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTaskStore = { content: newTask, completed: false };
    setNewContent(prev => [...prev, newTaskStore]);
    saveTaskToLocalStorage([...newContent, newTaskStore]);
    setNewTask('');
  }

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleDeleteTask(index: number) {
    const updateTasks = newContent.filter((_, i) => i !== index);
    setNewContent(updateTasks);
    saveTaskToLocalStorage(updateTasks);
  }

  function handleToggleChecked(index: number) {
    const checkTask = newContent.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setNewContent(checkTask);
    saveTaskToLocalStorage(checkTask);
  }

  const isNewTaskEmpty = newTask.length === 0;
  const totalTask = newContent.length;
  const checkedTask = newContent.filter(task => task.completed);

  useEffect(() => {
    const tasks = getTaskFromLocalStorage();
    setNewContent(tasks);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.inputnewtask}>
        <input
          onChange={handleNewTask}
          className={styles.inputtext}
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTask}
        />

        <button disabled={isNewTaskEmpty} className={styles.buttonnewtask}>
          Criar <PlusCircle size={17} weight="bold" />
        </button>
      </form>

      <section className={styles.sectionsTask}>
        <div className={styles.infoTasks}>
          <p>
            Tarefas criadas
            <span className={styles.iconPopUp}>{newContent.length}</span>
          </p>

          {newContent.length === 0 ? (
            <p>
              Concluídas
              <span className={styles.iconPopUp}>{newContent.length}</span>
            </p>
          ) : (
            <p>
              Concluídas
              <span className={styles.iconPopUp}>
                {checkedTask.length} de {totalTask}
              </span>
            </p>
          )}
        </div>

        <div className={styles.localTask}>
          {newContent.length === 0 ? (
            <>
              <img src={clipBoardImg} alt="" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>{' '}
            </>
          ) : (
            newContent.map((task, index) => (
              <Task
                key={index}
                contentTask={task.content}
                onDelete={() => handleDeleteTask(index)}
                onChecked={() => handleToggleChecked(index)}
                isDone={task.completed}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
