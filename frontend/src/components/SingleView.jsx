import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Detailed_View from './DetailView/detailed_view';
import AiDocument from './AiDocument/AiDocument';
import Tabs from './tabs/Tabs';
import Form from './form/From'
import Listview from './ListView/list_view';

const SingleView = () => {
  let [taskTypeCode, setTaskTypeCode] = useState('root');
  let [tabsData,setTasbData] = useState([]);
  let [taskId,setTaskId] = useState(1);
  let [taskDetails,setTaskDetails] = useState({});
  let [CustomDetails,setCustomDetails] = useState({});
  const [detailedtaskToEdit, setdetailedTaskToEdit] = useState(null); // Task being edited
  let location = useLocation();
  

  // Set taskTypeCode from the query parameter
  useEffect(() => {
        const taskTypeCodeFromQuery = getid('scope'); // 'scope' query param is expected
        const taskidFromQuery = getid('pid'); // 'task' query param is expected
        
        if (taskTypeCodeFromQuery) {
        setTaskTypeCode(taskTypeCodeFromQuery);
        }
    
        if (taskidFromQuery) {
        setTaskId(taskidFromQuery); // Update taskId
        }
    }, [location.search]); // Trigger when query changes
    
    useEffect(()=>{
        fetchtabs(); // Fetch tabs when taskTypeCode changes
        getTaskDetails();
    },[taskId,taskTypeCode])
  
async function getTaskDetails() {
    try {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks/${taskId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task_id: taskId }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.status}`);
        }
  
        const data = await response.json();
        const customfields = data.customFields;
        const defaultfileds = data.taskDetails;

        setTaskDetails(defaultfileds)
        setCustomDetails(customfields)
        setdetailedTaskToEdit(data)
        
      } catch (error) {
        console.error(error.message);
      }
  }
  // Fetch function to call the API
  async function fetchtabs() {
    try {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks/get_tabs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ display_name_singular: taskTypeCode }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.status}`);
        }
  
        const data = await response.json();
        const display_name_plural = data.display_name_plural;
        const display_name_singular = data.display_name_singular;
        const tabIds = data.tabsid;
        
        const transformedData = display_name_plural.map((plural_name,idx) => ({
            label: plural_name,
            content: <Listview taskTypeCode={taskTypeCode} filtertasktype={plural_name} parenntId={taskId} selectedTabId={tabIds[idx]} selectedTabname={display_name_singular[idx]}/>
            ,
        }));
        setTasbData(transformedData); // Update the tasks state with the response data
      } catch (error) {
        console.error(error.message);
      }
  }

    // Function to extract query parameters
    const getid = (param) => {
        try {
            const queryParams = new URLSearchParams(location.search);
            return queryParams.get(param);
        } catch (error) {
            console.warn(error);  // Log the error for debugging purposes
            return null;  // Return null in case of an error
        }
    };

    return (
        <div className='singleView' id='singleView'>
            <Detailed_View taskDetails={taskDetails} customfields={CustomDetails} refreshDetailedView ={getTaskDetails}/>
            <AiDocument/>
            <Tabs tabs={tabsData} />
            {/* <Form/> */}
        </div>
    );
};

export default SingleView;
