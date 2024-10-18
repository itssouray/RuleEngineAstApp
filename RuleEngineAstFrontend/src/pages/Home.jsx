import React from "react";
import RulesList from "../components/RulesList";
import RuleDialog from "../components/RuleDialog";
import UserInputDialog from "../components/UserInputDialog";
import { useState } from "react";

const Home = () => {
  const [isRuleDialogOpen, setRuleDialogOpen] = useState(false);
  const [isUserInputDialogOpen, setUserInputDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  return (
    <div className="text-black dark:text-white ">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Rule Engine</h1>
      <p className="mb-4">
        This application allows you to create and manage rules based on user
        attributes.
      </p>

      <RulesList />

      <RuleDialog
        open={isRuleDialogOpen}
        onClose={() => {
          setRuleDialogOpen(false);
          setSelectedRule(null);
        }}
        selectedRule={selectedRule}
      />
      <UserInputDialog
        open={isUserInputDialogOpen}
        onClose={() => setUserInputDialogOpen(false)}
        onEvaluate={(result) => alert(`Evaluation result: ${result}`)}
      />
    </div>
  );
};

export default Home;
