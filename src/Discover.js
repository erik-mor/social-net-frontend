import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import Card from "react-bootstrap/Card";

const Discover = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useContext(UserContext);

  useEffect(() => {
    if (userName) {
      fetch(`http://localhost:8080/user/discover/${userName.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((res) => setUsers(res.users));
    }
  }, [userName]);

  return (
    <React.Fragment>
      {users &&
        users.map((user) => (
          <Card key={user.id} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <a href={`profile/${user.id}`}>
                  {user.firstName} {user.lastName}
                </a>
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
    </React.Fragment>
  );
};

export default Discover;
