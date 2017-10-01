import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';
import { configureStore, history } from './store/store';
import ReduxDevTool from './devtools/ReduxDevTool';
import './mock/userMock';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			{
				process.env.NODE_ENV === "development" ? (
					<div style={{width: '100%', height: '100%'}}>
						<App />
						<ReduxDevTool />
					</div>
				) : (<App />)
			}
		</ConnectedRouter>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
