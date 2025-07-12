import Chart from "react-apexcharts";
import useAuth from "../../auth/useAuth";
import { liveTradeIcon } from "../../../assets/icons";
import { useEffect, useState } from "react";

const AreaChart = () => {
  const [series, setSeries] = useState([
    {
      name: "STOCK ABC",
      data: [8200, 8250, 8230, 8305, 8350],
    },
  ]);

  useEffect(() => {
    // Intervals: 36s, 1.7min, 3.57min (in ms)
    const intervals = [36000, 102000, 214200];
    const getRandomInterval = () => intervals[Math.floor(Math.random() * intervals.length)];

    // Helper to get a random value in range 7900-8500
    const getRandomValue = () => Math.floor(Math.random() * (8500 - 7900 + 1)) + 7900;

    let timeoutId;

    const updateSeries = () => {
      setSeries((prev) => [
        {
          ...prev[0],
          data: prev[0].data.map(() => getRandomValue()),
        },
      ]);
      timeoutId = setTimeout(updateSeries, getRandomInterval());
    };

    updateSeries();

    return () => clearTimeout(timeoutId);
  }, []);

  const options = {
    chart: {
      type: "area",
      height: 200,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // Removes the toolbar
      },
      animations: {
        enabled: true, // Enables animations
        easing: "easeinout", // Defines the easing function
        speed: 800, // Animation speed in milliseconds
        animateGradually: {
          enabled: true,
          delay: 150, // Delay between each series animation
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350, // Speed of dynamic animations
        },
      },
    },
    colors: ["#FFFFFF"], // Sets the area chart color
    dataLabels: {
      enabled: false, // Hides data labels
    },
    stroke: {
      curve: "smooth", // Makes the stroke smooth
    },
    grid: {
      show: false, // Removes the grid
    },
    labels: ["2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04", "2024-11-05"],
    xaxis: {
      type: "datetime",
      labels: {
        show: false, // Hides x-axis labels
      },
      axisBorder: {
        show: false, // Hides x-axis border
      },
      axisTicks: {
        show: false, // Hides x-axis ticks
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        show: false, // Hides y-axis labels
      },
    },
    tooltip: {
      enabled: false, // Disables tooltips
    },
    legend: {
      show: false, // Hides the legend
    },
    theme: {
      mode: "transparent", // Set to dark theme
    },
  };

  return <Chart options={options} series={series} type='area' height='200' />;
};

/**
 * EarnedProfits component displays the user's earned profits in a formatted manner.
 * It fetches the user data using the useAuth hook and displays the profits in a styled box.
 * The component also includes an AreaChart to visualize the profits.
 *
 * @component
 * @example
 * return (
 *   <EarnedProfits />
 * )
 */
const EarnedProfits = () => {
  const { user } = useAuth();
  const profit = parseFloat(user?.wallet?.profits || "0.00");
  const formattedProfit =
    profit < 0 ? `-$${Math.abs(profit).toLocaleString()}` : `$${profit.toLocaleString()}`;

  return (
    <div className='dashboard-box flex flex-col !px-0 !pb-0'>
      <div className='px-4 flex flex-col'>
        <h2 className='font-semibold text-2xl lg:text-3xl flex flex-col'>
          <span className='h-4 w-4 mb-4'>{liveTradeIcon}</span>
          <span
            className={`${
              user?.wallet?.profits > 0
                ? "text-success-dark"
                : user?.wallet?.profits < 0
                ? "text-error-dark"
                : ""
            }`}>
            {formattedProfit}
          </span>
        </h2>
        <p className='text-sm text-text-light'> Earned Profits</p>
      </div>
      <AreaChart />
    </div>
  );
};

export default EarnedProfits;
