import React from "react";
import { Input } from "antd";
import "./style.scss";

const EbarimtToggle = ({ ebarimt, setEbarimt }) => {
  const registerNumber = ebarimt ? (
    ""
  ) : (
    <div className="box">
      <div className="item">
        <Input type="number" placeholder="Байгууллагын РД" />
      </div>
    </div>
  );
  return (
    <div>
      <div className="subtitle">И-баримт</div>
      <div className="ebarimt">
        <div className="box">
          <div className="radios">
            <div
              className={ebarimt ? "radio active" : "radio"}
              onClick={() => setEbarimt(true)}
            >
              Хувь хүн
            </div>
            <div
              className={ebarimt ? "radio " : "radio active"}
              onClick={() => setEbarimt(false)}
            >
              Байгууллага
            </div>
          </div>
        </div>
        {registerNumber}
      </div>
    </div>
  );
};

export default EbarimtToggle;
