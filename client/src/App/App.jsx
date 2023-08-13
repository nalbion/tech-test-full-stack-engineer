import { hot } from 'react-hot-loader/root';
import React from 'react';
import GlobalStyle from '../theme';
import { Application } from './styles';
import ShipsDashboard from '../pages/ships-dashboard';

const App = () => (
    <>
        <Application >
            <ShipsDashboard />
        </Application>
        <GlobalStyle />
    </>
);

export default hot(App);
