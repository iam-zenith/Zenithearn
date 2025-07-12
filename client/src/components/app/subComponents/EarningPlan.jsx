import {
  BoltIcon,
  BoltSlashIcon,
  ClockIcon,
  ExclamationCircleIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Charts from "react-apexcharts";
import FetchWithAuth from "../../auth/api";
import Loader from "./Loader";
import { formatToNewYorkTime } from "../../../assets/helpers";

const PolarChart = () => {
  // Simulated series state
  const [series, setSeries] = useState([30, 60, 40, 80, 50]);

  useEffect(() => {
    // Helper to get a random interval (1 min, 3 mins, or 7 mins)
    const intervals = [60000, 180000, 420000];
    const getRandomInterval = () => intervals[Math.floor(Math.random() * intervals.length)];

    // Helper to get a random value in range 5-95
    const getRandomValue = () => Math.floor(Math.random() * (95 - 5 + 1)) + 5;

    let timeoutId;

    const updateSeries = () => {
      // Generate a new array with random values between 5 and 95
      setSeries(series.map(() => getRandomValue()));
      timeoutId = setTimeout(updateSeries, getRandomInterval());
    };

    updateSeries();

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, []);

  const options = {
    chart: {
      width: 300,
      type: "polarArea",
    },
    labels: ["Rose A", "Rose B", "Rose C", "Rose D", "Rose E"],
    fill: {
      opacity: 1,
      colors: ["#ffffff"],
    },
    stroke: {
      width: 2,
      colors: ["#4C9AFF"],
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: false,
      },
    },
  };

  return (
    <div id='chart'>
      <Charts options={options} series={series} type='polarArea' width={300} />
    </div>
  );
};
const actionIcons = [
  { Icon: BoltIcon, status: "active", color: "text-success-light", title: "Active" },
  { Icon: BoltSlashIcon, status: "expired", color: "text-warning-light", title: "Expired" },
  { Icon: ExclamationCircleIcon, status: "failed", color: "text-error-light", title: "Failed" },
  { Icon: ClockIcon, status: "pending", color: "text-warning-dark", title: "Pending" },
];
const Earning = () => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchCurrentPlan = async () => {
    setLoading(true);
    try {
      const response = await FetchWithAuth(
        `/dashboard/current-plan`,
        {
          method: "GET",
          credentials: "include",
        },
        "Failed to fetch current plan"
      );
      if (response.failed) {
        console.log(response.message);
      } else {
        const { currentPlan } = response;
        currentPlan && setCurrentPlan(currentPlan);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentPlan();
  }, []);
  const formattedDate = formatToNewYorkTime(currentPlan?.expiryDate);
  const displayDate = formattedDate.startsWith("Error:") ? "Unavailable" : formattedDate;

  return (
    <Card className='dashboard-box flex flex-col !pb-0' variant='gradient'>
      {loading ? (
        <Loader />
      ) : (
        <div className='flex flex-col text-text-light'>
          <h2 className='font-semibold text-xl flex flex-col'>
            <div className='flex flex-row justify-between'>
              <SquaresPlusIcon className='h-7 w-7' />
              {(() => {
                const foundIcon = actionIcons.find((icon) => icon.status === currentPlan?.status);
                return foundIcon ? (
                  <foundIcon.Icon
                    className={`h-7 w-7 hover:scale-110 transition-all cursor-pointer ${foundIcon.color}`}
                    title={foundIcon.title || "Unavailable"}
                  />
                ) : null;
              })()}
            </div>
            {currentPlan?.plan?.name || "Unavailable"}
          </h2>
          <div className='flex flex-row justify-between'>
            <p className='text-sm text-text-light capitalize'>Current plan</p>
            <p className='text-sm text-text-light' title='Expires'>
              {displayDate}
            </p>
          </div>
        </div>
      )}
      <div className='flex justify-center'>
        <PolarChart />
      </div>
    </Card>
  );
};

export default Earning;
