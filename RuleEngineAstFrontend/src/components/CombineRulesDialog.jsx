import { useState } from "react";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "./ui/dialog"; // Import Shadcn UI Dialog components
import { Button } from "./ui/button";
import axios from "axios";

const CombineRulesDialog = ({ open, onClose, rules, onCombine }) => {
  const [selectedRuleIds, setSelectedRuleIds] = useState([]);

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
      console.log("id's : ",selectedRuleIds);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rules/combine`, {
        ruleIds: selectedRuleIds,
      });
      console.log("res : ",response);
      if (response.status === 200) {
        console.log("success");
        alert("Rules combined successfully!");
        onCombine(response.data.combinedRule); // Pass the combined rule to the parent component
        onClose(); // Close the dialog
      } else {
        // Handle unexpected status
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
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Please select exactly two rules to combine.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="max-h-[40vh] overflow-y-auto rounded-md p-2 flex flex-col gap-2">
            {" "}
            {/* Scrollable area for rules */}
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
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default CombineRulesDialog;
