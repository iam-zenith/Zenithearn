import { useEffect, useRef, useState } from "react";
import { Alert } from "@material-tailwind/react";

const intervals = [
  48000, // 48 secs
  60000, // 1 min
  90000, // 1 min 30 secs
  120000, // 2 mins
  253800, // ~4 min 13 secs
  372000, // ~6 min 12 secs
  45000, // 45 secs
  105000, // 1 min 45 secs
  75000, // 1 min 15 secs
];

function getRandomInterval() {
  return intervals[Math.floor(Math.random() * intervals.length)];
}

const popUps = Array.from({ length: 20 }, (_, i) => {
  const names = [
    "Aisha Bello",
    "Carlos Ramirez",
    "Yuki Tanaka",
    "Fatima Al-Farsi",
    "Liam O'Connor",
    "Priya Singh",
    "Omar Hassan",
    "Sofia Rossi",
    "Ivan Petrov",
    "Chen Wei",
    "Amara Okafor",
    "Diego Fernandez",
    "Elena Popova",
    "Kwame Mensah",
    "Maya Patel",
    "Ravi Kumar",
    "Leila Haddad",
    "Mateo Alvarez",
    "Zara Ahmed",
    "Jin Park",
    "Anna Müller",
    "Samuel Johnson",
    "Lucia Moretti",
    "Mohammed Saleh",
    "Emily Thompson",
    "Jean Dupont",
    "Isabella Costa",
    "David Kim",
    "Nia Williams",
    "Viktor Novak",
    "Sara Svensson",
    "Hassan Jafari",
    "Maria Garcia",
    "Peter Schmidt",
    "Linda Brown",
    "Alejandro Torres",
    "Chloe Martin",
    "Tariq Aziz",
    "Julia Fischer",
    "Santiago Lopez",
    "Nina Ivanova",
  ];
  const networks = ["Bitcoin", "Ethereum", "USDT"];
  // Generate a random amount between 200 and 30000
  const amount = Math.floor(Math.random() * (50000 - 200 + 1)) + 200;
  // Generate a random date within the past 7 days
  const now = new Date();
  const pastWeek = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
  const name = names[i];
  const network = networks[Math.floor(Math.random() * networks.length)];
  // Format timestamp as "Wed 12, 01:33 PM"
  const options = {
    weekday: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = pastWeek.toLocaleString("en-US", options);
  return {
    id: i + 1,
    name,
    amount,
    network,
    timeStamp: pastWeek,
    content: `${name} withdrew $${amount} via ${network} at ${formattedTime}`,
  };
});
const Popups = () => {
  const [open, setOpen] = useState(false);
  const [popupIdx, setPopupIdx] = useState(0);
  const timeoutRef = useRef();
  const intervalRef = useRef();

  // Show alert at random intervals
  useEffect(() => {
    function showPopup() {
      setPopupIdx((prev) => (prev + 1) % popUps.length);
      setOpen(true);
      // Auto-dismiss after 30s
      timeoutRef.current = setTimeout(() => setOpen(false), 30000);
      // Schedule next popup
      intervalRef.current = setTimeout(showPopup, getRandomInterval());
    }
    // Start first popup after initial random interval
    intervalRef.current = setTimeout(showPopup, getRandomInterval());
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(intervalRef.current);
    };
  }, []);

  return (
    <div className='absolute left-1/2 -translate-x-1/2 top-20 z-50 flex flex-col items-center rounded-lg shadow-lg'>
      <Alert
        open={open}
        variant='ghost'
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 50 },
        }}
        className='shadow-lg bg-success-light text-success-dark text-sm'>
        {popUps[popupIdx]?.content}
      </Alert>
    </div>
  );
};
export default Popups;
