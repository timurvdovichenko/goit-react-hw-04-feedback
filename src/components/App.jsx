import Notification from './Notification/Notification';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';

import { useState } from 'react';

const App = () => {
  const [feedbackGood, setFeedbackGood] = useState(0);
  const [feedbackNeutral, setFeedbackNeutral] = useState(0);
  const [feedbackBad, setFeedbackBad] = useState(0);
  const feedbackState = { good: feedbackGood, bad: feedbackBad, neutral: feedbackNeutral };

  const onClickChange = name => {
    if (name === 'good') {
      setFeedbackGood(feedbackGood + 1);
    }
    if (name === 'neutral') {
      setFeedbackNeutral(feedbackNeutral + 1);
    }
    if (name === 'bad') {
      setFeedbackBad(feedbackBad + 1);
    }
  };

  function countTotalFeedback() {
    const { good, neutral, bad } = feedbackState;
    return good + neutral + bad;
  }
  const countPositiveFeedbackPercentage = () => {
    const positiveFeedbackPercentage = Math.floor(
      100 * (feedbackState.good / countTotalFeedback()),
    );
    return isNaN(positiveFeedbackPercentage) ? 0 : positiveFeedbackPercentage;
  };

  const stateObject = Object.keys(feedbackState);
  const feedbackPercentage = countPositiveFeedbackPercentage();
  const { good, neutral, bad } = feedbackState;
  const totalFeedback = countTotalFeedback();

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={stateObject} onLeaveFeedback={onClickChange} />
      </Section>
      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={feedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;
