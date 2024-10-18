import React, { useState } from 'react';
import UserInput from '../components/UserInput';


const EvaluateRule = () => {
  const [result, setResult] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Evaluate a Rule</h1>
      <UserInput onEvaluate={setResult} />
    </div>
  );
};

export default EvaluateRule;
