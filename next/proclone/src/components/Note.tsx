import { useState } from "react";

interface NoteProps {
  type?: "warn" | "info" | "error"; // Define possible types
  children: React.ReactNode;
}

export default function Note({ type = "info", children }: NoteProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null; // Hide the component when closed

  const typeClass = {
    warn: "style_icon-warning__hIfSl",
    info: "style_info__WFpBB",
    error: "style_error__SAJVn",
  }[type];

  return (
    <div className={`style_container__f18GI ${typeClass} mb-15`}>
      <span>
        <i
          className={`iconify fas style_icon__eq_V8 ${
            type === "warn"
              ? "fa-exclamation-triangle"
              : type === "error"
              ? "fa-times-circle"
              : "fa-info-circle"
          }`}
        />
        {children}
      </span>
      <div className="style_close__7KryQ">
        <i
          className="fas fa-times"
          onClick={() => {
            console.log(children, "children", type, "note");

            setVisible(false);
          }}
        />
      </div>
    </div>
  );
}
