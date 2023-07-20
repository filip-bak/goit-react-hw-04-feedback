import { useState } from 'react';

import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedbackState = name => {
    setFeedback(state => ({
      ...state,
      [name]: state[name] + 1,
    }));
  };

  const handleEmptyFeedback = () => {
    const { good, neutral, bad } = feedback;
    if (good === 0 && neutral === 0 && bad === 0) {
      return false;
    } else {
      return true;
    }
  };
  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((acc, value) => {
      return acc + value;
    }, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
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
