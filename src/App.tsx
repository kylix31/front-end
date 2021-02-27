import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Orders } from './pages/Orders/Orders';

import { CurrentOrder } from './pages/currentOrder/currentOrder';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Header />

      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route exact path="/">
            <Orders />
          </Route>
          <Route exact path="/order/:id">
            <CurrentOrder />
          </Route>
        </Switch>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
