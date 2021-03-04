import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdowmContextData{
    minutes: number
    seconds: number
    hasFinished: boolean
    isActive: boolean
    startCountdowm: () => void
    resetCountdowm: () => void
}

interface CountdowmProviderProps{
    children: ReactNode
}

export const CountdowmContext = createContext({} as CountdowmContextData)
let countdowmTimeout: NodeJS.Timeout

export function CountdowmProvider({children}: CountdowmProviderProps){

    const { startNewChallenge } = useContext(ChallengesContext)
    

    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountdowm() {
        setIsActive(true)
    }
    function resetCountdowm(){
        clearTimeout(countdowmTimeout)
        setIsActive(false)
        setHasFinished(false)
        setTime(0.05 * 60)
    }
    useEffect(() => {
        if (isActive && time > 0) {
        countdowmTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }else if (isActive && time === 0){
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])
    return(
        <CountdowmContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdowm,
            resetCountdowm
        }}>
            {children}
        </CountdowmContext.Provider>
    )
}