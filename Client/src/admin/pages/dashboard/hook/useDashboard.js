import  { useEffect, useState } from 'react'
import { getAllUsers } from '../../../../api/admin/user.api';

function useDashboard() {
     // Store user list
  const [users, setUsers] = useState([]);

  // Total user count
  const [userCount, setUserCount] = useState(0);

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();

        setUsers(data.users);
        setUserCount(data.totalUsers);

      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    loadUsers();
  }, []);

  return {
userCount,
users,

  }
}

export default useDashboard