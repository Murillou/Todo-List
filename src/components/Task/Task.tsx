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

  function handleTrashClick(
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) {
    event.stopPropagation();
    handleDelete();
  }

  function handleChecked() {
    onChecked();
  }

  return (
    <main onClick={handleChecked} className={styles.taskBar}>
      <div className={styles.contentTask}>
        <input
          className={styles.circleRadio}
          type="checkbox"
          checked={isDone}
        />

        <p className={styles.content}>{contentTask}</p>

        <span className={styles.checkInput}></span>
      </div>
      <div className={styles.trashContainer}>
        <Trash onClick={handleTrashClick} size={20} />
      </div>
    </main>
  );
}
