import { useEffect, useState } from "react";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "./ui/dialog"; // Shadcn UI components
import axios from "axios";
import { Button } from "./ui/button";

const ViewRuleAstDialog = ({ open, onClose, ruleId }) => {
  const [ruleAst, setRuleAst] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("rule id : ", ruleId);

  useEffect(() => {
    if (open && ruleId) {
      const fetchRuleAst = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/rules/view-ast/${ruleId}`
          ); // Fetch rule AST by ruleId
          setRuleAst(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching rule AST:", error);
          setLoading(false);
        }
      };

      fetchRuleAst();
    }
  }, [open, ruleId]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="max-w-lg">
        <DialogTitle className="">Rule AST</DialogTitle>
        <div className="p-4 max-h-[50vh] overflow-y-auto scrollbar-hide">
          {loading ? (
            <p>Loading AST...</p>
          ) : ruleAst ? (
            <pre className="bg-gray-100 rounded-md dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {JSON.stringify(ruleAst, null, 2)}
            </pre>
          ) : (
            <p>No AST available for this rule.</p>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="text-black dark:text-white"
          >
            Close
          </Button>
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default ViewRuleAstDialog;
