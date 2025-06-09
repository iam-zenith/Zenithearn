function openEmailClient(email, subject = "", body = "") {
    // Validate if email is provided
    if (!email) {
        alert("A valid email address is required to open an email client.");
        return;
    }

    // Encode the subject and body to ensure they are URL-safe
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    // Construct the mailto link
    const mailtoLink = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

    // Open the email client in a new tab
    window.open(mailtoLink, "_blank");
}
function getDateAfterDays(startDate, x) {
    // Convert the input to a Date object
    const start = new Date(startDate);

    // Check if the input date is valid
    if (isNaN(start)) {
        throw new Error("Invalid date format. Please provide a valid date.");
    }

    // Add x days in milliseconds
    const resultDate = new Date(start.getTime() + x * 24 * 60 * 60 * 1000);

    // Convert to New York time
    return resultDate.toLocaleString("en-US", { timeZone: "America/New_York" });
}
function formatToNewYorkTime(dateString) {
    try {
        // Parse the input date string into a Date object
        const date = new Date(dateString);

        // Check if the input date is valid
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }

        // Convert to New York time
        return date.toLocaleString("en-US", { timeZone: "America/New_York" });
    } catch (error) {
        return `Error: ${error.message}`;
    }
}
function formatTime(seconds) {
    if (seconds < 60) {
        return `${Math.floor(seconds)} sec${seconds === 1 ? '' : 's'}`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min${minutes === 1 ? '' : 's'}`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours === 1 ? '' : 's'}`;
    } else if (seconds < 604800) {
        const days = Math.floor(seconds / 86400);
        return `${days} day${days === 1 ? '' : 's'}`;
    } else {
        const weeks = Math.floor(seconds / 604800);
        return `${weeks} week${weeks === 1 ? '' : 's'}`;
    }
}
function getBestWatchlistMatch(pair) {
    const watchlist = [
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
        "NYSE:DELL"
    ];
    // Normalize input for consistent comparison
    const normalize = (str) => str.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    const normalizedPair = normalize(pair);

    // Rank candidates based on similarity score
    const scoredMatches = watchlist.map((entry) => {
        const parts = entry.split(":");
        const symbol = normalize(parts[1] || "");
        let score = 0;

        // Exact match
        if (symbol === normalizedPair) score += 100;

        // Partial match boost
        if (symbol.includes(normalizedPair) || normalizedPair.includes(symbol)) score += 50;

        // Prefix match (BTCUSD -> COINBASE:BTCUSD)
        if (symbol.startsWith(normalizedPair)) score += 30;

        // Shared asset (BTC in BTCUSDT / BTCUSD)
        const baseAsset = normalizedPair.match(/[A-Z]+/g)?.[0] || "";
        if (symbol.includes(baseAsset)) score += 10;

        return { entry, score };
    });

    // Sort by best score
    scoredMatches.sort((a, b) => b.score - a.score);

    // Return highest scoring entry
    return scoredMatches[0]?.entry || null;
}

export { openEmailClient, getDateAfterDays, formatToNewYorkTime, formatTime, getBestWatchlistMatch };