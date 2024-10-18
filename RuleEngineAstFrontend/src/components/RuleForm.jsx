import { useState } from 'react';
import axios from 'axios';
import {Textarea}  from './ui/textarea';
import { Button } from './ui/button';

const RuleForm = () => {
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rules/create`, {
        ruleString,
      });
      alert('Rule created successfully: ' + response.data.rule.ruleString);
      setRuleString('');
    } catch (error) {
      console.error('Error creating rule:', error);
      alert('Failed to create rule. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-white">
      <Textarea
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter rule string here..."
        required
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
      />
      <Button type="submit">Create Rule</Button>
    </form>
  );
};

export default RuleForm;
