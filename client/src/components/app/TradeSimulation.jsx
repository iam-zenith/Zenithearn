import { Card, CardBody } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { formatToNewYorkTime } from "../../assets/helpers";

const TradeSimulation = ({ trade }) => {
  const { type, currencyPair, entryPrice, stopLoss, takeProfit, createdAt } = trade;

  const [priceArray, setPriceArray] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const intervalRef = useRef(null);

  // Helper: Generate random number within a range
  const getRandomInRange = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(5));

  // Initialize price array
  useEffect(() => {
    if (stopLoss && takeProfit) {
      const min = stopLoss + 0.1;
      const max = takeProfit - 0.1;

      const generated = Array.from({ length: 15 }, () => getRandomInRange(min, max));

      setPriceArray(generated);
      setCurrentPrice(generated[Math.floor(Math.random() * generated.length)]);
    }
  }, [stopLoss, takeProfit]);

  // Simulate price update every 5, 10, 13, or 20 seconds
  useEffect(() => {
    if (priceArray.length === 0) return;

    const changeInterval = () => {
      const intervals = [5000, 10000, 13000, 20000];
      return intervals[Math.floor(Math.random() * intervals.length)];
    };

    const updatePrice = () => {
      const next = priceArray[Math.floor(Math.random() * priceArray.length)];
      setCurrentPrice(next);
    };

    const setNewInterval = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        updatePrice();
        setNewInterval(); // Recursively change interval
      }, changeInterval());
    };

    setNewInterval();

    return () => clearInterval(intervalRef.current);
  }, [priceArray]);

  const getPriceColor = () => {
    if (currentPrice == null) return "text-text-light";
    if (currentPrice > entryPrice) return "text-success-dark";
    if (currentPrice < entryPrice) return "text-error-dark";
    return "text-gray-400";
  };

  return (
    <Card variant='gradient' color='gray' className='w-full mb-4'>
      <CardBody className='text-text-light py-4 space-y-2'>
        <div className='flex flex-row justify-between'>
          <p className='text-xs text-primary-mild uppercase'>{type}</p>
          <p className='text-xs text-primary-mild uppercase'>{formatToNewYorkTime(createdAt)}</p>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-lg font-semibold'>{currencyPair}</h2>
          <p className={`text-lg ${getPriceColor()}`}>${currentPrice ?? "Loading..."}</p>
        </div>
      </CardBody>
    </Card>
  );
};

TradeSimulation.propTypes = {
  trade: PropTypes.object.isRequired,
};

export default TradeSimulation;
