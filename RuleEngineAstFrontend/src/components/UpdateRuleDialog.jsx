import { useState } from 'react';
import { Dialog, DialogOverlay, DialogTitle, DialogContent, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import axios from 'axios';

const UpdateRuleDialog = ({ open, onClose, rule, onUpdate }) => {
  const [ruleString, setRuleString] = useState(rule.ruleString || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/rules/update`, {
        ruleId:rule._id,
        ruleString,
      });

      if (response.status === 200) {
        console.log("success");
        alert("Rules updated successfully!");
        onClose(); // Close the dialog
      } else {
        // Handle unexpected status
        alert("Failed to update rules: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error('Error updating rule:', error);
      alert('Failed to update rule. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Update Rule</DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            placeholder="Update your rule here..."
            required
            className="text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <Button type="submit">Update Rule</Button>
        </form>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRuleDialog;
