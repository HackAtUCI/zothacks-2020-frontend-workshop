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
  const [stock, setStock] = useState(null);
  const [stockPrices, setStockPrices] = useState(null);
  let { selectedCompany } = useParams();

  useEffect(() => {
    if (selectedCompany) {
      getStock();
    } else {
      console.log("Invalid selectedCompany");
    }
  }, []);

  useEffect(() => {
    if (stock) {
      getStockPrices();
    }
  }, [stock]);

  async function getStock() {
    let stocks = await axios.get(
      "http://127.0.0.1:5000/stock?companyName=" + selectedCompany
    );

    if (stocks.status === 200 && stocks.data) {
      setStock(stocks.data[0]);
    } else {
      console.log("Error pulling stock");
    }
  }

  async function getStockPrices() {
    let finnhubResponse = await axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${stock.symbol}&resolution=1&from=1572651390&to=1572910590&token=${process.env.REACT_APP_FINNHUB_SECRET}`
    );

    if (finnhubResponse.status === 200) {
      setStockPrices(finnhubResponse.data.o);
    } else {
      console.log("Error pulling stock prices");
    }
  }

  function formatStockPrices() {
    if (!stockPrices) {
      return [];
    } else {
      return stockPrices.map(function (price, index) {
        return { x: index, y: price };
      });
    }
  }

  return (
    <div className="user-stock">
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
          <img
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
