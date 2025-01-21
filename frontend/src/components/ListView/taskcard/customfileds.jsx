import React from "react";

function CustomFieldData({ task }) {
  const { custom_fields: customFields, ...taskWithoutCustomFields } = task;

  // List of keys to exclude
  const excludedKeys = ["task_id", "parent_task_id","task_name",'task_type_id','status_id','order_number','task_type',"task_data","parent_task_type_id","parent_task_type"];

  return (
    <div className="container col-7 m-0">
      <div className="row">
        {Object.entries(taskWithoutCustomFields)
          .filter(([key]) => !excludedKeys.includes(key)) // Filter out excluded keys
          .map(([key, value]) => (
            <div className="col-md-6 mb-1" key={key}>
              <strong>{key.toUpperCase()}:</strong> {value}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CustomFieldData;
