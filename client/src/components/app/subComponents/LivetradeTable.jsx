import { useEffect, useState, useMemo } from "react";
import { formatTime, formatToNewYorkTime } from "../../../assets/helpers.js";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/solid";
import FetchWithAuth from "../../auth/api.js";
import { useNotification } from "../../layout/NotificationHelper";
import Loader from "./Loader.jsx";
import { Card } from "@material-tailwind/react";

/**
 * Fetches the user's live trade history from the server.
 * Updates the live trade state with the fetched data and handles errors or notifications.
 * @async
 * @function
 * @returns {Promise<void>}
 */

const LiveTradeHistoryTable = () => {
  const { addNotification } = useNotification();
  const [liveTrades, setLiveTrades] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await FetchWithAuth(
          `/history/livetrade`,
          {
            method: "GET",
            credentials: "include",
          },
          "Failed to fetch livetrade history"
        );
        if (response.failed) {
          addNotification(response.failed, "error");
        } else {
          const { history, message } = response;
          history && setLiveTrades(history.reverse());
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
  }, []);

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1200) setItemsPerPage(12);
    else if (width >= 768) setItemsPerPage(10);
    else setItemsPerPage(8);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const filteredLiveTrades = useMemo(() => {
    return liveTrades.filter((trade) => {
      const matchesSearch =
        !searchQuery.toLowerCase() || trade.currencyPair.toLowerCase().includes(searchQuery);
      const matchesStatus = !filterStatus || trade.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [liveTrades, searchQuery, filterStatus]);

  const paginatedLiveTrades = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLiveTrades.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLiveTrades, currentPage, itemsPerPage]);

  const totalItems = filteredLiveTrades.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Card className='text-text-light w-full rounded-lg shadow-md' variant='gradient' color='gray'>
      <div className='flex flex-wrap justify-between items-center p-2 min-w-96'>
        <div>
          <h3 className='text-lg font-semibold'>Live Trade History</h3>
          <p className='text-sm text-primary-light'>Overview of your live trades.</p>
        </div>
        <div className='mt-3 sm:mt-0'>
          <div className='relative w-full max-w-sm'>
            <input
              type='text'
              placeholder='Search by Trade Pair'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full form-input'
            />
            <MagnifyingGlassIcon className='w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-primary-light' />
          </div>
        </div>
      </div>

      <div className='flex justify-start items-center space-x-4 px-4 py-2'>
        {["active", "completed", "canceled"].map((status) => (
          <label key={status} className='inline-flex items-center space-x-2'>
            <input
              type='radio'
              name='status-filter'
              value={status}
              checked={filterStatus === status}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='text-primary-light focus:ring-primary-light'
            />
            <span className='text-sm capitalize'>{status}</span>
          </label>
        ))}
        <TrashIcon
          title='Clear filters'
          className='w-4 h-4 text-primary-light hover:scale-105 transition-all delay-100 hover:text-error-light duration-500'
          onClick={() => {
            setFilterStatus("");
            setSearchQuery("");
          }}
        />
      </div>

      <div className='overflow-x-auto'>
        {loading ? (
          <Loader />
        ) : (
          <table className='w-full text-left text-sm'>
            <thead className='bg-primary-mild'>
              <tr>
                <th className='p-4'>Trade ID</th>
                <th className='p-4'>Trade Type</th>
                <th className='p-4'>Currency Pair</th>
                <th className='p-4'>Timing (Hours)</th>
                <th className='p-4'>Action</th>
                <th className='p-4'>Lot Size</th>
                <th className='p-4'>Entry Price</th>
                <th className='p-4'>Stop Loss</th>
                <th className='p-4'>Take Profit</th>
                <th className='p-4'>Exit Price</th>
                <th className='p-4'>Profit Loss</th>
                <th className='p-4'>Status</th>
                <th className='p-4 min-w-[16rem]'>Created At</th>
                <th className='p-4 min-w-[16rem]'>Closed At</th>
                <th className='p-4'>Duration</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLiveTrades.map((trade) => (
                <tr key={trade._id} className='border-b hover:bg-primary-dark'>
                  <td className='p-4'>{trade._id}</td>
                  <td className='p-4 capitalize'>{trade.type}</td>
                  <td className='p-4'>{trade.currencyPair}</td>
                  <td className='p-4'>{trade.time}</td>
                  <td className='p-4 capitalize'>{trade.action}</td>
                  <td className='p-4'>${parseFloat(trade.entryPrice).toLocaleString()}</td>
                  <td className='p-4'>${parseFloat(trade.stopLoss).toLocaleString()}</td>
                  <td className='p-4'>${parseFloat(trade.takeProfit).toLocaleString()}</td>
                  <td className='p-4'>
                    {trade.exitPrice ? `$${parseFloat(trade.exitPrice).toLocaleString()}` : "N/A"}
                  </td>
                  <td
                    className={`p-4 ${
                      trade.profitLoss > 0
                        ? "text-success-dark"
                        : trade.profitLoss < 0
                        ? "text-error-dark"
                        : ""
                    }`}>
                    {" "}
                    {trade.profitLoss ? `$${parseFloat(trade.profitLoss).toLocaleString()}` : "N/A"}
                  </td>
                  <td className='p-4 capitalize'>{trade.status}</td>
                  <td className='p-4 min-w-[12rem]'>{formatToNewYorkTime(trade.createdAt)}</td>
                  <td className='p-4 min-w-[12rem]'>
                    {trade.closedAt ? formatToNewYorkTime(trade.closedAt) : "N/A"}
                  </td>
                  <td className='p-4'>
                    {trade.duration ? formatTime(parseFloat(trade.duration)) : "N/A"}
                  </td>
                </tr>
              ))}
              {paginatedLiveTrades.length === 0 && (
                <tr>
                  <td colSpan='14' className='p-4 text-center'>
                    No trades found. Keep an eye on your portfolio!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className='flex justify-between items-center p-4'>
        <p className='text-sm'>
          Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b>-
          <b>{Math.min(currentPage * itemsPerPage, totalItems)}</b> of <b>{totalItems}</b>
        </p>
        <div className='flex space-x-2'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className='px-3 py-1 text-sm bg-transparent border rounded hover:bg-gray-200'
            disabled={currentPage === 1}>
            Prev
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 text-sm border rounded ${
                currentPage === page + 1
                  ? "text-white bg-primary-light"
                  : "bg-transparent hover:bg-gray-200"
              }`}>
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className='px-3 py-1 text-sm bg-transparent border rounded hover:bg-gray-200'
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </Card>
  );
};

export default LiveTradeHistoryTable;
