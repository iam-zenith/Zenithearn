import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    // Added latest script
    script.src = "//code.tidio.co/jry7u41nhzzeiuriwcgpnrxp6xdhth2h.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};
export default Chatbot;
