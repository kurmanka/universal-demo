import React from 'react'
import styles from '../css/UsageHero'

export default ({ page }) => (
  <div
    className={styles.usageHero}
    title='This block is defined in src/components/UsageHero.js'
  >
    <img src='https://cdn.reactlandia.com/faceyspacey-white-logo.png' />

    <div>
      <h2>universal(props => import(`./${props.page}`))</h2>
      <p className='example'>
        {"<UniversalComponent page='"}
        {page}
        {"' />"}
      </p>
    </div>
  </div>
)
