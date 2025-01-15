import { ReadingType } from "../types/ReadingType";
import RemoveIcon from "../assets/remove.svg";

type Props = {
  reading: ReadingType;
  onDeleteClick: () => void;
};

export default function Reading({ reading, onDeleteClick }: Props) {
  return (
    <div className=" flex items-center py-1">
      <button
        className="p-1 rounded-md bg-red-400 mr-4"
        onClick={onDeleteClick}
      >
        <img
          width={14}
          height={14}
          src={RemoveIcon}
          alt="delete reading icon"
        />
      </button>
      <span className=" flex-1">
        {new Date(reading.timestamp).toLocaleTimeString()}
      </span>
      <div className="text-gray-800">
        <span className="text-xl">{reading.ml}</span>ml
      </div>
    </div>
  );
}
