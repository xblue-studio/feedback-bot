import React from "react";

interface SaverProps {
  view: boolean;
  onCancel: () => void;
  onSave: () => void;
}

const Saver: React.FC<SaverProps> = ({ view, onCancel, onSave }) => {
  return (
    <div
      className={`confo row animate__animated ${
        view ? "animate__fadeInUp" : "animate__fadeOutDown"
      }`}
    >
      <div className="col-md-6 col-sm-6 confoText">
        Careful — you have unsaved changes!
      </div>
      <div className="col-md-6 col-sm-6 confoButtons">
        <button type="button" className="unsaved__close-btn" onClick={onCancel}>
          Cancel
        </button>
        <div
          className="unsaved__save-btn gap-2"
          style={{ position: "relative" }}
          onClick={onSave}
        >
          Save Changes
        </div>
      </div>
    </div>
  );
};

export default Saver;
