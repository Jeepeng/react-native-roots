/**
 * react-native-roots
 * Created by Jeepeng on 2017/3/31.
 */

import React, { Component } from 'react';
import {
  View,
  DeviceEventEmitter,
  AppRegistry,
} from 'react-native';
import StaticContainer from 'react-static-container';
import invariant from 'invariant';

const originRegisterComponent = AppRegistry.registerComponent;

AppRegistry.registerComponent = (appKey, getComponentFunc) => {
  const elements = new Map();
  return originRegisterComponent(appKey, () => {
    const App = getComponentFunc();
    return class extends Component {
      constructor() {
        super();
        this.addRootView = this.addRootView.bind(this);
        this.removeRootView = this.removeRootView.bind(this);
      }

      componentWillMount() {
        DeviceEventEmitter.addListener('roots.add', this.addRootView);
        DeviceEventEmitter.addListener('roots.remove', this.removeRootView);
      }

      componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('roots.add');
        DeviceEventEmitter.removeAllListeners('roots.remove');
        elements.clear();
      }

      addRootView(key, element) {
	      invariant(
		      React.isValidElement(element),
		      'element must be valid react element!'
	      );
	      elements.set(key, element);
	      this.forceUpdate();
      }

      removeRootView (key) {
        if (elements.has(key)) {
          elements.delete(key);
          this.forceUpdate();
        }
      }

      render() {
        const roots = [];
        elements.forEach((element, key) => {
          roots.push(
            <StaticContainer key={key} shouldUpdate={false}>
            { element }
            </StaticContainer>
          );
        });

        return (
          <View style={{ flex: 1 }}>
            <StaticContainer shouldUpdate={false}>
              <App {...this.props} />
            </StaticContainer>
            { roots }
          </View>
        );
      }
    };
  });
};

export default {
  add(key, element) {
    DeviceEventEmitter.emit('roots.add', key, element);
  },
  remove(key) {
    DeviceEventEmitter.emit('roots.remove', key);
  },
};
