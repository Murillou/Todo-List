import styles from './List.module.css';

import clipBoardImg from '../../assets/clipboard.svg';

import { PlusCircle } from 'phosphor-react';
import { FormEvent, ChangeEvent, useState } from 'react';
import { Task } from '../Task/Task';

export function List() {
  const [newContent, setNewContent] = useState([]);
  const [newTask, setNewTask] = useState('');

  let contentNewComment: string = '';

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    contentNewComment = event.target.value;
    setNewTask(contentNewComment);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(contentNewComment);

    setNewContent(newTask);
  }

  const ifNewTaskEmpty = newTask.length === 0;

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.inputnewtask}>
        <input
          onChange={handleNewTask}
          className={styles.inputtext}
          type="text"
          placeholder="Adicione uma nova tarefa"
        />

        <button disabled={ifNewTaskEmpty} className={styles.buttonnewtask}>
          Criar <PlusCircle size={17} weight="bold" />
        </button>
      </form>

      <section className={styles.sectionsTask}>
        <div className={styles.infoTasks}>
          <p>
            Tarefas criadas
            <span className={styles.iconPopUp}>{newContent.length}</span>
          </p>

          <p>
            Concluídas
            <span className={styles.iconPopUp}>{newContent.length}</span>
          </p>
        </div>

        <div className={styles.localTask}>
          {newContent.length === 0 ? (
            <>
              <img src={clipBoardImg} alt="" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>{' '}
            </>
          ) : (
            newContent.map(task => <Task key={task} contentTask={task} />)
          )}
        </div>
      </section>
    </>
  );
}