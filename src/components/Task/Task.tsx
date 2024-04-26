import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

interface Props {
  contentTask: string;
  onDelete: () => void;
}

export function Task({ contentTask, onDelete }: Props) {
  function handleDelete() {
    onDelete();
  }
  return (
    <main className={styles.taskBar}>
      <div className={styles.contentTask}>
        <input className={styles.circleRadio} type="checkbox" />

        <p className={styles.content}>{contentTask}</p>

        <span className={styles.checkInput}></span>
      </div>
      <Trash onClick={handleDelete} size={20} />
    </main>
  );
}
