import { BanknotesIcon } from "@heroicons/react/24/solid";
import Chart from "react-apexcharts";
import useAuth from "../../auth/useAuth";
import { useEffect, useState } from "react";

const RangeBarChart = () => {
  const [series, setSeries] = useState([
    {
      data: [
        { x: "2008", y: [2600, 4420] },
        { x: "2009", y: [3250, 4100] },
        { x: "2010", y: [2950, 7800] },
        { x: "2011", y: [3000, 4600] },
        { x: "2012", y: [2500, 4100] },
        { x: "2013", y: [4500, 6500] },
        { x: "2014", y: [4100, 5600] },
      ],
    },
  ]);

  useEffect(() => {
    // Intervals: 23s, 2.57min, 5.7min (in ms)
    const intervals = [23000, 154200, 342000];
    const getRandomInterval = () => intervals[Math.floor(Math.random() * intervals.length)];

    // Helper to get a random value in range 2500-6750
    const getRandomValue = () => Math.floor(Math.random() * (6750 - 2500 + 1)) + 2500;

    // Helper to get a random pair with diff in range of 3000
    const getRandomPair = () => {
      const max = 6750;
      const diff = 3000;
      const y1 = getRandomValue();
      let y2 = y1 + diff;
      if (y2 > max) {
        // If y2 exceeds max, adjust y1 so y2 fits in range
        y2 = max;
        // y1 = y2 - diff; // Not strictly needed, but keeps diff at 3000
      }
      return [y1, y2];
    };

    let timeoutId;

    const updateSeries = () => {
      setSeries((prev) => [
        {
          data: prev[0].data.map((item) => ({
            x: item.x,
            y: getRandomPair(),
          })),
        },
      ]);
      timeoutId = setTimeout(updateSeries, getRandomInterval());
    };

    updateSeries();

    return () => clearTimeout(timeoutId);
  }, []);

  const options = {
    chart: {
      height: 200,
      type: "rangeBar",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // Toolbar disabled
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
    plotOptions: {
      bar: {
        isDumbbell: true,
        columnWidth: "5%",
        dumbbellColors: [["#4C9AFF", "#FFFFFF"]], // Changed color to #4C9AFF for the first color and white for the second
      },
    },
    legend: {
      show: false, // Disabled legend
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        gradientToColors: ["#FFFFFF"], // Gradient matching the theme
        inverseColors: true,
        stops: [0, 100],
      },
    },
    grid: {
      show: false, // Removed grid
    },
    xaxis: {
      tickPlacement: "on",
      labels: {
        show: false, // Disabled axis labels
      },
    },
    yaxis: {
      labels: {
        show: false, // Disabled axis labels
      },
    },
    dataLabels: {
      enabled: false, // Disabled data labels
    },
    tooltip: {
      enabled: false, // Disabled tooltips
    },
    theme: {
      mode: "transparent", // Set to dark theme
    },
  };

  return <Chart options={options} series={series} type='rangeBar' height='200' />;
};
/**
 * Deposited component displays the total amount deposited by the user.
 * It shows the amount in a formatted currency style and includes a chart.
 *
 * @component
 * @example
 * return (
 *   <Deposited />
 * )
 *
 * @returns {JSX.Element} The Deposited component.
 */
const Deposited = () => {
  const { user } = useAuth();
  return (
    <div className='dashboard-box flex flex-col !pb-0'>
      <div className='flex flex-col'>
        <h2 className='font-semibold text-2xl lg:text-3xl flex flex-col'>
          <BanknotesIcon className='h-7 w-7 text-success-light' />
          {`$${parseFloat(user?.wallet?.totalDeposit || "0.00").toLocaleString()}`}
        </h2>
        <p className='text-sm text-text-light'>Amount Deposited</p>
      </div>
      <RangeBarChart />
    </div>
  );
};

export default Deposited;
