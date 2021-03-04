import { useContext, useEffect, useState } from 'react'
import { CountdowmContext } from '../contexts/CountdowmContext'
import styles from '../styles/components/Countdowm.module.css'


export function Countdowm() {
const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    resetCountdowm, 
    startCountdowm 
} = useContext(CountdowmContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
    return (
        <div>
            <div className={styles.countdowmContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdowmButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    {isActive ?
                    <button type='button'
                        className={`${styles.countdowmButton} ${styles.countdowmButtonActive}`}
                        onClick={resetCountdowm}
                    >
                        Abandonar ciclo
                    </button>
                    : 
                    <button type='button'
                        className={styles.countdowmButton}
                        onClick={startCountdowm}
                    >
                        Iniciar um ciclo
                    </button>
            }
                </>
            )}

           


        </div>
    )
}