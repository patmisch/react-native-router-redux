import Tabs from 'react-native-tabs';
import React, { Component, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const onSelect = props => el => {
  props.actions.changeTab({
    from: props.activeTab,
    name: el.props.name,
    navigator: props.navigator,
  });

  return {
    selectionColor: props.tabStyles.tint || '#037AFF',
  };
};

const imageStyle = props => ({
  height: 25,
  resizeMode: 'contain',
  tintColor: props.selectionColor || 'white',
  width: 30,
});

const tabBarStyle = props => ({
  backgroundColor: props.tabStyles.barTint || '#F9F9F9',
  borderTopColor: '#D8D8D8',
  borderTopWidth: 1,
});

const tabContainerStyle = () => ({
  alignItems: 'center',
  justifyContent: 'center',
});

const textStyle = props => ({
  color: props.selectionColor || '#929292',
  fontSize: 12,
  letterSpacing: 0.2,
  marginBottom: 2,
});

class TabBarIcon extends Component {
  render() {
    const { name, tabItem } = this.props;

    return (
      <View name={name} style={tabContainerStyle()}>
        {tabItem.icon &&
          <Icon
            name={tabItem.icon}
            color={this.props.selectionColor || 'black'}
            size={30}
            borderRadius={0}
            />
        }
        {tabItem.title &&
          <Text style={textStyle(this.props)}>{tabItem.title}</Text>
        }
      </View>
    );
  }
}

export default class TabBar extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    const { tabs } = this.props;

    const tabBarItems = Object.keys(tabs).map(tabName => {
      const tab = tabs[tabName];
      const tabItem = tab.tabItem || {};

      return (
        <TabBarIcon
          key={tabName}
          name={tabName}
          tabItem={tabItem}
          tabStyles={this.props.tabStyles}
          />
      );
    });

    return (
      <Tabs
        activeOpacity={1.0}
        onSelect={onSelect(this.props)}
        selected={this.props.activeTab}
        style={tabBarStyle(this.props)}
        >
        {tabBarItems}
      </Tabs>
    );
  }
}
