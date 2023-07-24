import { useState } from 'react';

import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = {
    good,
    neutral,
    bad,
  };

  const handleFeedbackState = name => {
    if (name === 'good') setGood(state => state + 1);
    if (name === 'neutral') setNeutral(state => state + 1);
    if (name === 'bad') setBad(state => state + 1);
    // setFeedback(state => ({
    //   ...state,
    //   [name]: state[name] + 1,
    // }));
  };

  const handleEmptyFeedback = () => {
    if (good === 0 && neutral === 0 && bad === 0) {
      return false;
    } else {
      return true;
    }
  };
  const countTotalFeedback = () => {
    return [good, neutral, bad].reduce((acc, value) => {
      return acc + value;
    }, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const value =
      Math.round(((good * 100) / countTotalFeedback()).toFixed(0)) || 0;

    return value + '%';
  };

  return (
    <div className="wrapper">
      <Section title="Please leave feedback">
        <FeedbackOptions onLeaveFeedback={handleFeedbackState} />
      </Section>
      <Section title="Statistics">
        {handleEmptyFeedback() ? (
          <Statistics
            feedback={feedback}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
