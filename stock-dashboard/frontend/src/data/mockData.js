// Mock data for Stock Vision Dashboard

export const mockUserProfile = {
  name: "Radhika Kapoor",
  initials: "RK",
  email: "radhika.kapoor@university.edu",
  phone: "+91 98765 43210",
  role: "Premium Investor",
  joinedDate: "October 2024",
  country: "India",
  currency: "USD ($)",
  portfolioValue: 154850,
  portfolioChange: 12.5,
  portfolioChangeAmount: 17320,
  totalInvestments: 130350,
  availableCash: 24500,
  activeHoldings: 12,
  todayProfitLoss: 2450,
  todayProfitLossChange: 1.6,
};

export const mockMarketOverview = [
  { name: "S&P 500", value: "5,432.75", change: "+1.25%", isPositive: true },
  { name: "NASDAQ", value: "17,688.10", change: "+1.89%", isPositive: true },
  { name: "Dow Jones", value: "39,080.40", change: "-0.32%", isPositive: false },
  { name: "Russell 2000", value: "2,045.15", change: "+0.15%", isPositive: true },
];

export const mockChartData = {
  weekly: [
    { name: "Mon", value: 148500 },
    { name: "Tue", value: 149800 },
    { name: "Wed", value: 149200 },
    { name: "Thu", value: 152100 },
    { name: "Fri", value: 154850 },
  ],
  monthly: [
    { name: "Week 1", value: 138000 },
    { name: "Week 2", value: 142500 },
    { name: "Week 3", value: 141000 },
    { name: "Week 4", value: 149000 },
    { name: "Week 5", value: 154850 },
  ],
  yearly: [
    { name: "Jan", value: 110000 },
    { name: "Feb", value: 115000 },
    { name: "Mar", value: 112000 },
    { name: "Apr", value: 122000 },
    { name: "May", value: 128000 },
    { name: "Jun", value: 135000 },
    { name: "Jul", value: 132000 },
    { name: "Aug", value: 139000 },
    { name: "Sep", value: 142000 },
    { name: "Oct", value: 145000 },
    { name: "Nov", value: 150000 },
    { name: "Dec", value: 154850 },
  ],
};

export const mockWatchlist = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.84, change: 1.43, changePercent: 0.76, volume: "52.4M", isPositive: true },
  { symbol: "TSLA", name: "Tesla Inc.", price: 177.46, change: -4.12, changePercent: -2.27, volume: "84.1M", isPositive: false },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 924.18, change: 25.14, changePercent: 2.80, volume: "41.8M", isPositive: true },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 421.90, change: 3.10, changePercent: 0.74, volume: "22.3M", isPositive: true },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 182.02, change: -1.54, changePercent: -0.84, volume: "31.2M", isPositive: false },
];

export const mockTopPerformers = [
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 924.18, gain: "+8.45%", logo: "N" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 177.46, gain: "+5.12%", logo: "T" },
  { symbol: "AAPL", name: "Apple Inc.", price: 189.84, gain: "+3.24%", logo: "A" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 421.90, gain: "+2.88%", logo: "M" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 182.02, gain: "+2.15%", logo: "A" },
];

export const mockTransactions = [
  { id: "TX1001", type: "Buy", symbol: "NVDA", quantity: 15, price: 915.20, date: "2026-06-18", status: "Completed" },
  { id: "TX1002", type: "Sell", symbol: "AAPL", quantity: 10, price: 191.10, date: "2026-06-17", status: "Completed" },
  { id: "TX1003", type: "Buy", symbol: "TSLA", quantity: 20, price: 175.50, date: "2026-06-16", status: "Pending" },
  { id: "TX1004", type: "Buy", symbol: "MSFT", quantity: 8, price: 420.05, date: "2026-06-15", status: "Completed" },
  { id: "TX1005", type: "Sell", symbol: "AMZN", quantity: 25, price: 184.20, date: "2026-06-14", status: "Failed" },
];

export const mockNews = [
  {
    id: 1,
    category: "Markets",
    headline: "S&P 500 Hits New Record High as Tech Stock Rally Gains Fresh Momentum",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&q=80",
    url: "https://finance.yahoo.com/news/stock-market-news-today-sp-500-nasdaq-composite-record-highs-120037372.html"
  },
  {
    id: 2,
    category: "Tech",
    headline: "NVIDIA Unveils Next-Gen AI Chip Architecture, Beating Industry Expectations",
    time: "4 hours ago",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=300&q=80",
    url: "https://www.cnbc.com/2024/03/18/nvidia-gtc-2024-live-updates-stock-chips-and-ai-news.html"
  },
  {
    id: 3,
    category: "Economy",
    headline: "Federal Reserve Signals Interest Rates May Remain Steady Amid Inflation Concerns",
    time: "7 hours ago",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=300&q=80",
    url: "https://www.cnbc.com/2024/06/12/fed-meeting-today-live-updates-on-june-interest-rate-decision.html"
  },
];

export const mockPortfolioAllocation = [
  { name: "Technology", percentage: 45, color: "#8B5CF6" },
  { name: "Healthcare", percentage: 20, color: "#EC4899" },
  { name: "Finance", percentage: 15, color: "#3B82F6" },
  { name: "Energy", percentage: 10, color: "#10B981" },
  { name: "Others", percentage: 10, color: "#F59E0B" },
];

export const mockNotifications = [
  { id: 1, text: "NVIDIA (NVDA) reached your target price threshold of $920.00.", time: "1 hour ago", unread: true, type: "price_alert", status: "Triggered" },
  { id: 2, text: "Tesla (TSLA) daily gain exceeded your +5% alert limit.", time: "4 hours ago", unread: true, type: "price_alert", status: "Triggered" },
  { id: 3, text: "Deposit of $24,500.00 from bank transfer completed successfully.", time: "1 day ago", unread: false, type: "deposit", status: "Completed" },
  { id: 4, text: "Weekly portfolio performance wrap-up is ready for your review.", time: "2 days ago", unread: false, type: "update", status: "Info" },
  { id: 5, text: "Security Alert: A new login was registered from Delhi, India.", time: "3 days ago", unread: false, type: "security", status: "Caution" },
];

export const mockMessages = [
  { 
    id: 1, 
    sender: "Financial Advisor", 
    preview: "Your Q2 performance report is ready.", 
    time: "2 hours ago",
    chatHistory: [
      { sender: "Advisor", text: "Hello Radhika, I have finalized your Q2 performance report based on your portfolio growth.", time: "2 hours ago" },
      { sender: "Advisor", text: "Let me know if you would like to schedule a call to review your current tech allocations.", time: "2 hours ago" }
    ]
  },
  { 
    id: 2, 
    sender: "System Alert", 
    preview: "Security: New login detected from New Delhi.", 
    time: "1 day ago",
    chatHistory: [
      { sender: "System", text: "Security Alert: We detected a new login to your Stock Vision account from Chrome on Windows - New Delhi, India.", time: "1 day ago" },
      { sender: "System", text: "If this was you, no action is needed. If you do not recognize this activity, please reset your password immediately.", time: "1 day ago" }
    ]
  },
  { 
    id: 3, 
    sender: "Market Pulse", 
    preview: "Weekly wrap-up: Tech stocks leading gains.", 
    time: "2 days ago",
    chatHistory: [
      { sender: "Pulse Editor", text: "Welcome to your weekly wrap-up! NASDAQ has closed up +1.89% led by NVIDIA's chip breakthrough.", time: "2 days ago" },
      { sender: "Pulse Editor", text: "Tech continues to dominate with a 45% weighting in major indices. Read more on CNBC.", time: "2 days ago" }
    ]
  },
];
