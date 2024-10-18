import { MdModeEdit } from "react-icons/md";
import { MdDelete, MdContentCopy } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

const RuleCard = ({ rule, onEdit, onDelete, onView }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(rule._id);
    } catch (error) {
      console.error("Failed to copy: ", error);
      alert("Failed to copy Rule ID.");
    }
  };

  console.log("rules : ", rule);

  return (
    <div className="flex flex-col justify-between p-4 border rounded-md shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col gap-4">
        <p className="font-bold text-sm text-gray-900 dark:text-gray-100">
          {rule.ruleString}
        </p>
        <p className="text-sm text-green-500 flex gap-3 items-center">
          ID: {rule._id}{" "}
          <button
            onClick={copyToClipboard}
            className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
          >
            <MdContentCopy size={15} />
          </button>
        </p>
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <button onClick={() => onView(rule._id)} className="text-blue-500">
          <IoMdEye />
        </button>
        <button onClick={onEdit} className="text-orange-500">
          <MdModeEdit />
        </button>
        <button onClick={onDelete} className="text-red-500">
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default RuleCard;
