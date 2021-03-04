import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdowmContext } from '../contexts/CountdowmContext'
import styles from '../styles/components/ChallengeBox.module.css'



export function ChallengeBox() {

    const { activeChallenge, 
        resetChallenge, 
        completeChallenge 
    } = useContext(ChallengesContext)
    const { resetCountdowm } = useContext(CountdowmContext)
    function handleChallengeSucceeded(){
        completeChallenge()
        resetCountdowm()
    }

    function handleChallengeFailed(){
        resetChallenge()
        resetCountdowm()
    }
    

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
            <div className={styles.challengeActive}>
                <header>Ganhe {activeChallenge.amount} xp</header>

                <main>
                    <img src={`icons/${activeChallenge.type}.svg`} />
                    <strong>novo desafio</strong>
                    <p>{activeChallenge.description}</p>
                </main>

                <footer>
                    <button 
                        type='button'
                        className={styles.challengeFailedButton}
                        onClick={handleChallengeFailed}
                    >
                    Falhei
                    </button>

                    <button 
                        type='button'
                        className={styles.challengeSucceededButton}
                        onClick={handleChallengeSucceeded}
                    >
                    Completei</button>
                </footer>
            </div> 
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                </p>
            </div>
            )}
        </div>
    )
}