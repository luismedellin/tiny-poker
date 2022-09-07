import { Provider } from 'react-redux'
import { AppRouter } from './router'
import { store } from './store'
import { Navbar } from './ui'

export const TinyPokerApp = () => {

    return (
        <Provider store={store}>
            <Navbar />
            <AppRouter />
        </Provider>
    )
}