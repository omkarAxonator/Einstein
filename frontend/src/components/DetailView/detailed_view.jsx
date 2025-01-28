import React from "react";
import { useState,useEffect,useRef } from "react";
import "./DetailedView.css";
import {isCustomFieldAvailable} from "../../helper/helper"
import DeletePopup from "../common/deletepopup";
import LogoBox from "../ListView/taskcard/LogoBox";
import FormComponent from "../form/From";
import { getcustomFields } from "../../helper/helper";

const Detailed_View = ({ taskDetails, customfields,refreshDetailedView }) => {
  taskDetails.custom_fields = customfields;  
  const [showDeletePopup, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [availableCustomFields,setavailableCustomFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("100px");
  const contentRef = useRef(null);

 // Group custom fields for rendering in 3 columns, excluding specific keys
const excludedKeys = ['health', 'profile picture', 'company website'];
const filteredCustomFields = Object.entries(customfields || {}).filter(
  ([key]) => !excludedKeys.includes(key.toLowerCase())
);

const columnCount = 3;
const columns = Array.from({ length: columnCount }, (_, index) =>
  filteredCustomFields.filter((_, i) => i % columnCount === index)
);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("50px");
    }
  }, [isExpanded]);

  
  let trimmedWebsite =''
    try {
        const website = customfields['Company Website'].value;
        trimmedWebsite = website.replace(/https?:\/\//, '').replace(/\/$/, '');
        
    } catch (error) {
        trimmedWebsite = ''
    }

    async function formcustomfields() {
      const data = await getcustomFields(taskDetails.task_type_id,setError,setLoading);
      setavailableCustomFields(data)
      setShowForm(true)
    }

    // Handle modal toggle
  const toggleModal = () => {
    setShowForm(!showForm);
  };
  
  return (
    <div className="container pt-4 DetailedView">
      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Header Section */}
      <div className="row align-items-center">
        <div className="col-md-1">
            <LogoBox company_name={isCustomFieldAvailable("Company",customfields)} company_website={trimmedWebsite}/>
        </div>
        <div className="col-md-8 ps-3">
          <h4 className="m-0"><a className="text-decoration-none" href={isCustomFieldAvailable("Company Website",customfields)} target="_blank">{taskDetails.task_name}</a> </h4>
          <small className="text-muted">{taskDetails.parent_task_name == "Root" ? "" : taskDetails.parent_task_name}</small>
        </div>
        <div className="col-md-3 text-end">
          {Object.keys(customfields)==0?null:<span className={`badge bg-${customfields["Health"].value.toLowerCase()} me-2`}>{customfields['Health'].value}</span>}
          <span className="badge bg-primary">{taskDetails.status}</span>
          <div className="mt-2">
            <span>X%</span>
            <button className="btn btn-link p-0 ms-3 text-danger" onClick={()=>setShowModal(true)}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Project Details Section */}
      <div className="row mt-4">
        <div className="col-12">
          <h5>{taskDetails.task_type} Details</h5>
          <div className="p-2 mb-3 border border-dashed rounded bg-light">
            <div 
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: taskDetails.task_data }} 
              onDoubleClick={()=>formcustomfields()} 
              className={`task-data-Detailedcontainer ${isExpanded ? "expanded" : ""} `}
              onClick={toggleExpand}
              style={{maxHeight}}>

            </div>
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
          <div className="d-flex flex-wrap">
            <span className="badge bg-light text-dark me-2">Tags</span>
            <span className="badge bg-light text-dark me-2">Tags</span>
            <span className="badge bg-light text-dark">Tags</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="row mt-4" id="all-task-details">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="col-md-4">
            {column.map(([key, value]) => (
              <p key={key} className="m-2">
                <strong>{key}:</strong> {value.value || "N/A"}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Conditional Rendering of DeletePopup */}
      {showDeletePopup && (
        <DeletePopup
          task={taskDetails}
          fetchTasks={"fetchTasks"}
          onclose={setShowModal} // Close modal handler
        />
      )}

      {showForm && (
        <FormComponent 
        toggleModal={toggleModal} 
        refreshTasks={refreshDetailedView} 
        parent_task_id={taskDetails.parent_task_id} 
        selectedTabId={taskDetails.task_type_id} 
        selectedTabName={taskDetails.task_type} 
        availableCustomFields={availableCustomFields} 
        taskToEdit={taskDetails}/>)}

    </div>

    
  );
};

export default Detailed_View;
