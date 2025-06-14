/**
 * Dashboard component that displays various user-related information and widgets.
 *
 * This component uses several subcomponents to display different sections of the dashboard,
 * such as Welcome, Signal, Earning, EarnedProfits, Deposited, LastWithdrawal, AppNotification,
 * Bonus, Referral, BTCTicker, ETHTicker, and Heatmap.
 *
 * The component fetches user data and displays a loading indicator until the data is available.
 *
 * @component
 * @example
 * return (
 *   <Dashboard />
 * )
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
import { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";
import Loader from "./subComponents/Loader";
import Welcome from "./subComponents/Welcome";
import Signal from "./subComponents/Signal";
import EarnedProfits from "./subComponents/EarnedProfits";
import Earning from "./subComponents/EarningPlan";
import Deposited from "./subComponents/Deposited";
import Bonus from "./subComponents/Bonus";
import LastWithdrawal from "./subComponents/LastWithdrawal";
import AppNotification from "./subComponents/AppNotification";
import Screener from "./subComponents/Tradeview/Screener";
const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!user);
  }, [user]);

  return (
    <section className='pb-4'>
      <div className='flex flex-col w-full h-fit'>
        {loading ? <Loader /> : <AppNotification />}
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 items-stretch'>
          {loading ? <Loader /> : <Welcome />}
          {loading ? <Loader /> : <Signal />}
          {loading ? <Loader /> : <Earning />}
          {loading ? <Loader /> : <EarnedProfits />}
          {loading ? <Loader /> : <Deposited />}
          {loading ? <Loader /> : <LastWithdrawal />}
          {loading ? <Loader /> : <Bonus />}
        </div>
        <Screener />
      </div>
    </section>
  );
};

export default Dashboard;
