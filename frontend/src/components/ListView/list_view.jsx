import React, { useEffect, useState } from 'react';
import TaskCard from './taskcard/taskCard';
import FormComponent from '../form/From';
import { getcustomFields } from '../../helper/helper';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
 

const Listview = ({taskTypeCode,filtertasktype,parenntId,selectedTabId,selectedTabname}) => {
  
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // For toggling modal visibility
  const [availableCustomFields,setavailableCustomFields] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // Task being edited


  // Fetch tasks when taskTypeCode is set
  useEffect(() => {
    if (taskTypeCode) {
      fetchTasks();
    }
  }, [taskTypeCode, parenntId]); // Trigger on either variable change
  
  
    useEffect(() => {
      async function availableCustomFields() {
        const data = await getcustomFields(selectedTabId,setError,setLoading);
        setavailableCustomFields(data)
      }
      availableCustomFields();
      
    }, [selectedTabId, selectedTabname]);

  // Fetch function to call the API
  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tasks/get_scope`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ display_name_singular: taskTypeCode, parent_task_id:parenntId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
      }

      const data = await response.json();
      
      setTasks(data); // Update the tasks state with the response data
    } catch (error) {
      setError(error.message); // Update error state in case of failure
    } finally {
      setLoading(false); // Set loading to false once the fetch is done
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };
  

  // Handle modal toggle
  const toggleModal = () => {
    setShowModal(!showModal);
    setTaskToEdit(false)
  };
  

  return loading ? 
    (
    <div className='container d-flex justify-content-center'>
      <DotLottieReact
        src="https://lottie.host/fc278a4c-abe0-4e17-9c4b-d2e06ab3ce6e/FHHmq9VFBO.lottie"
        loop
        autoplay
      />
    </div>
    ):(
      <div className="container">
      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}
      <h1>Task List</h1>
      <button className="btn btn-primary m-3" onClick={toggleModal}>Add +</button>

      {/* Task list */}
      <div className="task-list">
        {tasks.length > 0 ? (
          <ul className="list-group">
            {tasks.map((task) => (
              selectedTabId == task.task_type_id &&
              (!parenntId || parenntId == task.parent_task_id || taskTypeCode=="all") && (
                <TaskCard task={task} fetchTasks={fetchTasks} key={task.task_id} onEdit ={() => handleEditTask(task)}/>
              )
            ))}
          </ul>
        ):null}
      </div>

      {/* Modal for adding a new task */}
      {showModal && (<FormComponent toggleModal={toggleModal} refreshTasks={fetchTasks} parent_task_id={parenntId} selectedTabId={selectedTabId} selectedTabName={selectedTabname} availableCustomFields={availableCustomFields} taskToEdit={taskToEdit}/>)}
    </div>
  );
};

export default Listview;
