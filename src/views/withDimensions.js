import React from 'react';
import { Dimensions } from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

export const isOrientationLandscape = ({ width, height }) => width > height;

export default function(WrappedComponent) {
  class DimensionsContainer extends React.Component {
    constructor() {
      super();

      const window = Dimensions.get('window');
      const safeAreaInsets = Dimensions.get('safeAreaInsets');
      const isLandscape = isOrientationLandscape(window);
      this.state = { isLandscape, window, safeAreaInsets };
    }

    componentDidMount() {
      Dimensions.addEventListener('change', this.handleOrientationChange);
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('change', this.handleOrientationChange);
    }

    handleOrientationChange = ({ window, safeAreaInsets }) => {
      const isLandscape = isOrientationLandscape(window);
      this.setState({ isLandscape, window, safeAreaInsets });
    };

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  return hoistNonReactStatic(DimensionsContainer, WrappedComponent);
}
