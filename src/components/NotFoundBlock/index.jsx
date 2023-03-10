import React from 'react';
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <span>🥲</span>
            <h1 >Нічого не знайшов :(</h1>
            <p>нажаль, ця сторінка відсутня в нашому інтернет-магазині</p>
        </div>
    );
};

export default NotFoundBlock;