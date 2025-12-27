import { useState, useEffect } from 'react';
import { Trash2, Plus, LogOut, Moon, Sun, Menu, X, Settings, User, TrendingUp, Target, AlertCircle, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from 'recharts';

const CURRENCIES = {
  USD: { rate: 1, symbol: '$', name: 'US Dollar', flag: '🇺🇸', region: 'North America' },
  EUR: { rate: 1.09, symbol: '€', name: 'Euro', flag: '🇪🇺', region: 'Europe' },
  GBP: { rate: 1.27, symbol: '£', name: 'British Pound', flag: '🇬🇧', region: 'Europe' },
  JPY: { rate: 0.0067, symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', region: 'Asia' },
  CHF: { rate: 1.14, symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', region: 'Europe' },
  CAD: { rate: 0.73, symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', region: 'North America' },
  AUD: { rate: 0.66, symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', region: 'Oceania' },
  AED: { rate: 0.27, symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', region: 'Middle East' },
  SAR: { rate: 0.27, symbol: '﷼', name: 'Saudi Riyal', flag: '🇸🇦', region: 'Middle East' },
  EGP: { rate: 0.02, symbol: '£', name: 'Egyptian Pound', flag: '🇪🇬', region: 'Africa' },
  INR: { rate: 0.012, symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', region: 'Asia' },
  SGD: { rate: 0.74, symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', region: 'Asia' },
  CNY: { rate: 0.14, symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳', region: 'Asia' },
  MXN: { rate: 0.057, symbol: '$', name: 'Mexican Peso', flag: '🇲🇽', region: 'North America' },
  BRL: { rate: 0.20, symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷', region: 'South America' },
  ZAR: { rate: 0.053, symbol: 'R', name: 'South African Rand', flag: '🇿🇦', region: 'Africa' },
  THB: { rate: 0.028, symbol: '฿', name: 'Thai Baht', flag: '🇹🇭', region: 'Asia' },
  KRW: { rate: 0.00076, symbol: '₩', name: 'South Korean Won', flag: '🇰🇷', region: 'Asia' },
  NOK: { rate: 0.095, symbol: 'kr', name: 'Norwegian Krone', flag: '🇳🇴', region: 'Europe' },
  SEK: { rate: 0.093, symbol: 'kr', name: 'Swedish Krona', flag: '🇸🇪', region: 'Europe' },
  NZD: { rate: 0.61, symbol: 'NZ$', name: 'New Zealand Dollar', flag: '🇳🇿', region: 'Oceania' },
  HKD: { rate: 0.128, symbol: 'HK$', name: 'Hong Kong Dollar', flag: '🇭🇰', region: 'Asia' },
  PKR: { rate: 0.0036, symbol: '₨', name: 'Pakistani Rupee', flag: '🇵🇰', region: 'Asia' },
  TRY: { rate: 0.033, symbol: '₺', name: 'Turkish Lira', flag: '🇹🇷', region: 'Middle East' },
  ARS: { rate: 0.0095, symbol: '$', name: 'Argentine Peso', flag: '🇦🇷', region: 'South America' },
  PHP: { rate: 0.0176, symbol: '₱', name: 'Philippine Peso', flag: '🇵🇭', region: 'Asia' },
  VND: { rate: 0.000041, symbol: '₫', name: 'Vietnamese Dong', flag: '🇻🇳', region: 'Asia' },
  IDR: { rate: 0.000062, symbol: 'Rp', name: 'Indonesian Rupiah', flag: '🇮🇩', region: 'Asia' },
  MYR: { rate: 0.213, symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾', region: 'Asia' },
  TWD: { rate: 0.031, symbol: 'NT$', name: 'Taiwan Dollar', flag: '🇹🇼', region: 'Asia' },
  CLP: { rate: 0.0011, symbol: '$', name: 'Chilean Peso', flag: '🇨🇱', region: 'South America' },
  COP: { rate: 0.00024, symbol: '$', name: 'Colombian Peso', flag: '🇨🇴', region: 'South America' },
  ILS: { rate: 0.27, symbol: '₪', name: 'Israeli Shekel', flag: '🇮🇱', region: 'Middle East' },
  KWD: { rate: 3.25, symbol: 'د.ك', name: 'Kuwaiti Dinar', flag: '🇰🇼', region: 'Middle East' },
};

export default function FinancialHub() {
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [viewCurrency, setViewCurrency] = useState('USD');
  const [menuOpen, setMenuOpen] = useState(false);
  const [animatingExpenses, setAnimatingExpenses] = useState([]);

  // Add CSS animations
  const styles = `
    @keyframes slideInExpense {
      from {
        opacity: 0;
        transform: translateX(-20px);
        background-color: rgba(34, 197, 94, 0.3);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .expense-animate {
      animation: slideInExpense 0.6s ease-out;
    }
    
    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
      }
      50% {
        box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
      }
    }
    
    .pulse-glow {
      animation: pulse-glow 1s cubic-bezier(0.4, 0, 0.6, 1);
    }
  `;

  const [profile, setProfile] = useState({ photo: null, bio: '', subscriptions: [], name: '' });
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState([]);
  const [savings, setSavings] = useState([]);
  const [receivables, setReceivables] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);

  const [incomeInput, setIncomeInput] = useState({ description: '', amount: '', currency: 'USD', recurring: false });
  const [expenseInput, setExpenseInput] = useState({ description: '', amount: '', currency: 'USD', category: 'food' });
  const [debtInput, setDebtInput] = useState({ description: '', amount: '', currency: 'USD', rate: '', term: '' });
  const [savingsInput, setSavingsInput] = useState({ description: '', amount: '', currency: 'USD' });
  const [receivableInput, setReceivableInput] = useState({ recipient: '', amount: '', currency: 'USD', date: '' });
  const [goalInput, setGoalInput] = useState({ name: '', target: '', currency: 'USD', deadline: '' });
  const [budgetInput, setBudgetInput] = useState({ category: 'food', limit: '', currency: 'USD' });

  const convertToUSD = (amount, currency) => amount * (CURRENCIES[currency]?.rate || 1);
  const convertFromUSD = (amountUSD, currency) => amountUSD / (CURRENCIES[currency]?.rate || 1);

  const formatNumber = (num, currency = 'USD') => {
    const symbol = CURRENCIES[currency]?.symbol || '$';
    return `${symbol}${Math.round(num).toLocaleString('en-US')}`;
  };

  const addIncome = () => {
    if (incomeInput.description && incomeInput.amount) {
      setIncome([...income, { id: Date.now(), ...incomeInput, amount: parseFloat(incomeInput.amount) }]);
      setIncomeInput({ description: '', amount: '', currency: defaultCurrency, recurring: false });
    }
  };

  const addExpense = () => {
    if (expenseInput.description && expenseInput.amount) {
      const newId = Date.now();
      setExpenses([...expenses, { id: newId, ...expenseInput, amount: parseFloat(expenseInput.amount) }]);
      setAnimatingExpenses([...animatingExpenses, newId]);
      setTimeout(() => {
        setAnimatingExpenses(prev => prev.filter(id => id !== newId));
      }, 600);
      setExpenseInput({ description: '', amount: '', currency: defaultCurrency, category: 'food' });
    }
  };

  const addDebt = () => {
    if (debtInput.description && debtInput.amount) {
      setDebts([...debts, { id: Date.now(), ...debtInput, amount: parseFloat(debtInput.amount) }]);
      setDebtInput({ description: '', amount: '', currency: 'USD', rate: '', term: '' });
    }
  };

  const addSavings = () => {
    if (savingsInput.description && savingsInput.amount) {
      setSavings([...savings, { id: Date.now(), ...savingsInput, amount: parseFloat(savingsInput.amount) }]);
      setSavingsInput({ description: '', amount: '', currency: 'USD' });
    }
  };

  const addReceivable = () => {
    if (receivableInput.recipient && receivableInput.amount) {
      setReceivables([...receivables, { id: Date.now(), ...receivableInput, amount: parseFloat(receivableInput.amount) }]);
      setReceivableInput({ recipient: '', amount: '', currency: 'USD', date: '' });
    }
  };

  const addGoal = () => {
    if (goalInput.name && goalInput.target) {
      setGoals([...goals, { id: Date.now(), ...goalInput, target: parseFloat(goalInput.target), progress: 0 }]);
      setGoalInput({ name: '', target: '', currency: 'USD', deadline: '' });
    }
  };

  const addBudget = () => {
    if (budgetInput.category && budgetInput.limit) {
      setBudgets([...budgets, { id: Date.now(), ...budgetInput, limit: parseFloat(budgetInput.limit) }]);
      setBudgetInput({ category: 'food', limit: '', currency: 'USD' });
    }
  };

  // Calculate totals in selected currency
  const totalIncomeUSD = income.reduce((sum, item) => sum + convertToUSD(item.amount, item.currency), 0);
  const totalExpensesUSD = expenses.reduce((sum, item) => sum + convertToUSD(item.amount, item.currency), 0);
  const totalDebtsUSD = debts.reduce((sum, item) => sum + convertToUSD(item.amount, item.currency), 0);
  const totalSavingsUSD = savings.reduce((sum, item) => sum + convertToUSD(item.amount, item.currency), 0);
  const totalReceivablesUSD = receivables.reduce((sum, item) => sum + convertToUSD(item.amount, item.currency), 0);

  const totalIncome = convertFromUSD(totalIncomeUSD, viewCurrency);
  const totalExpenses = convertFromUSD(totalExpensesUSD, viewCurrency);
  const totalDebts = convertFromUSD(totalDebtsUSD, viewCurrency);
  const totalSavings = convertFromUSD(totalSavingsUSD, viewCurrency);
  const totalReceivables = convertFromUSD(totalReceivablesUSD, viewCurrency);
  const netPosition = totalIncome - totalExpenses - totalDebts;
  const savingRate = totalIncomeUSD > 0 ? ((totalSavingsUSD / totalIncomeUSD) * 100).toFixed(1) : 0;

  const expenseByCategory = Object.entries(
    expenses.reduce((acc, exp) => ({
      ...acc,
      [exp.category]: (acc[exp.category] || 0) + convertToUSD(exp.amount, exp.currency)
    }), {})
  ).map(([name, value]) => ({ 
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: parseFloat(convertFromUSD(value, viewCurrency).toFixed(2))
  }));

  const deleteItem = (list, setList, id) => {
    setList(list.filter(item => item.id !== id));
  };

  // Dashboard Page
  if (currentPage === 'dashboard') {
    return (
      <div dir="ltr" className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
        <style>{styles}</style>
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className={`flex justify-between items-center mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow-sm`}>
            <div>
              <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>💰 Financial Hub</h1>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>All amounts shown in {CURRENCIES[viewCurrency]?.flag} {viewCurrency}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCurrentPage('profile')} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <User size={20} />
              </button>
              <button onClick={() => setCurrentPage('insights')} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <BarChart3 size={20} />
              </button>
              <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          {menuOpen && (
            <div className={`mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm p-4 grid grid-cols-3 gap-2`}>
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'budgets', label: 'Budgets', icon: '💵' },
                { id: 'goals', label: 'Goals', icon: '🎯' },
                { id: 'analytics', label: 'Analytics', icon: '📈' },
                { id: 'settings', label: 'Settings', icon: '⚙️' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentPage(item.id); setMenuOpen(false); }}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                    currentPage === item.id
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Currency Selector */}
          <div className={`mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-2xl shadow-sm`}>
            <p className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🌍 Default Currency (All inputs & display)</p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {Object.entries(CURRENCIES).map(([code, data]) => (
                <button
                  key={code}
                  onClick={() => {
                    setDefaultCurrency(code);
                    setViewCurrency(code);
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
                    defaultCurrency === code
                      ? 'bg-blue-600 text-white scale-110'
                      : darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  title={data.name}
                >
                  {data.flag} {code}
                </button>
              ))}
            </div>
            <p className={`text-xs mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Currently displaying all amounts in {CURRENCIES[defaultCurrency]?.flag} {defaultCurrency}</p>
          </div>

          {/* KPI Cards - ALL in selected currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Income', value: totalIncome, icon: '💰', color: 'from-green-400 to-green-500' },
              { label: 'Expenses', value: totalExpenses, icon: '💳', color: 'from-orange-400 to-orange-500' },
              { label: 'Net Income', value: totalIncome - totalExpenses, icon: '📈', color: 'from-blue-400 to-blue-500' },
              { label: 'Savings', value: totalSavings, icon: '🏦', color: 'from-purple-400 to-purple-500' },
              { label: 'Money Owed to You', value: totalReceivables, icon: '💸', color: 'from-yellow-400 to-yellow-500' },
            ].map((kpi, i) => (
              <div key={i} className={`bg-gradient-to-br ${kpi.color} rounded-xl p-4 text-white shadow-sm`}>
                <p className="text-white/90 text-xs font-medium">{kpi.label}</p>
                <p className="text-2xl font-bold mt-2">{formatNumber(kpi.value, viewCurrency)}</p>
              </div>
            ))}
          </div>

          {/* Main Input Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {[
              { title: 'Income', input: incomeInput, setInput: setIncomeInput, onAdd: addIncome, list: income, setList: setIncome, icon: '💰', fields: ['description', 'amount', 'currency', 'recurring'] },
              { title: 'Expenses', input: expenseInput, setInput: setExpenseInput, onAdd: addExpense, list: expenses, setList: setExpenses, icon: '💳', fields: ['description', 'amount', 'currency', 'category'] },
              { title: 'Debts', input: debtInput, setInput: setDebtInput, onAdd: addDebt, list: debts, setList: setDebts, icon: '📊', fields: ['description', 'amount', 'currency'] },
              { title: 'Savings', input: savingsInput, setInput: setSavingsInput, onAdd: addSavings, list: savings, setList: setSavings, icon: '🏦', fields: ['description', 'amount', 'currency'] },
              { title: 'Money Owed to You', input: receivableInput, setInput: setReceivableInput, onAdd: addReceivable, list: receivables, setList: setReceivables, icon: '💸', fields: ['recipient', 'amount', 'currency'] },
            ].map((section, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm col-span-1 ${idx === 4 ? 'lg:col-span-2' : ''}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : ''}`}>
                  <span>{section.icon}</span> {section.title}
                </h3>
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    placeholder={section.fields.includes('recipient') ? 'Recipient Name' : 'Description'}
                    value={section.input[section.fields.includes('recipient') ? 'recipient' : 'description'] || ''}
                    onChange={(e) => section.setInput({...section.input, [section.fields.includes('recipient') ? 'recipient' : 'description']: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg text-sm border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Amount"
                      value={section.input.amount || ''}
                      onChange={(e) => section.setInput({...section.input, amount: e.target.value})}
                      step="0.01"
                      className={`px-3 py-2 rounded-lg text-sm border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />
                    <select
                      value={section.input.currency || defaultCurrency}
                      onChange={(e) => section.setInput({...section.input, currency: e.target.value})}
                      className={`px-3 py-2 rounded-lg text-sm border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    >
                      {Object.entries(CURRENCIES).map(([code, data]) => <option key={code} value={code}>{data.flag} {code}</option>)}
                    </select>
                  </div>
                  {section.fields.includes('category') && (
                    <select
                      value={section.input.category || 'food'}
                      onChange={(e) => section.setInput({...section.input, category: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg text-sm border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    >
                      {['food', 'shopping', 'entertainment', 'transport', 'utilities', 'health', 'education', 'other'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  )}
                  {section.fields.includes('recurring') && (
                    <label className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : ''}`}>
                      <input type="checkbox" checked={section.input.recurring || false} onChange={(e) => section.setInput({...section.input, recurring: e.target.checked})} />
                      Recurring Income
                    </label>
                  )}
                  <button
                    onClick={section.onAdd}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold text-sm transition"
                  >
                    Add {section.title}
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {section.list.length === 0 ? (
                    <p className={`text-center text-sm py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No items yet</p>
                  ) : (
                    section.list.map(item => (
                      <div key={item.id} className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} group ${animatingExpenses.includes(item.id) && section.title === 'Expenses' ? 'expense-animate pulse-glow' : ''}`}>
                        <div className="flex-1">
                          <p className={`font-semibold text-sm ${darkMode ? 'text-white' : ''}`}>{item.description || item.recipient}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{CURRENCIES[item.currency]?.flag} {item.currency}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-sm ${darkMode ? 'text-white' : ''}`}>{formatNumber(convertFromUSD(convertToUSD(item.amount, item.currency), viewCurrency), viewCurrency)}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{CURRENCIES[item.currency]?.symbol}{item.amount.toLocaleString()}</p>
                        </div>
                        <button onClick={() => deleteItem(section.list, section.setList, item.id)} className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          {expenseByCategory.length > 0 && (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : ''}`}>📊 Expense Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={expenseByCategory} cx="50%" cy="50%" labelLine={false} label={({name, value}) => `${name}: ${formatNumber(value, viewCurrency)}`} outerRadius={100} fill="#8884d8" dataKey="value">
                    {['#10b981', '#f97316', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308'].map((color, i) => <Cell key={i} fill={color} />)}
                  </Pie>
                  <Tooltip formatter={(value) => formatNumber(value, viewCurrency)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Profile Page
  if (currentPage === 'profile') {
    return (
      <div dir="ltr" className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
        <style>{styles}</style>
        <div className="max-w-4xl mx-auto p-6">
          <button onClick={() => setCurrentPage('dashboard')} className={`mb-6 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>← Back</button>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-sm`}>
            <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>👤 My Profile</h1>

            {/* Photo Upload */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : ''}`}>Profile Photo</h3>
              <div className={`w-32 h-32 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                {profile.photo ? (
                  <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">📷</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.onload = (event) => setProfile({...profile, photo: event.target.result});
                  if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
                }}
                className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>

            {/* Name */}
            <div className="mb-8">
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                placeholder="Enter your name"
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
            </div>

            {/* Bio */}
            <div className="mb-8">
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Personal Notes</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                placeholder="Write your financial goals and notes..."
                className={`w-full h-32 px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none`}
              />
            </div>

            {/* Subscriptions */}
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : ''}`}>Active Subscriptions</h3>
              <div className="space-y-3 mb-4">
                {['Internet', 'Streaming', 'Cloud Storage', 'Gym', 'Software'].map(sub => (
                  <label key={sub} className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <input
                      type="checkbox"
                      checked={profile.subscriptions.includes(sub)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProfile({...profile, subscriptions: [...profile.subscriptions, sub]});
                        } else {
                          setProfile({...profile, subscriptions: profile.subscriptions.filter(s => s !== sub)});
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className={darkMode ? 'text-white' : ''}>{sub}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Insights Page
  if (currentPage === 'insights') {
    const recurringIncome = income.filter(i => i.recurring).reduce((sum, item) => sum + convertToUSD(item.amount, item.currency), 0);
    const debtPayment = debts.reduce((sum, item) => sum + (convertToUSD(item.amount, item.currency) * 0.02), 0);
    const healthScore = Math.min(100, Math.max(0, 50 + (netPosition / Math.max(totalIncomeUSD, 1) * 50)));

    return (
      <div dir="ltr" className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
        <style>{styles}</style>
        <div className="max-w-6xl mx-auto p-6">
          <button onClick={() => setCurrentPage('dashboard')} className={`mb-6 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>← Back</button>
          
          <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>📊 Financial Insights</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm`}>
              <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Financial Health Score</p>
              <p className={`text-4xl font-bold text-blue-500 mb-2`}>{healthScore.toFixed(0)}/100</p>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: `${healthScore}%`}}></div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm`}>
              <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Recurring Income Monthly</p>
              <p className={`text-4xl font-bold text-green-500`}>{formatNumber(convertFromUSD(recurringIncome, viewCurrency), viewCurrency)}</p>
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm`}>
              <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Debt Interest Cost</p>
              <p className={`text-4xl font-bold text-red-500`}>{formatNumber(convertFromUSD(debtPayment, viewCurrency), viewCurrency)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Settings
  if (currentPage === 'settings') {
    return (
      <div dir="ltr" className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
        <style>{styles}</style>
        <div className="max-w-4xl mx-auto p-6">
          <button onClick={() => setCurrentPage('dashboard')} className={`mb-6 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>← Back</button>
          
          <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>⚙️ Settings</h1>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm space-y-6`}>
            <div>
              <label className={`block text-lg font-semibold mb-3 ${darkMode ? 'text-white' : ''}`}>🌍 Default Currency</label>
              <select
                value={defaultCurrency}
                onChange={(e) => {
                  setDefaultCurrency(e.target.value);
                  setViewCurrency(e.target.value);
                }}
                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
              >
                {Object.entries(CURRENCIES).map(([code, data]) => (
                  <option key={code} value={code}>{data.flag} {code} - {data.name}</option>
                ))}
              </select>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>All amounts will display in {CURRENCIES[defaultCurrency]?.flag} {defaultCurrency} throughout the app</p>
            </div>

            <div>
              <label className={`block text-lg font-semibold mb-3 ${darkMode ? 'text-white' : ''}`}>Theme</label>
              <button onClick={() => setDarkMode(!darkMode)} className={`px-4 py-2 rounded-lg font-semibold ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
            <div>
              <label className={`block text-lg font-semibold mb-3 ${darkMode ? 'text-white' : ''}`}>Language</label>
              <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className={`px-4 py-2 rounded-lg font-semibold ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {lang === 'en' ? '🇸🇦 عربي' : '🇺🇸 English'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}