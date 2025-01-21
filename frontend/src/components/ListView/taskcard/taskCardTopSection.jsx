import React, { useState, useRef, useEffect } from "react";
import Titlebox from "./titlebox";
import ActionBtns from "./actionBtns";
import CustomFiledData from "./customfileds";
import "./taskCard.css";

function TaskCardTopSection({ task }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("100px");
  const contentRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("100px");
    }
  }, [isExpanded]);

  return (
    <div className="col">
      {/* Header Section */}
      <div className="row">
        <div className="col d-flex">
          <Titlebox task={task} subtitle={"Latest AI document"} />
          {/* <ActionBtns/> */}
          <CustomFiledData task={task} />
        </div>
      </div>

      {/* Task Data Section */}
      <div className="row mt-3">
        <div
          ref={contentRef}
          className={`task-data-container ${isExpanded ? "expanded" : ""} bg-light`}
          onClick={toggleExpand}
          style={{ maxHeight }}
          dangerouslySetInnerHTML={{ __html: task.task_data }}
        ></div>
        {!isExpanded && (
          <div
            style={{
              textAlign: "center",
              marginTop: "-20px",
              cursor: "pointer",
              color: "#007bff",
            }}
          >
                    <i className="bi bi-arrow-bar-down"></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCardTopSection;
