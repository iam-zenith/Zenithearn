import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { WifiIcon } from "@heroicons/react/24/solid";
import { useNotification } from "../../layout/NotificationHelper";
import { Card } from "@material-tailwind/react";
import useAuth from "../../auth/useAuth";
const ProgressChart = () => {
  const { offline } = useNotification();
  const { user } = useAuth();

  // Simulated signal state
  const [simSignal, setSimSignal] = useState(user.signal || 0);

  useEffect(() => {
    if (offline) {
      setSimSignal(0);
      return;
    }

    // Helper to get a random interval (5, 7, or 13 seconds)
    const intervals = [5000, 7000, 13000];
    const getRandomInterval = () => intervals[Math.floor(Math.random() * intervals.length)];

    // Helper to get a random signal in range
    const getRandomSignal = () => {
      const min = (user.signal || 0) - 15;
      const max = (user.signal || 0) + 5;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    let timeoutId;

    const updateSignal = () => {
      setSimSignal(getRandomSignal());
      timeoutId = setTimeout(updateSignal, getRandomInterval());
    };

    updateSignal();

    return () => clearTimeout(timeoutId);
  }, [offline, user.signal]);

  const series = [offline ? 0 : simSignal]; // Use simulated signal

  const options = {
    chart: {
      type: "radialBar",
      offsetY: 0,
      toolbar: {
        // Removes the toolbar
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "45%", // Hollow area size
        },
        track: {
          background: simSignal >= 0 ? "#374151" : "#d32f2f", // Darker grey background for track
        },
        dataLabels: {
          show: true,
          name: {
            show: false, // Hides the label name
          },
          value: {
            fontSize: "16px", // Smaller font size for progress value
            color: "#FFFFFF",
            offsetY: 5,
            show: true, // Shows progress value
          },
        },
        endAngle: 135, // Ends the radial bar at 135 degrees
        startAngle: -135, // Starts the radial bar at 0 degrees
      },
    },
    fill: {
      colors: ["#fff"], // Single color white
    },
    grid: {
      show: false, // Removes the grid
    },
    tooltip: {
      enabled: false, // Disables tooltips
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
  };

  return <Chart options={options} series={series} type='radialBar' height='200' />;
};

/**
 * Signal component displays a card with signal strength information.
 * It includes a title with an icon, a description, and a progress chart.
 *
 * @component
 * @example
 * return (
 *   <Signal />
 * )
 */
const Signal = () => {
  return (
    <Card className='dashboard-box flex flex-col' variant='gradient'>
      <div className='flex flex-col text-text-light'>
        <p className='font-semibold text-xl flex flex-col'>
          <WifiIcon className='h-7 w-7' /> Signal
        </p>
        <p className='text-sm capitalize'>Higher signal strength gurantees faster earning</p>
      </div>
      <div className=''>
        <ProgressChart />
      </div>
    </Card>
  );
};

export default Signal;
