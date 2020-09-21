import * as React from 'react';
import { StackNavigator } from '../../components';
import Profile from './Profile';

const ProfileNavigator: React.FC = () => <StackNavigator screens={[Profile]} />;

export default ProfileNavigator;
