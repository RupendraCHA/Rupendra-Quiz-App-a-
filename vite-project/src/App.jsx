// src/App.js
import React from 'react';
import QuestionNavigator from './components/QuestionNavigator.jsx';

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>QR Code Quiz</h1>
      <QuestionNavigator />
    </div>
  );
};

export default App;
