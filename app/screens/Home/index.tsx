import * as React from 'react';
import { StackNavigator } from '../../components';
import Home from './Home';

const HomeNavigator: React.FC = () => <StackNavigator screens={[Home]} />;

export default HomeNavigator;
