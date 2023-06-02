import React from "react";
import { Card } from "react-bootstrap";

import "./StatsCard.css";

const StatsCard = (props) => {
  return (
    <Card className="admin-home-stats-card">
      <img src={props.image} alt={props.label} />
      <h4>{props.heading}</h4>
      <p>{props.paragraph}</p>
    </Card>
  );
};

export default StatsCard;
