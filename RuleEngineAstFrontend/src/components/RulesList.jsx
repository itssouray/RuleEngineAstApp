import { useEffect, useState } from "react";
import axios from "axios";
import RuleCard from "./RuleCard";
import UpdateRuleDialog from "./UpdateRuleDialog";
import ViewRuleAstDialog from "./ViewRuleAstDialog";

const RulesList = () => {
  const [rules, setRules] = useState([]);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [selectedViewRule, setSelectedViewRule] = useState(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);

  const fetchRules = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rules/get-all-rules`
      );
      setRules(response.data.rules);
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  const handleDelete = async (ruleId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/rules/delete-rule/${ruleId}`);
      alert("Rule deleted successfully");
      fetchRules();
    } catch (error) {
      console.error("Error deleting rule:", error);
      alert("Failed to delete rule. Please try again.");
    }
  };

  const handleUpdate = (ruleId) => {
    const ruleToUpdate = rules.find((rule) => rule._id === ruleId);
    setSelectedRule(ruleToUpdate);
    setUpdateDialogOpen(true);
  };

  const handleView = (ruleId) => {
    console.log(ruleId);
    
    const ruleToView = rules.find((rule) => rule._id === ruleId);
    console.log("Rule to view:", ruleToView);
    if (ruleToView) {
      setSelectedViewRule(ruleToView);
      setViewDialogOpen(true);
    } else {
      console.error("No rule found with id:", ruleId);
    }
  };

  const updateRule = (updatedRule) => {
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule._id === updatedRule._id ? updatedRule : rule
      )
    );
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rules.length > 0 ? (
          rules.map((rule) => (
            <RuleCard
              key={rule._id}
              rule={rule}
              onEdit={() => handleUpdate(rule._id)}
              onDelete={() => handleDelete(rule._id)}
              onView={() => handleView(rule._id)}
            />
          ))
        ) : (
          <p>No rules found.</p>
        )}
      </div>

      {selectedRule && (
        <UpdateRuleDialog
          open={isUpdateDialogOpen}
          onClose={() => setUpdateDialogOpen(false)}
          rule={selectedRule}
          onUpdate={updateRule}
        />
      )}

      {selectedViewRule && (
        <ViewRuleAstDialog
          open={isViewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          ruleId={selectedViewRule._id}
        />
      )}
    </>
  );
};

export default RulesList;
