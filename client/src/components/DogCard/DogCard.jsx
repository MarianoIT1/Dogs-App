import React, {useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './DogCard.module.css'
import placeholderOnError from '../../img/dog-breed-placeholder.png'
import { imgLoaded, imgToLoad } from '../../redux/actions'

const Placeholder = ({seed}) => {

    return (
    <div className={`${styles.card} ${styles.front}`}>
        <header className={styles.cardHeader}>
            <div className={styles.imageLoading}><div className={styles.activity}></div></div>
        </header>
        <main className={styles.cardMain}>
            <div style={{width: `${Math.ceil(seed*50+30)}%`}} className={styles.nameLoading}>
            <div className={styles.activity}></div>
            </div>
            <div className={styles.temperamentsCont}>
                <div className={styles.weightLoading}><div className={styles.activity}></div></div>
                    {
                        new Array(Math.ceil(seed*4+2)).fill(' ').map((e, k) => 
                        (<div key={k} style={{width: `${Math.ceil(seed.toString()[k+4]*5+50)}px`}} className={styles.temperamentLoading}><div className={styles.activity}></div></div>)
                        )
                    }                    
            </div>
        </main>
    </div>
    )
}


const DogCard = ({dog}) => {
    
    const filterByTemperament = useSelector(state => state.filterByTemperament)
    const imgsStack = useSelector(state => state.imgsStack)
    const page = useSelector(state => state.page)
    const prevPage = useSelector(state => state.prevPage)
    const [random, setRandom] = useState(Math.random())
    
    const dispatch = useDispatch()

    const positionHandle = (e) => {
        document.documentElement.style.setProperty('--pageX-details', `${e.pageX}px`)
        document.documentElement.style.setProperty('--pageY-details', `${e.pageY}px`)
    }

    const imgRef = useRef()

    const hiddenImgOnError = () => {
        imgRef.current.onerror = null;
        imgRef.current.style.display = 'none'
        dispatch(imgLoaded())
    }

    const handleImgOnLoad = () => {
        dispatch(imgLoaded())
    }

    useEffect(() => {
        if(dog && dog.image !== null) dispatch(imgToLoad())
        
    }, [])

    return (
        
        <div className={styles.cardWrapper} style={{animation: `${page < prevPage ? 'prevPage' : page > prevPage ? 'nextPage' : ''} .5s forwards`}}>
            {(!dog || imgsStack > 0) && <Placeholder seed={random} />}
            {dog && <Link onClick={positionHandle} to={`/details/${dog.id}`} className={styles.card}>
                <header className={styles.cardHeader}>
                    {dog.image !== null && <img onLoad={handleImgOnLoad} ref={imgRef} onError={hiddenImgOnError} className={styles.image} src={dog.image} alt={dog.name} />}
                    <img className={styles.imagePlaceholder} src={placeholderOnError} />
                </header>
                <main className={styles.cardMain}>
                    <div className={styles.nameCont}>
                        <h3 className={styles.dogName}>{dog.name}</h3>
                    </div>
                    <div className={styles.temperamentsCont}>
                        <div className={styles.weight}>{`Weight: \n${dog.weight} kg`}</div>
                        {dog.temperament && dog.temperament.map(t => (
                            <div style={filterByTemperament.includes(t) ? {fontWeight:'900', filter: 'brightness(90%)'} : {}} className={styles.temperament}>{t}</div>
                        ))}
                    </div>
                </main>
            </Link>}
        </div>
    )
}

export default DogCard