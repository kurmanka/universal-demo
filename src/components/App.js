import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App'
import UsageHero from './UsageHero'
import Loading from './Loading'
import NotFound from './NotFound'
import { pages, nextIndex, indexFromPath } from '../utils'

const UniversalComponent = universal(props => import(`./${props.page}`), {
  minDelay: 1200,
  loading: Loading,
  error: NotFound
})

export default class App extends React.Component {
  render() {
    const { index, done, loading } = this.state
    const page = pages[index]
    const loadingClass = loading ? styles.loading : ''
    const buttonClass = `${styles[page]} ${loadingClass}`

    return (
      <div className={styles.container}>
        <h1>Hello, curious dev!</h1>
        {done && (
          <div className={styles.checkmark}>
            all components and all CSS loaded ✔
          </div>
        )}

        <UsageHero page={page} />

        <UniversalComponent
          page={page}
          onBefore={this.beforeChange}
          onAfter={this.afterChange}
          onError={this.handleError}
        />

        <button className={buttonClass} onClick={this.changePage}>
          {this.buttonText()}
        </button>

        <footer>
          <span>refresh the page</span>
          <span>
            view the source in Chrome to see which resources the page pulls
          </span>
          <span>this template is defined in src/components/App.js</span>
        </footer>
      </div>
    )
  }

  constructor(props) {
    super(props)

    const { history } = props
    const index = indexFromPath(history.location.pathname)

    this.state = {
      index,
      loading: false,
      done: false,
      error: false
    }

    history.listen(({ pathname }) => {
      const index = indexFromPath(pathname)
      this.setState({ index })
    })
  }

  changePage = () => {
    console.log('changePage()')
    if (this.state.loading) return

    const index = nextIndex(this.state.index)
    const page = pages[index]

    this.props.history.push(`/${page}`)
  }

  beforeChange = ({ isSync }) => {
    console.log('beforeChange()')
    if (!isSync) {
      this.setState({ loading: true, error: false })
    }
  }

  afterChange = ({ isSync, isServer, isMount }) => {
    console.log('afterChange()')
    if (!isSync) {
      this.setState({ loading: false, error: false })
    }
    else if (!isServer && !isMount) {
      this.setState({ done: true, error: false })
    }
  }

  handleError = error => {
    console.log('handleError()')
    this.setState({ error: true, loading: false })
  }

  buttonText() {
    const { loading, error } = this.state
    if (error) return 'ERROR'
    return loading ? 'LOADING...' : 'NEXT PAGE'
  }
}
