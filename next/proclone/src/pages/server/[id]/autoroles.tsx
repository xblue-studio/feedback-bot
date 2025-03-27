import React, { useEffect, useState } from "react";
import Select from "react-select";
import Saver from "@/components/save";
import Note from "@/components/Note";
import Title from "@/components/title";
import "@/styles/settings.css";
import { useRouter } from "next/router";
import { apiClient } from "@/utils/apiClient";

const AutoRoles: React.FC = () => {
  const router = useRouter();
  const [save, setSave] = useState<boolean>(false);
  const guildId = router.query.id;
  const [options, setOptions] = useState<
    {
      id: string;
      color: string;
      name: string;
    }[]
  >([]);
  const [human, setHuman] = useState<string[]>([]);
  const [_human, setHuman2] = useState<string[]>([]);
  const [bot, setBot] = useState<string[]>([]);
  const [_bot, setBot2] = useState<string[]>([]);

  useEffect(() => {
    if (human !== _human || bot !== _bot) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [human, bot, _human, _bot]);

  useEffect(() => {
    if (guildId) {
      apiClient("/backend/api/guild/autoroles", "get", {
        params: { guildId: guildId },
      }).then((res) => {
        if (res.success) {
          setOptions(res.data.roles);
          setHuman(res.data.human);
          setHuman2(res.data.human);
          setBot(res.data.bot);
          setBot2(res.data.bot);
        }
      });
    }
  }, [guildId]);

  return (
    <section className="dashboard-container">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            <Title
              title={"Auto Roles"}
              module={"auto_roles"}
              guildId={guildId}
            />

            <Saver
              view={save}
              onCancel={() => {
                setHuman(_human);
                setBot(_bot);
              }}
              onSave={() => {
                apiClient("/backend/api/guild/autoroles", "post", {
                  params: {
                    guildId: guildId,
                  },
                  data: {
                    human: human,
                    bot: bot,
                  },
                }).then((res) => {
                  if (res.success) {
                    setHuman2(human);
                    setBot2(bot);
                    setSave(false);
                  }
                });
              }}
            />

            <Note type="warn">
              When the Discord rule-screen panel is activated, new users must
              accept the rules before they can receive the auto-role. Also,
              ensure that the assigned roles do not have administrative
              permissions!
            </Note>

            <label className="control-label" htmlFor="channel">
              Auto Roles
            </label>
            <Select
              isMulti
              placeholder="Select .."
              classNamePrefix="formselect"
              inputId="react-select-3-input"
              aria-describedby="react-select-3-placeholder"
              value={human.map((x) => {
                return {
                  label: options.find((y) => y.id === x)?.name,
                  value: x,
                  color: options.find((y) => y.id === x)?.color,
                };
              })}
              options={options.map(({ id, color, name }) => {
                return {
                  label: name,
                  value: id,
                  color: color,
                };
              })}
              onChange={(e) => {
                setHuman(e.map((x) => x.value));
              }}
            />
            <label className="control-label mt-10" htmlFor="channel">
              AUTO ROLES FOR BOTS
            </label>
            <Select
              isMulti
              placeholder="Select .."
              classNamePrefix="formselect"
              inputId="react-select-4-input"
              aria-describedby="react-select-4-placeholder"
              value={bot.map((x) => {
                return {
                  label: options.find((y) => y.id === x)?.name,
                  value: x,
                  color: options.find((y) => y.id === x)?.color,
                };
              })}
              options={options.map(({ id, color, name }) => {
                return {
                  label: name,
                  value: id,
                  color: color,
                };
              })}
              onChange={(e) => {
                setBot(e.map((x) => x.value));
              }}
            />
            <hr className="mt-20 mb-20" />
            <div>
              <div className="d-flex flex-wrap gap-3 justify-content-between mb-10">
                <h5 className="m-0 d-flex flex-wrap gap-2 align-items-center">
                  Assign Role To Specific Invite
                  <span
                    className="vip-component-tag"
                    style={{ marginInlineStart: 0 }}
                  >
                    Premium
                  </span>
                </h5>
                <button className="btn btn-secondary btn-icon" disabled={true}>
                  <i className="fas fa-plus" />
                  Add
                </button>
              </div>
            </div>
          </div>
          <div style={{ height: 100 }} />
        </div>
      </div>
    </section>
  );
};

export default AutoRoles;
