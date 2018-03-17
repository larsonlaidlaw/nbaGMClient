import React, { Component } from 'react';
// import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import AddPlayer from './containers/AddPlayer/AddPlayer'
import AddContract from './containers/AddContract/AddContract'
import PlayerEdit from './containers/PlayerEdit/PlayerEdit'
import TeamSelector from './containers/TeamSelector/TeamSelector'
import TradeEnvironment from './containers/TradeEnvironment/TradeEnvironment'

class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          <Route path='/' component={ TeamSelector} />
          <Switch>
            <Route path='/new_player' component={ AddPlayer } />
            <Route path='/new_contract' component={ AddContract } />
            <Route path='/players/:player_name' component={ PlayerEdit } />
            <Route path='/' component={ TradeEnvironment } />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
