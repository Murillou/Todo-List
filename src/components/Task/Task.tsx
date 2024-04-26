import { Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { useState } from 'react';

interface Props {
  contentTask: string;
}

export function Task({ contentTask }: Props) {
  const [checked, setChecked] = useState(false);

  function handleCheckedBox() {
    checked === false ? setChecked(true) : setChecked(false);
  }

  return (
    <main className={styles.taskBar}>
      <div className={styles.contentTask}>
        <input
          onClick={handleCheckedBox}
          className={styles.circleRadio}
          type="checkbox"
          checked={checked}
        />

        <p className={styles.content}>{contentTask}</p>

        <span className={styles.checkInput}></span>
      </div>
      <Trash size={20} />
    </main>
  );
}
