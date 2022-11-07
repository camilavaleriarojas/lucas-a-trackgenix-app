import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import EmployeesList from './List';
import Modal from '../Shared/Modal';

function Employees() {
  const [employees, saveEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      saveEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteEmployee = async () => {
    const id = employeeId;
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE'
    });
    saveEmployees([...employees.filter((employee) => employee._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={deleteEmployee}
        actionButton="Delete"
      >
        <div>
          <h4>Delete employee</h4>
          <p>Are you sure you want to delete this employee?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
      <h2>Employees</h2>
      <div>
        <EmployeesList
          list={employees}
          setEmployeeId={setEmployeeId}
          setShowModal={() => setShowModal(true)}
          saveEmployees={saveEmployees}
        />
      </div>
    </section>
  );
}

export default Employees;
