import PropTypes from 'prop-types';
import styles from './FeedbackOptions.module.css';

const FeedbackOptions = ({ onLeaveFeedback }) => {
  const handleClick = e => {
    const name = e.target.textContent.toLowerCase();
    onLeaveFeedback(name);
  };

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={handleClick}>
        Good
      </button>
      <button className={styles.btn} onClick={handleClick}>
        Neutral
      </button>
      <button className={styles.btn} onClick={handleClick}>
        Bad
      </button>
    </div>
  );
};

FeedbackOptions.propTypes = {
  onClick: PropTypes.func,
};

export default FeedbackOptions;
