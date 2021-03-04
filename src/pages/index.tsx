import Head from 'next/head'

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdowm } from "../components/Countdowm";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import {GetServerSideProps} from 'next'

import styles from '../styles/pages/Home.module.css'
import { CountdowmProvider } from '../contexts/CountdowmContext';
import { ChallengeProvider } from '../contexts/ChallengesContext';


interface HomeProps{
  level: number
  currentExperience: number
  challengesCompleted: number
}


export default function Home(props: HomeProps) {
  console.log(props)
  return (
    <div className={styles.container}>
      <ChallengeProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      >
        <Head>
          <title>Início | move.it</title>
        </Head>
      <ExperienceBar />
      <CountdowmProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdowm />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdowmProvider>
    </ChallengeProvider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies
 
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
