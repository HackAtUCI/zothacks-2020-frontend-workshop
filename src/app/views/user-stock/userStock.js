import React from "react";
import './userStock.scss';

import { useParams } from "react-router-dom";
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';


function UserStock() {

  let { userId } = useParams();

  const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
  ];

  return (
    <div className="user-stock">
      <div className="selected-stock flex-center">
        <XYPlot height={400} width= {500}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Date"/>
          <YAxis title="Price"/>
          <LineSeries className="first-seriess" data={data} />
        </XYPlot>
      </div>
    </div>
  );
}

export default UserStock;
