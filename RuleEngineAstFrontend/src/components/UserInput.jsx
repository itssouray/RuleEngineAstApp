import { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';

const UserInput = ({ onEvaluate }) => {
  const [userData, setUserData] = useState({
    ruleId: '',
    age: '',
    department: '',
    salary: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rules/evaluate`, {
        ruleId: userData.ruleId,
        userData: {
          age: userData.age,
          department: userData.department,
          salary: userData.salary,
          experience: userData.experience,
        },
      });
      onEvaluate(response.data.result);
    } catch (error) {
      console.error('Error evaluating rule:', error);
      alert('Failed to evaluate rule. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <Input
        type="text"
        name="ruleId"
        placeholder="Rule ID"
        value={userData.ruleId}
        onChange={handleChange}
        required
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
      />
      <Input
        type="number"
        name="age"
        placeholder="Age"
        value={userData.age}
        onChange={handleChange}
        required
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
      />
      <Input
        type="text"
        name="department"
        placeholder="Department"
        value={userData.department}
        onChange={handleChange}
        required
       className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
      />
      <Input
        type="number"
        name="salary"
        placeholder="Salary"
        value={userData.salary}
        onChange={handleChange}
        required
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
      />
      <Input
        type="number"
        name="experience"
        placeholder="Experience (years)"
        value={userData.experience}
        onChange={handleChange}
        required
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
      />
      <Button type="submit">Evaluate User</Button>
    </form>
  );
};

export default UserInput;
