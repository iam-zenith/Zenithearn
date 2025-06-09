import FetchWithAuth from "../auth/api";
import { useEffect, useState } from "react";
import { useNotification } from "../layout/NotificationHelper";
import TradeSimulation from "./TradeSimulation";
import PropTypes from "prop-types";

const SimulateLiveTrade = ({ key: rerenderKey }) => {
  const { addNotification } = useNotification();
  const [liveTrades, setLiveTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await FetchWithAuth(
          `/simulate-trade`,
          {
            method: "GET",
            credentials: "include",
          },
          "Failed to fetch livetrades"
        );
        if (response.failed) {
          addNotification(response.failed, "error");
        } else {
          const { trades, message } = response;
          trades && setLiveTrades(trades.reverse());
          addNotification(message);
        }
      } catch (err) {
        addNotification("An error occurred", "error");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderKey]);

  return (
    <section className='w-full mx-auto'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex flex-col'>
          {liveTrades.map((trade, index) => (
            <TradeSimulation trade={trade} key={index} />
          ))}
        </div>
      )}
    </section>
  );
};
SimulateLiveTrade.propTypes = {
  key: PropTypes.bool,
};
export default SimulateLiveTrade;
