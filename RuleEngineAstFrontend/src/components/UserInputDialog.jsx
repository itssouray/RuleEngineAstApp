import UserInput from './UserInput';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogContent,
  DialogClose,
} from './ui/dialog';

const UserInputDialog = ({ open, onClose, onEvaluate }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle >Evaluate a Rule</DialogTitle>
        <UserInput onEvaluate={onEvaluate} />
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default UserInputDialog;
