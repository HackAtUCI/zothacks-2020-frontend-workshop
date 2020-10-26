import React, { useState, useEffect } from "react";
import "./userStock.scss";

import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from "react-vis";

function UserStock() {
  
  // Variables containing stock information for this page
  const [stock, setStock] = useState(null);
  const [stockPrices, setStockPrices] = useState(null);
  // UseParams hook gets the variable in the URL, utilizing the variable name in the route param in App.js
  let { selectedStockId } = useParams();

  // If we have a valid selected company, then we can get the stock information
  useEffect(() => {
    if (selectedStockId) {
      getStock();
    } else {
      console.log("Invalid selectedCompany");
    }
  }, []);

  // If we pulled the stock information, we can get the stock prices for the last couple days
  useEffect(() => {
    if (stock) {
      getStockPrices();
    }
  }, [stock]);

  // Performs a GET request to the backend API to get the stock information for the given company
  async function getStock() {
    let stocks = await axios.get(
      "https://zothacks-2020-workshop.herokuapp.com/stock?_id=" + selectedStockId
    );

    // If we have a valid request and have at least one stock pulled, we can set the selected stock
    if (stocks.status === 200 && stocks.data) {
      setStock(stocks.data.data[0]);
    } else {
      console.log("Error pulling stock");
    }
  }

  // Performs a GET request to the Finnhub API to get some prices from the stock 
  async function getStockPrices() {
    let finnhubResponse = await axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${stock.symbol}&resolution=1&from=1572651390&to=1572910590&token=${process.env.REACT_APP_FINNHUB_SECRET}`
    );

    // If we have a valid response, we can set the object to represent the prices
    if (finnhubResponse.status === 200) {
      setStockPrices(finnhubResponse.data.o);
    } else {
      console.log("Error pulling stock prices");
    }
  }

  // Formats the stock prices to a format that is readable by React-vis
  function formatStockPrices() {
    if (!stockPrices) {
      return [];
    } else {
      // Map function that alters the information in teh array
      return stockPrices.map(function (price, index) {
        return { x: index, y: price };
      });
    }
  }

  return (
    <div className="user-stock">
      {/* motion.____ allows us to apply transitions to the elements, could easily remove */}
      <motion.div
        animate={{
          opacity: [0, 1],
        }}
        transition={{
          duration: 1,
        }}
        className="selected-stock flex-center"
      >
        <div className="stock-info">
          <motion.img
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              duration: 1,
              delay: 0.5,
            }}
            src={`//logo.clearbit.com/${stock ? stock.companyName : ""}.com`}
          />
          <div className="stock-titles">
            <motion.h2
              animate={{
                opacity: [0, 1],
              }}
              transition={{
                duration: 1,
                delay: 0.5,
              }}
            >
              {(stock || {}).companyName}
            </motion.h2>
            <motion.h3
              animate={{
                opacity: [0, 1],
              }}
              transition={{
                duration: 1,
                delay: 0.8,
              }}
            >
              {(stock || {}).symbol}
            </motion.h3>
          </div>
        </div>
        <motion.div
          animate={{
            y: [-30, 0],
            opacity: [0, 1],
            scaleY: [1.1, 1.1],
          }}
          transition={{
            duration: 1,
            delay: 0.9,
          }}
          className="chart-wrapper"
        >
          {/* Formatted plot based on React-vis documentation */}
          <FlexibleXYPlot margin={{ left: 50 }}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Date" style={{ text: { fill: "white" } }} />
            <YAxis title="Price" style={{ text: { fill: "white" } }} />
            <LineSeries
              className="first-seriess"
              data={formatStockPrices()}
              color="limegreen"
            />
          </FlexibleXYPlot>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default UserStock;
