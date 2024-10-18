import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button"; 

const RulesList = ({ onEditRule }) => {
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/rules/get-all-rules"
      ); 
      setRules(response.data.rules);
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  const handleDelete = async (ruleId) => {
    try {
      await axios.delete(`http://localhost:7000/rules/delete-rule/${ruleId}`); 
      alert("Rule deleted successfully");
      fetchRules(); 
    } catch (error) {
      console.error("Error deleting rule:", error);
      alert("Failed to delete rule. Please try again.");
    }
  };

  useEffect(() => {
    fetchRules(); 
  }, []);

  return (
    <div className="space-y-4">
      {rules.length > 0 ? (
        rules.map((rule) => (
          <div
            key={rule._id}
            className="flex justify-between items-center p-4 border rounded-md"
          >
            <div>
              <p className="font-bold">{rule.ruleString}</p>
              <p className="text-sm text-gray-500">ID: {rule._id}</p>
            </div>
            <div>
              <Button
                onClick={() => onEditRule(rule)}
                className="mr-2 bg-blue-500 hover:bg-blue-600"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(rule._id)}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>No rules found.</p>
      )}
    </div>
  );
};

export default RulesList;
