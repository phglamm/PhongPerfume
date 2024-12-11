import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { route } from "../../../Routes";
import api from "../../../Config/api";

export default function UserManagement() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await api.get("User");
      console.log(response.data);
      setUser(response.data);
    }
    fetchUsers();
  }, []);
  return (
    <div>
      UserManagement
      <Link to={`${route.admin}/${route.perfumeManagement}`}>perfume</Link>
    </div>
  );
}
