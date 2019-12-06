import React from 'react';
import {  Route,Switch } from "react-router-dom";
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './App.css';
import { ToastContainer } from "react-toastify";
import  "react-toastify/dist/ReactToastify.css";
import Header from './components/views/Header';
import ManageSaerch from './components/containers/ManagSearch';
import ManageCards from './components/containers/ManageCards';

// Yes, this is an unsafe way ;)
const TOKEN = 'UPDATE_GIT_HUB_TOKEN'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (     
      <div className="container-fluid">
        <Header />
        <ToastContainer autoClose={3000} hideProgressBar/>        
        <Switch>                 
      <Route
            exact path="/"
            render={(props) => <ManageSaerch {...props} client={client}  />}
          />
          <Route exact path="/cards" component={ManageCards} />     
        </Switch>
      </div>

     
    );
  }
  export default App;