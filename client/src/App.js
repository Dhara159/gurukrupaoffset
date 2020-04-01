import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles';

const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));

const App = () => (
  <div>
    <GlobalStyle />
    <Header />
    <Switch>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route path='/' component={SignInAndSignUpPage} />
        </Suspense>
      </ErrorBoundary>
    </Switch>
  </div>
);

export default App;
