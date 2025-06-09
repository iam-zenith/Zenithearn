import { useEffect, useRef } from "react";

const Screener = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "100%",
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "dark",
      locale: "en",
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className='tradingview-widget-container my-5'>
      <div className='tradingview-widget-container__widget h-[80dvh]' ref={containerRef}></div>
      <div className='tradingview-widget-copyright hidden'>
        <a href='https://www.tradingview.com/' rel='noopener nofollow' target='_blank'>
          <span className='blue-text'>Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default Screener;
// This component integrates the TradingView Screener widget into a React application.
// It uses the useEffect hook to dynamically load the TradingView script and render the widget.
