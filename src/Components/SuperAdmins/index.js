import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from '../Shared/Table/index';
import Modal from './Modal';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [showModal, setModal] = useState(false);
  const [superAdminId, setDeleteSuperAdmin] = useState();
  const headers = ['name', 'lastName', 'email'];

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  const deleteSuperAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        deleteSuperAdmin={deleteSuperAdmin}
        superAdminId={superAdminId}
      />
      <div>
        <Table
          data={superAdmins}
          headers={headers}
          setDelete={setDeleteSuperAdmin}
          setModal={setModal}
          url={'super-admins'}
        />
      </div>
    </section>
  );
};

export default SuperAdmins;
