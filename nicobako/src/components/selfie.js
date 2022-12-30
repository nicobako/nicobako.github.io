import * as React from 'react'

import styles from './selfie.module.css'
import image from '../images/nico-bako.jpg'
const Selfie = () => {
    return <div className={styles.selieContainer}>
        <img
            alt="Logo"
            src={image}
            aspectRatio={1}
            width={150}
            objectFit={"scale-down"}
        />
    </div>
}

export default Selfie