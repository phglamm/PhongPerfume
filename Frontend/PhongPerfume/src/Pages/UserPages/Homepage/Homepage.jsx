import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { route } from "../../../Routes";
import api from "../../../Config/Api";

export default function Homepage() {
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
      Homepage
      <Link to={route.about}>About</Link>
    </div>
  );
}
