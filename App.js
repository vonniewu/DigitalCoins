import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import BottomNavigation, {
    FullTab, IconTab
} from 'react-native-material-bottom-navigation';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';


import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from './components/HomeScreen';
import WatchlistScreen from './components/WatchlistScreen';
import SettingsScreen from "./components/SettingsScreen";


// const AppNavigator = createStackNavigator(
//     {
//       Home: HomeScreen,
//       Watchlist:  WatchlistScreen
//     },
//     {
//       initialRouteName: 'Home',
//     });
//
// export default createAppContainer(AppNavigator);

export default class App extends React.Component {

    tabs = [
        {
            key: 'Home',
            icon: 'home',
            label: 'Home',
            barColor: '#388E3C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'Watchlist',
            icon: 'heart',
            label: 'Watchlist',
            barColor: '#B71C1C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'Settings',
            icon: 'settings',
            label: 'Setting',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ];

    state = {
        activeTab: 'Home'
    };

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <IconTab
            isActive={isActive}
            showBadge={tab.key === 'movies-tv'}
            renderBadge={() => <Badge>2</Badge>}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )


    displayScreen() {
        if (this.state.activeTab == 'Home') {
            return <HomeScreen/>;
        } else if (this.state.activeTab == 'Watchlist') {
            return <WatchlistScreen/>;
        } else {
            return <SettingsScreen/>;
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {/* Your screen contents depending on current tab. */}
                    {this.displayScreen()}
                </View>
                <BottomNavigation
                    onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                    renderTab={this.renderTab}
                    tabs={this.tabs}
                />
            </View>
        )
    }
}