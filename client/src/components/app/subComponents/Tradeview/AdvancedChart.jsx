// TradingViewWidget.jsx
import { useEffect, useRef, memo } from "react";
import PropTypes from "prop-types";

function AdvancedChart({ symbol = "BITSTAMP:BTCUSD" }) {
  // This component renders an advanced TradingView chart widget.

  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `${symbol}`,
      interval: "60",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      gridColor: "rgba(182, 182, 182, 0.06)",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      watchlist: [
        "COINBASE:BTCUSD",
        "COINBASE:ETHUSD",
        "COINBASE:SOLUSD",
        "BITSTAMP:XRPUSD",
        "BINANCE:DOGEUSDT",
        "BINANCE:BTCUSDT",
        "HTX:XRUSDT",
        "BINANCE:SOLUSDT",
        "BINANCE:ADAUSDT",
        "BINANCE:LINKUSDT",
        "BINANCE:SUIUSDT",
        "BINANCE:ETHBTC",
        "BINANCE:PEPEUSDT",
        "BINANCE:AVAXUSDT",
        "BINANCE:BNBUSDT",
        "BINANCE:TRUMPUSDT",
        "BINANCE:AAVEUSDT",
        "BINANCE:DOTUSDT",
        "BINANCE:SHIBUSDT",
        "CMCMARKETS:EURUSD",
        "FX:GBPUSD",
        "FX:USDJPY",
        "OANDA:AUDUSD",
        "OANDA:USDCAD",
        "OANDA:GBPJPY",
        "OANDA:USDCHF",
        "CMCMARKETS:EURJPY",
        "OANDA:NZDUSD",
        "OANDA:EURGBP",
        "CMCMARKETS:AUDJPY",
        "CMCMARKETS:EURAUD",
        "CMCMARKETS:GBPAUD",
        "OANDA:GBPCAD",
        "FX:USDMXN",
        "KRAKEN:SPXUSD",
        "TVC:DJI",
        "INDEX:NKY",
        "TVC:DEU40",
        "FTSE:UKX",
        "NASDAQ:TSLA",
        "NASDAQ:NVDA",
        "NASDAQ:AAPL",
        "NASDAQ:MSTR",
        "NASDAQ:AMZN",
        "NASDAQ:META",
        "NASDAQ:AMD",
        "NASDAQ:MSFT",
        "NASDAQ:COIN",
        "NASDAQ:GOOGL",
        "NASDAQ:NFLX",
        "NASDAQ:INTC",
        "NASDAQ:AVGO",
        "NSE:RELIANCE",
        "NSE:TATAMOTORS",
        "NYSE:DELL",
      ],
      hotlist: true,
      support_host: "https://www.tradingview.com",
    });
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div className='tradingview-widget-container' ref={container}>
      <div
        className='tradingview-widget-container__widget h-[100dvh] w-full'
        style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className='tradingview-widget-copyright hidden'>
        <a href='https://www.tradingview.com/' rel='noopener nofollow' target='_blank'>
          <span className='blue-text'>Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}
// Prop-Types validation for props
AdvancedChart.propTypes = {
  symbol: PropTypes.string,
};
export default memo(AdvancedChart);
// This component is a memoized version of the TradingViewWidget to prevent unnecessary re-renders.
// It uses the `memo` function from React to optimize performance by only re-rendering when props change.
