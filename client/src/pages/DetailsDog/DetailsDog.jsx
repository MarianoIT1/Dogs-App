import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import fetchDogs from "../../services/fetchDogs"
import styles from './DetailsDog.module.css'

const DetailsDog = () => {

const [details, setDetails] = useState()
const { id } = useParams()
const random = Math.floor(Math.random() * 5 + 3)
const arrayRandom = new Array(random).fill('').map(e => e = Math.floor(Math.random() * 30))

useEffect(() => {
    fetchDogs(id)
        .then(data => setDetails(data))
        .catch(e => console.log(e))
}, [])

    return (
        details 
        ?   (
            <main className={styles.main}>
                <div className={styles.detailsWrapper}>
                    <div className={styles.detailsBody}>
                        <img className={styles.image} src={details.image} alt={details.name} />
                        <div className={styles.dataWrapper}>
                            <h2 className={styles.dogName}>{details.name}</h2>
                            <div className={styles.dogStats}>{`Height: ${details.height} cm`}</div>
                            <div className={styles.dogStats}>{`Weight: ${details.weight} kg`}</div>
                            <div className={styles.dogStats}>{`Life span: ${details.life_span}`}</div>
                            <div className={styles.temperamentsWrapper}>
                                {details.temperament.map(temperament => (<div className={styles.temperament}>{temperament}</div>))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            )
        :   (
            <main className={styles.main}>
                <div className={styles.detailsWrapper}>
                    <div className={styles.detailsBody}>
                        <div className={styles.imageLoading}><div className={styles.activity}></div></div>
                        <div className={styles.dataWrapper}>
                            <h2  style={{width: `${285 + arrayRandom[0]}px`}} className={styles.dogNameLoading}><div className={styles.activity}></div></h2>
                            <div style={{width: `${175 + arrayRandom[1]}px`}} className={styles.dogStatsLoading}><div className={styles.activity}></div></div>
                            <div style={{width: `${175 + arrayRandom[2]}px`}} className={styles.dogStatsLoading}><div className={styles.activity}></div></div>
                            <div style={{width: `${175 + arrayRandom[3]}px`}} className={styles.dogStatsLoading}><div className={styles.activity}></div></div>
                            <div className={styles.temperamentsWrapper}>
                                {
                                    arrayRandom.map(e => (<div className={styles.temperamentLoading}><div className={styles.activity}></div></div>))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            )
    )
}

export default DetailsDog