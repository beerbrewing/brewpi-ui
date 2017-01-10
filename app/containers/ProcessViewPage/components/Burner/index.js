import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
const classNames = require('classnames');

import styles from './styles.css';
import { SvgParent } from '../SvgParent';

const SvgBurner = require('./svg/burner.svg?tag=g');
const SvgFlame = require('./svg/flame.svg?tag=g');

class Burner extends React.Component {
  render() {
    const power = this.props.settings.power;
    const intensity = this.props.settings.intensity;
    const flameStyle = (intensity) ? { transform: `scaleY(${intensity / 100.0})` } : {};
    let flames;
    if (power) {
      flames = (
        <g className={styles.flames} style={flameStyle} >
          <SvgFlame className={styles.flame} />
          <SvgFlame className={styles.flame} />
          <SvgFlame className={styles.flame} />
          <SvgFlame className={styles.flame} />
          <SvgFlame className={styles.flame} />
        </g>
      );
    }
    return (
      <button className={styles.Burner} onClick={() => this.props.onClicked(this.props.id, this.props.settings.power)}>
        <SvgParent viewBox={'0 0 100 50'}>
          {flames}
          <SvgBurner className={styles.burner} />
        </SvgParent>
      </button>
    );
  }
}
Burner.propTypes = {
  settings: React.PropTypes.shape({
    power: React.PropTypes.boolean,
    intensity: React.PropTypes.number, // 0-100
  }),
  id: React.PropTypes.string,
  onClicked: React.PropTypes.func,
};
Burner.defaultProps = {
  settings: {
    power: false,
    intensity: 100,
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onClicked: (id, oldPower) => dispatch(actions.powerTogglableClicked(id, oldPower)),
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Burner);
