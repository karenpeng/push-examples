import React from 'react';
import styles from './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.app}>
        <div>This is a SSE example</div>
        <div>Please open your console</div>
      </div>
    );
  }
}
