import React, { useState, useEffect } from "react";
import "@/styles/manage-premium.css";
import Switcher from "react-switch";
import { apiClient } from "@/utils/apiClient";

interface TitleProps {
  guildId: string | string[] | undefined;
  title: string;
  module: string;
}

const Title: React.FC<TitleProps> = ({ title, module, guildId }) => {
  const [checked, setChecked] = useState<boolean>(true);

  useEffect(() => {
    apiClient(`/backend/api/guild/module`, "get", {
      params: {
        guildId,
        module,
      },
    }).then((res) => {
      if (res.success) {
        setChecked(res.data.bool === "on");
      }
    });
  }, [guildId, module]);

  return (
    <div className="PagesTitle_pages-title__E_aAk ">
      <div>
        <h3 className="mt-10">{title}</h3>
      </div>
      <div className="dramexSwi">
        <Switcher
          onChange={() => {
            setChecked(!checked);
            apiClient(`/backend/api/guild/module`, "post", {
              params: {
                guildId,
                module,
              },
              data: {
                bool: checked ? "on" : "off",
              },
            }).catch((err) => {
              console.log(err);
              setChecked(checked);
            });
          }}
          checked={checked}
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={37}
          height={40}
          width={80}
          borderRadius={20}
          className="react-switch-bg"
        />
        <div className="react-switch-handle" />
      </div>
    </div>
  );
};

export default Title;
