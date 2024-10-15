import React from 'react'

const Test = () => {
  return (
    <>
      <h2>Test</h2>
      <p>This is my test {process.env.REACT_APP_SECRET_KEY}</p>

    </>
  );
};

export default Test;