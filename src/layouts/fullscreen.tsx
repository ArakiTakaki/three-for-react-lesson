import React, { FC } from 'react';
import styles from './fullscreen.module.css';

export const FullScreen: FC = ({children}) => {
  return (
      <div className={styles.wrap}>
          {children}
      </div>
  )
}
