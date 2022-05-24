import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { auth, logout, db } from '../../firebase/config';
import './Dashboard.css';

function Dashboard() {
  const [nameLoading, setNameLoading] = useState(true);
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate('/');
    getUserData();
  }, [user, loading]);

  const getUserData = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const docs = await getDocs(q);
      const userData = docs.docs[0].data();
      setNameLoading(false);
      setName(userData.name);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{nameLoading ? 'fetching data...' : name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
