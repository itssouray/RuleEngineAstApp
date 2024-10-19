import { useState, useEffect } from "react";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "./ui/dialog"; // Import Shadcn UI Dialog components
import { Button } from "./ui/button";
import axios from "axios";

const CombineRulesDialog = ({ open, onClose, onCombine }) => {
  const [rules, setRules] = useState([]);
  const [selectedRuleIds, setSelectedRuleIds] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for rules

  // Fetch the rules when the dialog opens
  useEffect(() => {
    if (open) {
      fetchRules();
    }
  }, [open]);

  const fetchRules = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rules/get-all-rules`);
      setRules(response.data.rules);
    } catch (error) {
      console.error("Error fetching rules:", error);
      alert("Failed to fetch rules.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCheckboxChange = (ruleId) => {
    setSelectedRuleIds((prev) => {
      if (prev.includes(ruleId)) {
        return prev.filter((id) => id !== ruleId);
      } else if (prev.length < 2) {
        return [...prev, ruleId];
      } else {
        alert("You can only select two rules to combine.");
        return prev;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRuleIds.length !== 2) {
      alert("Please select exactly two rules to combine.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rules/combine`, {
        ruleIds: selectedRuleIds,
      });
      if (response.status === 200) {
        alert("Rules combined successfully!");
        onCombine(response.data.combinedRule); 
        onClose(); 
      } else {
        alert("Failed to combine rules: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error combining rules:", error);
      alert("Failed to combine rules. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Combine Two Rules</DialogTitle>
        {loading ? (
         
          <div className="flex justify-center items-center">
            <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
            <span className="ml-2"></span>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please select exactly two rules to combine.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="max-h-[40vh] overflow-y-auto rounded-md p-2 flex flex-col gap-2">
                {rules.map((rule) => (
                  <label
                    key={rule._id}
                    className="p-2 flex items-center gap-2 text-sm shadow"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRuleIds.includes(rule._id)}
                      onChange={() => handleCheckboxChange(rule._id)}
                      className="mr-2 text-sm"
                    />
                    <span className="text-gray-900 dark:text-gray-100">
                      {rule.ruleString} (ID: {rule._id})
                    </span>
                  </label>
                ))}
              </div>
              <Button
                type="submit"
                disabled={selectedRuleIds.length !== 2}
                className="mt-4"
              >
                Combine Selected Rules
              </Button>
            </form>
          </>
        )}
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default CombineRulesDialog;
