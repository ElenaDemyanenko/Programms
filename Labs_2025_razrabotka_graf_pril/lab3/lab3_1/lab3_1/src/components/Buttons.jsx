import React, { useState } from 'react';

const Buttons = ({ count = 3 }) => {
  const [counters, setCounters] = useState(Array(count).fill(0));
  const [lastClicked, setLastClicked] = useState(null);

  const handleClick = (index) => {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
    setLastClicked(index);
  };

  const getButtonVariant = (index) => {
    if (lastClicked === index) return 'success';
    if (counters[index] > 0) return 'info';
    return 'primary';
  };

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
      {counters.map((counter, index) => (
        <button
          key={index}
          className={`btn btn-${getButtonVariant(index)} position-relative`}
          style={{
            width: '120px',
            height: '80px',
            transition: 'transform 0.2s',
          }}
          onClick={() => handleClick(index)}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span className="fs-3 d-block">{counter}</span>
          <small className="position-absolute top-0 end-0 mt-1 me-2 opacity-50"></small>
        </button>
      ))}
    </div>
  );
};

export default Buttons;