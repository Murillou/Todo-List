import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

interface Props {
  contentTask: string;
  onDelete: () => void;
  onChecked: () => void;
  isDone: boolean;
}

export function Task({
  contentTask,
  onDelete,
  onChecked,
  isDone = false,
}: Props) {
  function handleDelete() {
    onDelete();
  }

  function handleChecked() {
    onChecked();
  }

  return (
    <main className={styles.taskBar}>
      <div className={styles.contentTask}>
        <input
          onChange={handleChecked}
          className={styles.circleRadio}
          type="checkbox"
          checked={isDone}
        />

        <p className={styles.content}>{contentTask}</p>

        <span className={styles.checkInput}></span>
      </div>
      <Trash onClick={handleDelete} size={20} />
    </main>
  );
}
