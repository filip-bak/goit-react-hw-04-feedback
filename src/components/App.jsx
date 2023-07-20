import React, { Component } from 'react';

import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedbackState = name => {
    this.setState(prevState => ({
      [name]: prevState[name] + 1,
    }));
  };

  handleEmptyFeedback = () => {
    const { good, neutral, bad } = this.state;
    if (good === 0 && neutral === 0 && bad === 0) {
      return false;
    } else {
      return true;
    }
  };
  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, value) => {
      return acc + value;
    }, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;

    const value =
      Math.round(((good * 100) / this.countTotalFeedback()).toFixed(0)) || 0;
    return value + '%';
  };

  render() {
    return (
      <div className="wrapper">
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.handleFeedbackState}
          />
        </Section>
        <Section title="Statistics">
          {this.handleEmptyFeedback() ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}
