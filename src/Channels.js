import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import Card from "react-bootstrap/Card";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [userName, setUserName] = useContext(UserContext);

  useEffect(() => {
    if (userName) {
      fetch(`http://localhost:8080/messaging/channels/${userName.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((res) => setChannels(res));
    }
  }, [userName, channels]);

  return (
    <React.Fragment>
      {channels &&
        channels.map((channel) => (
          <Card key={channel.channel_id} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <a href={`channels/${channel.channel_id}`}>
                  {channel.firstName} {channel.lastName}
                </a>
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
    </React.Fragment>
  );
};

export default Channels;
