import { useEffect } from "react";

const SmartsuppChat = () => {
  useEffect(() => {
    if (document.getElementById("smartsupp-script")) return;

    // Set up Smartsupp global variables
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "b56ce7d4bbd0b6d06fbdf8a8f9463c3d8e66b2e1";

    // Create and append script
    const script = document.createElement("script");
    script.id = "smartsupp-script";
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js?";
    document.head.appendChild(script);

    return () => {
      // Uncomment if you want to remove the script when unmounting
      // document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default SmartsuppChat;
