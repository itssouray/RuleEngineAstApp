
import RuleForm from './RuleForm';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogContent,
  DialogClose,
} from './ui/dialog';

const RuleDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Create a New Rule</DialogTitle>
        <RuleForm onClose={onClose} />
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default RuleDialog;
