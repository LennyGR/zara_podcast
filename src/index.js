import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from '../src/redux/store/index';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient({
	defaultOptions: {
		retry: 3,
		useErrorBoundary: true,
		refetchOnWindowFocus: false
	}
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Suspense fallback={<div>Loading...</div>}>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<QueryClientProvider client={queryClient}>
						<App />
					</QueryClientProvider>
				</PersistGate>
			</Provider>
		</Suspense>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
