import { useState } from 'react';
import { Plus, Trash2, DollarSign, TrendingUp, TrendingDown, PiggyBank, Settings, Home, BarChart3, Target, Wallet, Zap, Award, AlertCircle, Flame, TrendingUpIcon, Lightbulb, CheckCircle, ArrowUp, ArrowDown, X, Banknote, Edit3 } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function FinanceApp() {
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(true);
  const [transactionLog, setTransactionLog] = useState([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
  const [banks, setBanks] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [bankTransactions, setBankTransactions] = useState({});
  const [selectedBank, setSelectedBank] = useState(null);
  const [editingBalance, setEditingBalance] = useState(null);
  const [memberships, setMemberships] = useState([]);
  const [newMembership, setNewMembership] = useState({ name: '', cost: '', frequency: 'monthly', currency: selectedCurrency, startDate: new Date().toISOString().split('T')[0], notes: '' });

  const [newBank, setNewBank] = useState({ name: '', balance: '', currency: selectedCurrency });
  const [newWallet, setNewWallet] = useState({ name: '', balance: '', currency: selectedCurrency });
  const [newIncome, setNewIncome] = useState({ source: '', amount: '', currency: selectedCurrency, date: new Date().toISOString().split('T')[0], notes: '' });
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', currency: selectedCurrency, date: new Date().toISOString().split('T')[0], notes: '' });
  const [newBudget, setNewBudget] = useState({ category: '', limit: '', currency: selectedCurrency });
  const [newGoal, setNewGoal] = useState({ name: '', target: '', current: '', currency: selectedCurrency });

  const virtualCurrencies = {
    BTC: { name: 'Bitcoin', rate: 43000, symbol: '₿' },
    ETH: { name: 'Ethereum', rate: 2300, symbol: 'Ξ' },
    DOGE: { name: 'Dogecoin', rate: 0.15, symbol: '🐕' },
    XRP: { name: 'Ripple', rate: 0.52, symbol: 'XRP' }
  };

  const currencies = ['USD', 'EUR', 'GBP', 'AED', 'SAR', 'KWD', 'QAR', 'EGP', 'JOD', 'AUD', 'CAD', 'CHF', 'BTC', 'ETH', 'DOGE', 'XRP'];

  const expenseCategoriesData = {
    en: [
      { name: 'Food', icon: '🍽️' },
      { name: 'Transport', icon: '🚗' },
      { name: 'Entertainment', icon: '🎬' },
      { name: 'Shopping', icon: '🛍️' },
      { name: 'Bills', icon: '📄' },
      { name: 'Health', icon: '⚕️' },
      { name: 'Education', icon: '📚' },
      { name: 'Utilities', icon: '💡' },
      { name: 'Other', icon: '📌' }
    ],
    ar: [
      { name: 'طعام', icon: '🍽️' },
      { name: 'نقل', icon: '🚗' },
      { name: 'ترفيه', icon: '🎬' },
      { name: 'تسوق', icon: '🛍️' },
      { name: 'فواتير', icon: '📄' },
      { name: 'صحة', icon: '⚕️' },
      { name: 'تعليم', icon: '📚' },
      { name: 'خدمات', icon: '💡' },
      { name: 'أخرى', icon: '📌' }
    ]
  };

  const incomeCategories = {
    en: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Gift', 'Business', 'Other'],
    ar: ['راتب', 'عمل حر', 'استثمار', 'مكافأة', 'هدية', 'عمل', 'أخرى']
  };

  const t = {
    en: {
      dashboard: 'Dashboard',
      income: 'Income',
      expenses: 'Expenses',
      banks: 'Banks',
      wallets: 'Wallets',
      budgets: 'Budgets',
      goals: 'Goals',
      resources: 'Resources',
      settings: 'Settings',
      totalIncome: 'Total Income',
      totalExpenses: 'Total Expenses',
      netBalance: 'Net Balance',
      savingsRate: 'Savings Rate',
      addBank: 'Add Bank',
      addIncome: 'Add Income',
      addExpense: 'Add Expense',
      addWallet: 'Add Wallet',
      balance: 'Balance',
      amount: 'Amount',
      date: 'Date',
      currency: 'Currency',
      notes: 'Notes',
      language: 'Language',
      darkMode: 'Dark Mode',
      selectCurrency: 'Default Currency',
      delete: 'Delete',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      healthScore: 'Financial Health',
      accountBalance: 'Account Balance',
      manageFunds: 'Click to Manage Funds',
      deposit: 'Deposit',
      withdrawal: 'Withdrawal',
      addTransaction: 'Add Transaction',
      transactionAmount: 'Amount',
      currentBalance: 'Current Balance',
      newBalance: 'New Balance',
      transactionHistory: 'Recent Transactions',
      incomeSource: 'Income Source',
      category: 'Category',
      budgetLimit: 'Budget Limit',
      goalName: 'Goal Name',
      targetAmount: 'Target Amount',
      currentAmount: 'Current Amount',
      progress: 'Progress',
      cashWallet: 'Cash Wallets',
      totalAssets: 'Total Assets',
      bankAccounts: 'Bank Accounts',
      recentTransactions: 'Recent Activity',
      expenseBreakdown: 'Expense Distribution',
      setBudget: 'Set Budget',
      addGoal: 'Add Goal',
      financeEducation: 'Financial Insights',
      improvementIdeas: 'Improvement Ideas',
      walletHealth: 'Wallet Health',
      editBalance: 'Edit Balance',
      updateBalance: 'Update Balance',
      assets: 'Total Assets',
      projectedBalance: 'Projected Balance',
      monthlyChange: 'Monthly Change',
    },
    ar: {
      dashboard: 'لوحة التحكم',
      income: 'الدخل',
      expenses: 'النفقات',
      banks: 'البنوك',
      wallets: 'المحافظ',
      budgets: 'الميزانيات',
      goals: 'الأهداف',
      resources: 'الموارد',
      settings: 'الإعدادات',
      totalIncome: 'إجمالي الدخل',
      totalExpenses: 'إجمالي النفقات',
      netBalance: 'الرصيد الصافي',
      savingsRate: 'معدل الادخار',
      addBank: 'إضافة بنك',
      addIncome: 'إضافة دخل',
      addExpense: 'إضافة نفقة',
      addWallet: 'إضافة محفظة',
      balance: 'الرصيد',
      amount: 'المبلغ',
      date: 'التاريخ',
      currency: 'العملة',
      notes: 'ملاحظات',
      language: 'اللغة',
      darkMode: 'الوضع الليلي',
      selectCurrency: 'العملة الافتراضية',
      delete: 'حذف',
      edit: 'تعديل',
      save: 'حفظ',
      cancel: 'إلغاء',
      healthScore: 'الصحة المالية',
      accountBalance: 'رصيد الحساب',
      manageFunds: 'انقر لإدارة الأموال',
      deposit: 'إيداع',
      withdrawal: 'سحب',
      addTransaction: 'إضافة معاملة',
      transactionAmount: 'المبلغ',
      currentBalance: 'الرصيد الحالي',
      newBalance: 'الرصيد الجديد',
      transactionHistory: 'المعاملات الأخيرة',
      incomeSource: 'مصدر الدخل',
      category: 'الفئة',
      budgetLimit: 'حد الميزانية',
      goalName: 'اسم الهدف',
      targetAmount: 'المبلغ المستهدف',
      currentAmount: 'المبلغ الحالي',
      progress: 'التقدم',
      cashWallet: 'محافظ الأموال',
      totalAssets: 'إجمالي الأصول',
      bankAccounts: 'الحسابات البنكية',
      recentTransactions: 'النشاط الأخير',
      expenseBreakdown: 'توزيع النفقات',
      setBudget: 'تعيين ميزانية',
      addGoal: 'إضافة هدف',
      financeEducation: 'الرؤى المالية',
      improvementIdeas: 'أفكار التحسين',
      walletHealth: 'صحة المحفظة',
      editBalance: 'تعديل الرصيد',
      updateBalance: 'تحديث الرصيد',
      assets: 'إجمالي الأصول',
      projectedBalance: 'الرصيد المتوقع',
      monthlyChange: 'التغيير الشهري',
    }
  };

  const getCurrencySymbol = () => {
    return virtualCurrencies[selectedCurrency]?.symbol || selectedCurrency;
  };

  const calculateHealthScore = () => {
    let score = 50;
    const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const bankTotal = banks.reduce((sum, b) => sum + b.balance, 0);
    const walletTotal = wallets.reduce((sum, w) => sum + w.balance, 0);
    
    if (totalIncome > 0) {
      const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
      score += Math.min(savingsRate * 0.5, 30);
    }
    if (goals.length > 0) score += 5;
    if (budgets.length > 0) score += 5;
    if (bankTotal + walletTotal > 0) score += 10;
    
    return Math.min(score, 100);
  };

  const generateImprovementIdeas = () => {
    const ideas = [];
    const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const bankTotal = banks.reduce((sum, b) => sum + b.balance, 0);
    const walletTotal = wallets.reduce((sum, w) => sum + w.balance, 0);
    const totalAssets = bankTotal + walletTotal;

    if (totalIncome === 0) {
      ideas.push({ icon: '📊', title: language === 'en' ? 'Start Tracking Income' : 'ابدأ بتتبع الدخل', desc: language === 'en' ? 'Add your first income source to get personalized insights' : 'أضف أول مصدر دخل للحصول على رؤى مخصصة' });
    }

    if (totalIncome > 0) {
      const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
      
      if (savingsRate < 10) {
        ideas.push({ icon: '🚨', title: language === 'en' ? 'Critical: Increase Savings' : 'حرج: زيادة الادخار', desc: language === 'en' ? `Savings at ${savingsRate.toFixed(1)}%. Target 20%+. Reduce expenses by ${((totalIncome * 0.1) / totalExpenses * 100).toFixed(0)}%` : `الادخار في ${savingsRate.toFixed(1)}%. الهدف 20%+` });
      } else if (savingsRate < 20) {
        ideas.push({ icon: '💰', title: language === 'en' ? 'Boost Your Savings' : 'زيادة الادخار', desc: language === 'en' ? `Current: ${savingsRate.toFixed(1)}%. Target 20%. Save ${getCurrencySymbol()}${(totalIncome * 0.2).toFixed(2)} monthly` : `الحالي: ${savingsRate.toFixed(1)}%. الهدف 20%` });
      } else if (savingsRate >= 30) {
        ideas.push({ icon: '🌟', title: language === 'en' ? 'Excellent Savings Rate!' : 'معدل ادخار ممتاز!', desc: language === 'en' ? `You\'re saving ${savingsRate.toFixed(1)}%! Consider investing for wealth growth` : `أنت توفر ${savingsRate.toFixed(1)}%! فكر في الاستثمار` });
      }

      const categoryExpenses = expenseCategoriesData[language].map(cat => ({
        name: cat.name,
        total: expenses.filter(e => e.category === cat.name).reduce((s, e) => s + e.amount, 0)
      })).sort((a, b) => b.total - a.total);

      categoryExpenses.slice(0, 3).forEach((cat, idx) => {
        if (cat.total > 0) {
          const percentage = (cat.total / totalExpenses) * 100;
          if (percentage > 30) {
            ideas.push({ icon: '📉', title: language === 'en' ? `Reduce ${cat.name}` : `قلل ${cat.name}`, desc: language === 'en' ? `${percentage.toFixed(0)}% of spending. Save ${getCurrencySymbol()}${(cat.total * 0.1).toFixed(2)}/month by 10% cut` : `${percentage.toFixed(0)}% من الإنفاق` });
          }
        }
      });
    }

    if (budgets.length === 0 && expenses.length > 3) {
      ideas.push({ icon: '📋', title: language === 'en' ? 'Create Budget Categories' : 'إنشاء فئات الميزانية', desc: language === 'en' ? 'Set limits for each category to prevent overspending' : 'اضبط حدود كل فئة' });
    }

    if (goals.length === 0 && totalIncome > 0) {
      ideas.push({ icon: '🎯', title: language === 'en' ? 'Set Financial Goals' : 'اضبط الأهداف المالية', desc: language === 'en' ? `Create goals like Emergency Fund (${getCurrencySymbol()}${(totalIncome * 3).toFixed(0)}) or Vacation Fund` : 'اخلق أهدافاً محددة' });
    }

    if (totalAssets === 0 && expenses.length > 0) {
      ideas.push({ icon: '🏦', title: language === 'en' ? 'Link Bank Accounts' : 'ربط الحسابات البنكية', desc: language === 'en' ? 'Add your bank accounts to track net worth' : 'أضف حساباتك البنكية' });
    }

    if (totalAssets > 0) {
      const assetToIncomeRatio = (totalAssets / (totalIncome || 1));
      if (assetToIncomeRatio < 1) {
        ideas.push({ icon: '💎', title: language === 'en' ? 'Build Your Safety Net' : 'بناء شبكة الأمان', desc: language === 'en' ? `Assets: ${getCurrencySymbol()}${totalAssets.toFixed(0)}. Target: ${getCurrencySymbol()}${(totalIncome * 6).toFixed(0)} (6 months income)` : 'بناء صندوق الطوارئ' });
      }
    }

    if (expenses.length > 10 && income.length > 0) {
      const avgExpense = totalExpenses / expenses.length;
      ideas.push({ icon: '📊', title: language === 'en' ? 'Analyze Spending Patterns' : 'تحليل نمط الإنفاق', desc: language === 'en' ? `Average transaction: ${getCurrencySymbol()}${avgExpense.toFixed(2)}. Check for recurring waste` : 'تحقق من الإنفاق المتكرر' });
    }

    const hasRecurringExpenses = expenses.filter(e => {
      const count = expenses.filter(x => x.category === e.category).length;
      return count > 2;
    }).length > 0;

    if (hasRecurringExpenses) {
      ideas.push({ icon: '🔄', title: language === 'en' ? 'Optimize Recurring Costs' : 'تحسين التكاليف المتكررة', desc: language === 'en' ? 'Review subscriptions and memberships. Can you negotiate better rates?' : 'راجع الاشتراكات والعضويات' });
    }

    if (totalIncome > totalExpenses && goals.length === 0) {
      ideas.push({ icon: '🚀', title: language === 'en' ? 'Use Your Surplus Wisely' : 'استخدم الفائض بحكمة', desc: language === 'en' ? `You have ${getCurrencySymbol()}${(totalIncome - totalExpenses).toFixed(2)} surplus. Invest or save for goals` : 'لديك فائض استثمر أو وفر' });
    }

    if (language === 'en') {
      ideas.push({ icon: '📱', title: 'Track Daily Spending', desc: 'Log expenses within 24 hours for accuracy and habit formation' });
      ideas.push({ icon: '🎓', title: 'Financial Education', desc: 'Learn about compound interest, diversification, and long-term wealth' });
      ideas.push({ icon: '💳', title: 'Reduce Debt', desc: 'If you have debts, prioritize paying them off (high interest first)' });
      ideas.push({ icon: '🌍', title: 'Diversify Income', desc: 'Multiple income streams provide financial stability and growth' });
    } else {
      ideas.push({ icon: '📱', title: 'تتبع الإنفاق اليومي', desc: 'سجل النفقات خلال 24 ساعة للدقة' });
      ideas.push({ icon: '🎓', title: 'التثقيف المالي', desc: 'تعرف على الفائدة المركبة والتنويع' });
      ideas.push({ icon: '💳', title: 'تقليل الديون', desc: 'إذا كان لديك ديون، أولويتك سدادها' });
      ideas.push({ icon: '🌍', title: 'تنويع الدخل', desc: 'مصادر دخل متعددة توفر استقراراً' });
    }

    return ideas.slice(0, 8);
  };

  const addExpenseEntry = () => {
    if (newExpense.category && newExpense.amount) {
      const expenseData = { ...newExpense, id: Date.now(), amount: parseFloat(newExpense.amount), currency: selectedCurrency };
      setExpenses([...expenses, expenseData]);
      setTransactionLog([...transactionLog, { ...expenseData, type: 'expense', timestamp: new Date().toISOString() }]);
      setNewExpense({ category: '', amount: '', currency: selectedCurrency, date: new Date().toISOString().split('T')[0], notes: '' });
    }
  };

  const addIncomeEntry = () => {
    if (newIncome.source && newIncome.amount) {
      const incomeData = { ...newIncome, id: Date.now(), amount: parseFloat(newIncome.amount), currency: selectedCurrency };
      setIncome([...income, incomeData]);
      setTransactionLog([...transactionLog, { ...incomeData, type: 'income', timestamp: new Date().toISOString() }]);
      setNewIncome({ source: '', amount: '', currency: selectedCurrency, date: new Date().toISOString().split('T')[0], notes: '' });
    }
  };

  const addBank = () => {
    if (newBank.name && newBank.balance) {
      const bankId = Date.now();
      setBanks([...banks, { ...newBank, id: bankId, balance: parseFloat(newBank.balance), currency: selectedCurrency }]);
      setBankTransactions({...bankTransactions, [bankId]: []});
      setNewBank({ name: '', balance: '', currency: selectedCurrency });
    }
  };

  const updateBalance = (id, type, newBalance) => {
    if (type === 'bank') {
      setBanks(banks.map(b => b.id === id ? {...b, balance: parseFloat(newBalance)} : b));
    } else {
      setWallets(wallets.map(w => w.id === id ? {...w, balance: parseFloat(newBalance)} : w));
    }
    setEditingBalance(null);
  };

  const addBankTransaction = (bankId, type, amount, notes) => {
    const bank = banks.find(b => b.id === bankId);
    if (bank && amount > 0) {
      const newBalance = type === 'deposit' ? bank.balance + parseFloat(amount) : bank.balance - parseFloat(amount);
      setBanks(banks.map(b => b.id === bankId ? {...b, balance: newBalance} : b));
      setBankTransactions({
        ...bankTransactions,
        [bankId]: [...(bankTransactions[bankId] || []), {
          id: Date.now(),
          type,
          amount: parseFloat(amount),
          date: new Date().toISOString().split('T')[0],
          notes,
          balanceAfter: newBalance
        }]
      });
      setTransactionLog([...transactionLog, { type: 'bank_transaction', bankName: bank.name, transactionType: type, amount: parseFloat(amount), newBalance, notes, timestamp: new Date().toISOString(), date: new Date().toISOString().split('T')[0] }]);
    }
  };

  const addWallet = () => {
    if (newWallet.name && newWallet.balance) {
      const walletId = Date.now();
      setWallets([...wallets, { ...newWallet, id: walletId, balance: parseFloat(newWallet.balance), currency: selectedCurrency }]);
      setBankTransactions({...bankTransactions, [walletId]: []});
      setNewWallet({ name: '', balance: '', currency: selectedCurrency });
    }
  };

  const addWalletTransaction = (walletId, type, amount, notes) => {
    const wallet = wallets.find(w => w.id === walletId);
    if (wallet && amount > 0) {
      const newBalance = type === 'deposit' ? wallet.balance + parseFloat(amount) : wallet.balance - parseFloat(amount);
      setWallets(wallets.map(w => w.id === walletId ? {...w, balance: newBalance} : w));
      setBankTransactions({
        ...bankTransactions,
        [walletId]: [...(bankTransactions[walletId] || []), {
          id: Date.now(),
          type,
          amount: parseFloat(amount),
          date: new Date().toISOString().split('T')[0],
          notes,
          balanceAfter: newBalance
        }]
      });
    }
  };

  const addBudget = () => {
    if (newBudget.category && newBudget.limit) {
      setBudgets([...budgets, { ...newBudget, id: Date.now(), limit: parseFloat(newBudget.limit), currency: selectedCurrency }]);
      setNewBudget({ category: '', limit: '', currency: selectedCurrency });
    }
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.target) {
      setGoals([...goals, { ...newGoal, id: Date.now(), target: parseFloat(newGoal.target), current: parseFloat(newGoal.current) || 0, currency: selectedCurrency }]);
      setTransactionLog([...transactionLog, { type: 'goal_created', name: newGoal.name, target: parseFloat(newGoal.target), timestamp: new Date().toISOString(), date: new Date().toISOString().split('T')[0] }]);
      setNewGoal({ name: '', target: '', current: '', currency: selectedCurrency });
    }
  };

  const addMembership = () => {
    if (newMembership.name && newMembership.cost) {
      setMemberships([...memberships, { ...newMembership, id: Date.now(), cost: parseFloat(newMembership.cost), currency: selectedCurrency }]);
      setTransactionLog([...transactionLog, { type: 'membership_added', name: newMembership.name, cost: parseFloat(newMembership.cost), frequency: newMembership.frequency, timestamp: new Date().toISOString(), date: new Date().toISOString().split('T')[0] }]);
      setNewMembership({ name: '', cost: '', frequency: 'monthly', currency: selectedCurrency, startDate: new Date().toISOString().split('T')[0], notes: '' });
    }
  };

  const calculateMonthlyCost = () => {
    return memberships.reduce((total, m) => {
      const cost = parseFloat(m.cost);
      if (m.frequency === 'monthly') return total + cost;
      if (m.frequency === 'quarterly') return total + (cost / 3);
      if (m.frequency === 'yearly') return total + (cost / 12);
      if (m.frequency === 'weekly') return total + (cost * 4.33);
      return total;
    }, 0);
  };

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const bankTotal = banks.reduce((sum, b) => sum + b.balance, 0);
  const walletTotal = wallets.reduce((sum, w) => sum + w.balance, 0);
  const totalAssets = bankTotal + walletTotal;
  const netBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((netBalance / totalIncome) * 100) : 0;
  const healthScore = calculateHealthScore();
  const improvementIdeas = generateImprovementIdeas();
  const allTransactions = [...expenses.map(e => ({...e, type: 'expense'})), ...income.map(i => ({...i, type: 'income'}))].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

  const bgClass = darkMode ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900';
  const cardClass = darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200';
  const inputClass = darkMode ? 'bg-slate-800 border-slate-700 text-slate-50' : 'bg-slate-50 border-slate-300 text-slate-900';
  const accentClass = darkMode ? 'bg-slate-800/50' : 'bg-slate-100';

  const renderBankModal = () => (
    selectedBank && (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className={`${cardClass} rounded-2xl shadow-2xl max-w-md w-full max-h-96 overflow-y-auto`}>
          <div className="sticky top-0 flex justify-between items-center p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold">{selectedBank.name}</h2>
            <button onClick={() => setSelectedBank(null)} className="hover:bg-slate-800 p-2 rounded-lg transition">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className={`p-4 rounded-xl ${accentClass}`}>
              <p className="text-xs opacity-70">{t[language].accountBalance}</p>
              <p className="text-3xl font-bold text-teal-400">{getCurrencySymbol()}{(selectedBank.type === 'bank' ? banks.find(b => b.id === selectedBank.id)?.balance : wallets.find(w => w.id === selectedBank.id)?.balance) || 0}</p>
            </div>

            <div className="space-y-3 border-t border-slate-700 pt-4">
              <h3 className="font-bold">{t[language].addTransaction}</h3>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const amount = prompt(t[language].transactionAmount);
                    const notes = prompt(t[language].notes);
                    if (amount && !isNaN(amount)) {
                      selectedBank.type === 'bank' ? addBankTransaction(selectedBank.id, 'deposit', amount, notes || '') : addWalletTransaction(selectedBank.id, 'deposit', amount, notes || '');
                    }
                  }}
                  className="flex-1 bg-gradient-to-br from-teal-600 to-teal-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-teal-500 hover:to-teal-600 transition"
                >
                  <ArrowDown size={18} /> {t[language].deposit}
                </button>
                <button 
                  onClick={() => {
                    const amount = prompt(t[language].transactionAmount);
                    const notes = prompt(t[language].notes);
                    if (amount && !isNaN(amount)) {
                      selectedBank.type === 'bank' ? addBankTransaction(selectedBank.id, 'withdrawal', amount, notes || '') : addWalletTransaction(selectedBank.id, 'withdrawal', amount, notes || '');
                    }
                  }}
                  className="flex-1 bg-gradient-to-br from-amber-600 to-amber-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-amber-500 hover:to-amber-600 transition"
                >
                  <ArrowUp size={18} /> {t[language].withdrawal}
                </button>
              </div>
            </div>

            {bankTransactions[selectedBank.id] && bankTransactions[selectedBank.id].length > 0 && (
              <div className="border-t border-slate-700 pt-4">
                <h3 className="font-bold mb-3">{t[language].transactionHistory}</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {[...bankTransactions[selectedBank.id]].reverse().map(trans => (
                    <div key={trans.id} className={`p-3 rounded-lg ${accentClass} text-sm`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={trans.type === 'deposit' ? 'text-teal-400 font-semibold' : 'text-amber-400 font-semibold'}>
                          {trans.type === 'deposit' ? '+' : '-'}{getCurrencySymbol()}{trans.amount.toFixed(2)}
                        </span>
                        <span className="text-xs opacity-50">{trans.date}</span>
                      </div>
                      <div className="text-xs opacity-50">Balance: {getCurrencySymbol()}{trans.balanceAfter.toFixed(2)}</div>
                      {trans.notes && <div className="text-xs mt-1">Note: {trans.notes}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );

  const renderDashboard = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-8">{t[language].dashboard}</h1>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className={`${cardClass} rounded-2xl p-6 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800`}>
          <p className="text-xs opacity-70">{t[language].totalIncome}</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2">{getCurrencySymbol()}{totalIncome.toFixed(2)}</p>
          <p className="text-xs text-emerald-400/70 mt-1">+{income.length} entries</p>
        </div>
        
        <div className={`${cardClass} rounded-2xl p-6 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800`}>
          <p className="text-xs opacity-70">{t[language].totalExpenses}</p>
          <p className="text-3xl font-bold text-rose-400 mt-2">{getCurrencySymbol()}{totalExpenses.toFixed(2)}</p>
          <p className="text-xs text-rose-400/70 mt-1">{expenses.length} entries</p>
        </div>
        
        <div className={`${cardClass} rounded-2xl p-6 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800`}>
          <p className="text-xs opacity-70">{t[language].netBalance}</p>
          <p className={`text-3xl font-bold mt-2 ${netBalance >= 0 ? 'text-cyan-400' : 'text-rose-400'}`}>{getCurrencySymbol()}{netBalance.toFixed(2)}</p>
          <p className={`text-xs mt-1 ${netBalance >= 0 ? 'text-cyan-400/70' : 'text-rose-400/70'}`}>{netBalance >= 0 ? 'Positive' : 'Negative'}</p>
        </div>

        <div className={`${cardClass} rounded-2xl p-6 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800`}>
          <p className="text-xs opacity-70">{t[language].savingsRate}</p>
          <p className="text-3xl font-bold text-violet-400 mt-2">{savingsRate.toFixed(1)}%</p>
          <p className="text-xs text-violet-400/70 mt-1">{savingsRate >= 20 ? 'Excellent' : 'Good'}</p>
        </div>
      </div>

      {/* Health Score */}
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-8`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2"><Award size={24} className="text-indigo-400" /> {t[language].healthScore}</h3>
          <p className="text-3xl font-bold text-indigo-400">{healthScore.toFixed(0)}/100</p>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{width: `${healthScore}%`}} />
        </div>
      </div>

      {/* Assets Overview */}
      {(banks.length > 0 || wallets.length > 0) && (
        <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-8`}>
          <h3 className="text-lg font-bold mb-6">{t[language].assets}: <span className="text-cyan-400">{getCurrencySymbol()}{totalAssets.toFixed(2)}</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banks.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-teal-400">🏦 {t[language].bankAccounts}</h4>
                <div className="space-y-2">
                  {banks.map(bank => (
                    <div key={bank.id} className={`p-4 rounded-xl ${accentClass} cursor-pointer hover:bg-slate-800/70 transition flex justify-between items-center group`} onClick={() => setSelectedBank({id: bank.id, name: bank.name, type: 'bank'})}>
                      <div>
                        <p className="font-semibold group-hover:text-teal-400 transition">{bank.name}</p>
                        <p className="text-xs opacity-50">{t[language].manageFunds}</p>
                      </div>
                      <p className="font-bold text-teal-400">{getCurrencySymbol()}{bank.balance.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {wallets.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-amber-400">💼 {t[language].cashWallet}</h4>
                <div className="space-y-2">
                  {wallets.map(wallet => (
                    <div key={wallet.id} className={`p-4 rounded-xl ${accentClass} cursor-pointer hover:bg-slate-800/70 transition flex justify-between items-center group`} onClick={() => setSelectedBank({id: wallet.id, name: wallet.name, type: 'wallet'})}>
                      <div>
                        <p className="font-semibold group-hover:text-amber-400 transition">{wallet.name}</p>
                        <p className="text-xs opacity-50">{t[language].manageFunds}</p>
                      </div>
                      <p className="font-bold text-amber-400">{getCurrencySymbol()}{wallet.balance.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Improvement Ideas */}
      {improvementIdeas.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Lightbulb size={24} className="text-yellow-400" /> {t[language].improvementIdeas}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {improvementIdeas.slice(0, 4).map((idea, idx) => (
              <div key={idx} className={`${cardClass} rounded-xl p-4 border-l-4 border-yellow-500/50 hover:border-yellow-500 transition`}>
                <p className="text-2xl mb-2">{idea.icon}</p>
                <p className="font-semibold mb-1">{idea.title}</p>
                <p className="text-xs opacity-70">{idea.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {allTransactions.length > 0 && (
        <div className={`${cardClass} rounded-2xl p-6 shadow-lg`}>
          <h3 className="text-lg font-bold mb-4">{t[language].recentTransactions}</h3>
          <div className="space-y-2">
            {allTransactions.map(trans => (
              <div key={trans.id} className={`p-3 rounded-lg ${accentClass} flex justify-between items-center`}>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{trans.type === 'expense' ? trans.category : trans.source}</p>
                  <p className="text-xs opacity-50">{trans.date}</p>
                </div>
                <p className={`font-bold ${trans.type === 'expense' ? 'text-rose-400' : 'text-emerald-400'}`}>{trans.type === 'expense' ? '-' : '+'}{getCurrencySymbol()}{trans.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {renderBankModal()}
    </div>
  );

  const renderExpenses = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">{t[language].expenses}</h1>
      
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-6`}>
        <h2 className="text-xl font-bold mb-4">{t[language].addExpense}</h2>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {expenseCategoriesData[language].map(cat => (
            <button key={cat.name} onClick={() => setNewExpense({...newExpense, category: cat.name})} className={`p-3 rounded-lg transition font-semibold text-sm ${newExpense.category === cat.name ? 'bg-rose-600/50 border border-rose-500' : accentClass}`}>
              <span className="block text-lg mb-1">{cat.icon}</span> {cat.name.length > 8 ? cat.name.substring(0, 8) : cat.name}
            </button>
          ))}
        </div>
        
        <input type="number" placeholder={t[language].amount} value={newExpense.amount} onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-rose-500 ${inputClass}`} />
        <textarea placeholder={t[language].notes} value={newExpense.notes} onChange={(e) => setNewExpense({...newExpense, notes: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-rose-500 ${inputClass}`} rows="2" />
        <input type="date" value={newExpense.date} onChange={(e) => setNewExpense({...newExpense, date: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-rose-500 ${inputClass}`} />
        <button onClick={addExpenseEntry} className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold py-3 rounded-lg transition">
          <Plus size={20} className="inline mr-2" /> {t[language].addExpense}
        </button>
      </div>

      <div className="space-y-2">
        {expenses.map(exp => (
          <div key={exp.id} className={`${cardClass} rounded-lg p-4 flex justify-between items-start`}>
            <div className="flex-1">
              <p className="font-bold">{exp.category}</p>
              <p className="text-xs opacity-50">{exp.date}</p>
              {exp.notes && <p className="text-xs mt-1">{exp.notes}</p>}
            </div>
            <div className="flex items-center gap-2 ml-4">
              <p className="text-lg font-bold text-rose-400">{getCurrencySymbol()}{exp.amount.toFixed(2)}</p>
              <button onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))} className="text-rose-500 hover:text-rose-600">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIncome = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">{t[language].income}</h1>
      
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-6`}>
        <h2 className="text-xl font-bold mb-4">{t[language].addIncome}</h2>
        <select value={newIncome.source} onChange={(e) => setNewIncome({...newIncome, source: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputClass}`}>
          <option value="">{t[language].incomeSource}</option>
          {incomeCategories[language].map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="number" placeholder={t[language].amount} value={newIncome.amount} onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputClass}`} />
        <textarea placeholder={t[language].notes} value={newIncome.notes} onChange={(e) => setNewIncome({...newIncome, notes: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputClass}`} rows="2" />
        <input type="date" value={newIncome.date} onChange={(e) => setNewIncome({...newIncome, date: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputClass}`} />
        <button onClick={addIncomeEntry} className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold py-3 rounded-lg transition">
          <Plus size={20} className="inline mr-2" /> {t[language].addIncome}
        </button>
      </div>

      <div className="space-y-2">
        {income.map(inc => (
          <div key={inc.id} className={`${cardClass} rounded-lg p-4 flex justify-between items-start`}>
            <div className="flex-1">
              <p className="font-bold">{inc.source}</p>
              <p className="text-xs opacity-50">{inc.date}</p>
              {inc.notes && <p className="text-xs mt-1">{inc.notes}</p>}
            </div>
            <div className="flex items-center gap-2 ml-4">
              <p className="text-lg font-bold text-emerald-400">+{getCurrencySymbol()}{inc.amount.toFixed(2)}</p>
              <button onClick={() => setIncome(income.filter(i => i.id !== inc.id))} className="text-rose-500 hover:text-rose-600">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBanks = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">{t[language].banks}</h1>
      
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-6`}>
        <input type="text" placeholder={t[language].bankAccounts} value={newBank.name} onChange={(e) => setNewBank({...newBank, name: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500 ${inputClass}`} />
        <input type="number" placeholder={t[language].balance} value={newBank.balance} onChange={(e) => setNewBank({...newBank, balance: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 ${inputClass}`} />
        <button onClick={addBank} className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold py-3 rounded-lg transition">
          <Plus size={20} className="inline mr-2" /> {t[language].addBank}
        </button>
      </div>

      <div className="space-y-4">
        {banks.map(bank => (
          <div key={bank.id} onClick={() => setSelectedBank({id: bank.id, name: bank.name, type: 'bank'})} className={`${cardClass} rounded-2xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer flex justify-between items-center group`}>
            <div>
              <p className="font-bold text-lg group-hover:text-teal-400 transition">🏦 {bank.name}</p>
              <p className="text-xs opacity-50 mt-1">{t[language].manageFunds}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-3xl font-bold text-teal-400">{getCurrencySymbol()}{bank.balance.toFixed(2)}</p>
                <button onClick={(e) => {e.stopPropagation(); setEditingBalance({id: bank.id, type: 'bank', value: bank.balance});}} className="text-xs text-teal-400/70 hover:text-teal-400 mt-1 flex items-center gap-1">
                  <Edit3 size={14} /> {t[language].editBalance}
                </button>
              </div>
              <button onClick={(e) => {e.stopPropagation(); setBanks(banks.filter(b => b.id !== bank.id));}} className="text-rose-500 hover:text-rose-600">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingBalance && editingBalance.type === 'bank' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className={`${cardClass} rounded-2xl p-6 max-w-sm w-full`}>
            <h2 className="text-xl font-bold mb-4">{t[language].updateBalance}</h2>
            <input type="number" value={editingBalance.value} onChange={(e) => setEditingBalance({...editingBalance, value: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 ${inputClass}`} />
            <div className="flex gap-2">
              <button onClick={() => updateBalance(editingBalance.id, editingBalance.type, editingBalance.value)} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold transition">
                {t[language].save}
              </button>
              <button onClick={() => setEditingBalance(null)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition">
                {t[language].cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {renderBankModal()}
    </div>
  );

  const renderWallets = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">{t[language].wallets}</h1>
      
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-6`}>
        <input type="text" placeholder={t[language].cashWallet} value={newWallet.name} onChange={(e) => setNewWallet({...newWallet, name: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-amber-500 ${inputClass}`} />
        <input type="number" placeholder={t[language].balance} value={newWallet.balance} onChange={(e) => setNewWallet({...newWallet, balance: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 ${inputClass}`} />
        <button onClick={addWallet} className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-3 rounded-lg transition">
          <Plus size={20} className="inline mr-2" /> {t[language].addWallet}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wallets.map(wallet => (
          <div key={wallet.id} onClick={() => setSelectedBank({id: wallet.id, name: wallet.name, type: 'wallet'})} className={`${cardClass} rounded-2xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer group`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-lg group-hover:text-amber-400 transition">💼 {wallet.name}</p>
                <p className="text-xs opacity-50 mt-1">{t[language].manageFunds}</p>
              </div>
              <button onClick={(e) => {e.stopPropagation(); setWallets(wallets.filter(w => w.id !== wallet.id));}} className="text-rose-500 hover:text-rose-600">
                <Trash2 size={20} />
              </button>
            </div>
            <p className="text-3xl font-bold text-amber-400 mb-2">{getCurrencySymbol()}{wallet.balance.toFixed(2)}</p>
            <button onClick={(e) => {e.stopPropagation(); setEditingBalance({id: wallet.id, type: 'wallet', value: wallet.balance});}} className="text-xs text-amber-400/70 hover:text-amber-400 flex items-center gap-1">
              <Edit3 size={14} /> {t[language].editBalance}
            </button>
          </div>
        ))}
      </div>

      {editingBalance && editingBalance.type === 'wallet' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className={`${cardClass} rounded-2xl p-6 max-w-sm w-full`}>
            <h2 className="text-xl font-bold mb-4">{t[language].updateBalance}</h2>
            <input type="number" value={editingBalance.value} onChange={(e) => setEditingBalance({...editingBalance, value: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 ${inputClass}`} />
            <div className="flex gap-2">
              <button onClick={() => updateBalance(editingBalance.id, editingBalance.type, editingBalance.value)} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold transition">
                {t[language].save}
              </button>
              <button onClick={() => setEditingBalance(null)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition">
                {t[language].cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {renderBankModal()}
    </div>
  );

  const renderBudgets = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">{t[language].budgets}</h1>
      
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-6`}>
        <select value={newBudget.category} onChange={(e) => setNewBudget({...newBudget, category: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-violet-500 ${inputClass}`}>
          <option value="">{t[language].category}</option>
          {expenseCategoriesData[language].map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
        </select>
        <input type="number" placeholder={t[language].budgetLimit} value={newBudget.limit} onChange={(e) => setNewBudget({...newBudget, limit: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500 ${inputClass}`} />
        <button onClick={addBudget} className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-semibold py-3 rounded-lg transition">
          <Plus size={20} className="inline mr-2" /> {t[language].setBudget}
        </button>
      </div>

      <div className="space-y-4">
        {budgets.map(budget => {
          const spent = expenses.filter(e => e.category === budget.category).reduce((sum, e) => sum + e.amount, 0);
          const percentage = (spent / budget.limit) * 100;
          return (
            <div key={budget.id} className={`${cardClass} rounded-2xl p-6 shadow-lg`}>
              <div className="flex justify-between items-center mb-4">
                <p className="font-bold text-lg">{budget.category}</p>
                <p className="text-sm font-semibold text-violet-400">{getCurrencySymbol()}{spent.toFixed(2)} / {getCurrencySymbol()}{budget.limit.toFixed(2)}</p>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden mb-3">
                <div className={`h-full rounded-full transition ${percentage > 100 ? 'bg-rose-500' : percentage > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{width: `${Math.min(percentage, 100)}%`}} />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold">{percentage.toFixed(0)}% {t[language].progress}</p>
                <button onClick={() => setBudgets(budgets.filter(b => b.id !== budget.id))} className="text-rose-500 hover:text-rose-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">{t[language].goals}</h1>
      
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-6`}>
        <input type="text" placeholder={t[language].goalName} value={newGoal.name} onChange={(e) => setNewGoal({...newGoal, name: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${inputClass}`} />
        <input type="number" placeholder={t[language].targetAmount} value={newGoal.target} onChange={(e) => setNewGoal({...newGoal, target: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${inputClass}`} />
        <input type="number" placeholder={t[language].currentAmount} value={newGoal.current} onChange={(e) => setNewGoal({...newGoal, current: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${inputClass}`} />
        <button onClick={addGoal} className="w-full bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 hover:from-fuchsia-500 hover:to-fuchsia-600 text-white font-semibold py-3 rounded-lg transition">
          <Plus size={20} className="inline mr-2" /> {t[language].addGoal}
        </button>
      </div>

      <div className="space-y-4">
        {goals.map(goal => {
          const percentage = (goal.current / goal.target) * 100;
          return (
            <div key={goal.id} className={`${cardClass} rounded-2xl p-6 shadow-lg`}>
              <div className="flex justify-between items-center mb-4">
                <p className="font-bold text-lg">🎯 {goal.name}</p>
                <p className="text-sm font-semibold text-fuchsia-400">{getCurrencySymbol()}{goal.current.toFixed(2)} / {getCurrencySymbol()}{goal.target.toFixed(2)}</p>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden mb-3">
                <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500" style={{width: `${Math.min(percentage, 100)}%`}} />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-fuchsia-400">{percentage.toFixed(1)}% {t[language].progress}</p>
                <button onClick={() => setGoals(goals.filter(g => g.id !== goal.id))} className="text-rose-500 hover:text-rose-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">💡 {t[language].resources}</h1>
      
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg`}>
        <h2 className="text-xl font-bold mb-4">{t[language].financeEducation}</h2>
        <div className="space-y-4">
          <div className="border-b border-slate-700 pb-4">
            <h3 className="font-bold mb-2 flex items-center gap-2"><TrendingUp size={20} className="text-cyan-400" /> 50/30/20 Rule</h3>
            <ul className="text-sm space-y-1 opacity-80">
              <li>• 50%: {language === 'en' ? 'Essential expenses' : 'النفقات الأساسية'}</li>
              <li>• 30%: {language === 'en' ? 'Discretionary spending' : 'الإنفاق التقديري'}</li>
              <li>• 20%: {language === 'en' ? 'Savings and investments' : 'الادخار والاستثمارات'}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 flex items-center gap-2"><CheckCircle size={20} className="text-emerald-400" /> {language === 'en' ? 'Wealth Building Tips' : 'نصائح بناء الثروة'}</h3>
            <ul className="text-sm space-y-1 opacity-80">
              <li>✓ {language === 'en' ? 'Create emergency fund (3-6 months)' : 'إنشاء صندوق طوارئ (3-6 أشهر)'}</li>
              <li>✓ {language === 'en' ? 'Automate your savings' : 'أتمتة مدخراتك'}</li>
              <li>✓ {language === 'en' ? 'Diversify investments' : 'تنويع الاستثمارات'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMemberships = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">🎫 {language === 'en' ? 'Memberships & Subscriptions' : 'العضويات والاشتراكات'}</h1>
      
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-6`}>
        <h2 className="text-xl font-bold mb-4">{language === 'en' ? 'Add Membership' : 'إضافة عضوية'}</h2>
        <input type="text" placeholder={language === 'en' ? 'Membership Name (Netflix, Gym, etc)' : 'اسم العضوية'} value={newMembership.name} onChange={(e) => setNewMembership({...newMembership, name: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${inputClass}`} />
        <input type="number" placeholder={language === 'en' ? 'Cost Amount' : 'مبلغ التكلفة'} value={newMembership.cost} onChange={(e) => setNewMembership({...newMembership, cost: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${inputClass}`} />
        
        <select value={newMembership.frequency} onChange={(e) => setNewMembership({...newMembership, frequency: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${inputClass}`}>
          <option value="weekly">{language === 'en' ? 'Weekly' : 'أسبوعي'}</option>
          <option value="monthly">{language === 'en' ? 'Monthly' : 'شهري'}</option>
          <option value="quarterly">{language === 'en' ? 'Quarterly' : 'ربع سنوي'}</option>
          <option value="yearly">{language === 'en' ? 'Yearly' : 'سنوي'}</option>
        </select>

        <input type="date" value={newMembership.startDate} onChange={(e) => setNewMembership({...newMembership, startDate: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${inputClass}`} />
        <textarea placeholder={language === 'en' ? 'Notes (optional)' : 'ملاحظات (اختياري)'} value={newMembership.notes} onChange={(e) => setNewMembership({...newMembership, notes: e.target.value})} className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500 ${inputClass}`} rows="2" />
        
        <button onClick={addMembership} className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition">
          <Plus size={20} className="inline mr-2" /> {language === 'en' ? 'Add Membership' : 'إضافة عضوية'}
        </button>
      </div>

      {/* Monthly Cost Summary */}
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-6`}>
        <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Monthly Subscription Cost' : 'تكلفة الاشتراك الشهري'}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${accentClass}`}>
            <p className="text-sm opacity-70">{language === 'en' ? 'Total Monthly' : 'إجمالي الشهري'}</p>
            <p className="text-3xl font-bold text-pink-400 mt-1">{getCurrencySymbol()}{calculateMonthlyCost().toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-lg ${accentClass}`}>
            <p className="text-sm opacity-70">{language === 'en' ? 'Annual Cost' : 'التكلفة السنوية'}</p>
            <p className="text-3xl font-bold text-orange-400 mt-1">{getCurrencySymbol()}{(calculateMonthlyCost() * 12).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Memberships List */}
      <div className="space-y-4">
        {memberships.map(membership => (
          <div key={membership.id} className={`${cardClass} rounded-2xl p-6 shadow-lg`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-lg">🎫 {membership.name}</p>
                <p className="text-sm opacity-70">{language === 'en' ? 'Started' : 'بدأ'}: {membership.startDate}</p>
              </div>
              <button onClick={() => {
                setMemberships(memberships.filter(m => m.id !== membership.id));
                setTransactionLog([...transactionLog, { type: 'membership_removed', name: membership.name, timestamp: new Date().toISOString(), date: new Date().toISOString().split('T')[0] }]);
              }} className="text-rose-500 hover:text-rose-600">
                <Trash2 size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className={`p-3 rounded-lg ${accentClass}`}>
                <p className="text-xs opacity-70">{language === 'en' ? 'Amount' : 'المبلغ'}</p>
                <p className="text-lg font-bold text-pink-400">{getCurrencySymbol()}{membership.cost.toFixed(2)}</p>
              </div>
              <div className={`p-3 rounded-lg ${accentClass}`}>
                <p className="text-xs opacity-70">{language === 'en' ? 'Frequency' : 'التكرار'}</p>
                <p className="text-sm font-semibold">{membership.frequency}</p>
              </div>
              <div className={`p-3 rounded-lg ${accentClass}`}>
                <p className="text-xs opacity-70">{language === 'en' ? 'Monthly' : 'شهري'}</p>
                <p className="text-lg font-bold text-orange-400">
                  {getCurrencySymbol()}
                  {(
                    membership.frequency === 'monthly' ? membership.cost :
                    membership.frequency === 'quarterly' ? membership.cost / 3 :
                    membership.frequency === 'yearly' ? membership.cost / 12 :
                    membership.frequency === 'weekly' ? membership.cost * 4.33 : 0
                  ).toFixed(2)}
                </p>
              </div>
            </div>
            
            {membership.notes && (
              <p className="text-sm opacity-75 border-t border-slate-700 pt-3">{membership.notes}</p>
            )}
          </div>
        ))}
        
        {memberships.length === 0 && (
          <div className={`${cardClass} rounded-2xl p-8 text-center opacity-50`}>
            <p>{language === 'en' ? 'No memberships added yet' : 'لم تتم إضافة عضويات بعد'}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">📊 {language === 'en' ? 'Complete Transaction Log' : 'سجل المعاملات الكامل'}</h1>
      
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg mb-6`}>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${accentClass}`}>
            <p className="text-xs opacity-70">{language === 'en' ? 'Total Transactions' : 'إجمالي المعاملات'}</p>
            <p className="text-3xl font-bold text-cyan-400 mt-1">{transactionLog.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${accentClass}`}>
            <p className="text-xs opacity-70">{language === 'en' ? 'Income Entries' : 'إدخالات الدخل'}</p>
            <p className="text-3xl font-bold text-emerald-400 mt-1">{income.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${accentClass}`}>
            <p className="text-xs opacity-70">{language === 'en' ? 'Expense Entries' : 'إدخالات النفقات'}</p>
            <p className="text-3xl font-bold text-rose-400 mt-1">{expenses.length}</p>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4">{language === 'en' ? 'Transaction History (Latest First)' : 'سجل المعاملات (الأحدث أولاً)'}</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {[...transactionLog].reverse().map((trans, idx) => (
            <div key={idx} className={`p-3 rounded-lg ${accentClass} flex justify-between items-center text-sm`}>
              <div className="flex-1">
                <p className="font-semibold">
                  {trans.type === 'income' && `💰 ${trans.source}`}
                  {trans.type === 'expense' && `💸 ${trans.category}`}
                  {trans.type === 'bank_transaction' && `🏦 ${trans.bankName} (${trans.transactionType === 'deposit' ? '⬇️ Deposit' : '⬆️ Withdrawal'})`}
                  {trans.type === 'membership_added' && `🎫 ${trans.name} Added`}
                  {trans.type === 'membership_removed' && `❌ ${trans.name} Removed`}
                  {trans.type === 'goal_created' && `🎯 ${trans.name} Goal`}
                </p>
                <p className="text-xs opacity-50">{trans.date}</p>
              </div>
              <div className="text-right">
                {(trans.type === 'income' || trans.type === 'expense' || trans.type === 'bank_transaction' || trans.type === 'membership_added') && (
                  <p className={`font-bold ${trans.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {trans.type === 'income' ? '+' : trans.type === 'bank_transaction' && trans.transactionType === 'deposit' ? '+' : '-'}{getCurrencySymbol()}{trans.amount.toFixed(2)}
                  </p>
                )}
                {trans.type === 'goal_created' && (
                  <p className="font-bold text-fuchsia-400">{getCurrencySymbol()}{trans.target.toFixed(2)}</p>
                )}
              </div>
            </div>
          ))}
          {transactionLog.length === 0 && (
            <p className="text-center opacity-50 py-8">{language === 'en' ? 'No transactions yet' : 'لا توجد معاملات بعد'}</p>
          )}
        </div>
      </div>

      <div className={`${cardClass} rounded-2xl p-6 shadow-lg`}>
        <h2 className="text-lg font-bold mb-4">{language === 'en' ? 'Financial Summary' : 'الملخص المالي'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${accentClass}`}>
            <p className="text-xs opacity-70">{language === 'en' ? 'Avg Transaction' : 'متوسط المعاملة'}</p>
            <p className="text-2xl font-bold text-cyan-400">{getCurrencySymbol()}{(transactionLog.length > 0 ? transactionLog.reduce((s, t) => s + t.amount, 0) / transactionLog.length : 0).toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-lg ${accentClass}`}>
            <p className="text-xs opacity-70">{language === 'en' ? 'Total Transactions' : 'إجمالي المعاملات'}</p>
            <p className="text-2xl font-bold text-violet-400">{getCurrencySymbol()}{transactionLog.reduce((s, t) => s + t.amount, 0).toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-lg ${accentClass}`}>
            <p className="text-xs opacity-70">{language === 'en' ? 'Largest Transaction' : 'أكبر معاملة'}</p>
            <p className="text-2xl font-bold text-amber-400">{getCurrencySymbol()}{(transactionLog.length > 0 ? Math.max(...transactionLog.map(t => t.amount)) : 0).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">{t[language].settings}</h1>
      
      <div className={`${cardClass} rounded-2xl p-6 shadow-lg space-y-6`}>
        <div>
          <label className="block font-semibold mb-3">{t[language].language}</label>
          <div className="flex gap-2">
            <button onClick={() => setLanguage('en')} className={`px-6 py-3 rounded-lg font-semibold transition ${language === 'en' ? 'bg-cyan-600 text-white' : accentClass}`}>
              🇬🇧 English
            </button>
            <button onClick={() => setLanguage('ar')} className={`px-6 py-3 rounded-lg font-semibold transition ${language === 'ar' ? 'bg-cyan-600 text-white' : accentClass}`}>
              🇸🇦 العربية
            </button>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-3">{t[language].selectCurrency}</label>
          <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${inputClass}`}>
            <optgroup label="Virtual Currencies">
              {['BTC', 'ETH', 'DOGE', 'XRP'].map(c => <option key={c} value={c}>{virtualCurrencies[c].symbol} {c}</option>)}
            </optgroup>
            <optgroup label="Fiat Currencies">
              {['USD', 'EUR', 'GBP', 'AED', 'SAR', 'KWD', 'QAR', 'EGP', 'JOD', 'AUD', 'CAD', 'CHF'].map(c => <option key={c} value={c}>{c}</option>)}
            </optgroup>
          </select>
        </div>

        <div className={`p-4 rounded-lg ${accentClass} border-l-4 border-cyan-500`}>
          <p className="font-semibold mb-2">💎 Premium Features</p>
          <ul className="text-sm space-y-1">
            <li>✅ Unlimited Accounts</li>
            <li>✅ Smart Insights & Tips</li>
            <li>✅ Real-time Tracking</li>
            <li>✅ Multi-currency Support</li>
            <li>✅ Wealth Building Guides</li>
          </ul>
        </div>

        <div>
          <p className="text-sm opacity-70">Version 7.0 • Made for Smart Money Management</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <div className="max-w-2xl mx-auto p-4 pb-24">
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'income' && renderIncome()}
        {activeSection === 'expenses' && renderExpenses()}
        {activeSection === 'banks' && renderBanks()}
        {activeSection === 'wallets' && renderWallets()}
        {activeSection === 'budgets' && renderBudgets()}
        {activeSection === 'goals' && renderGoals()}
        {activeSection === 'memberships' && renderMemberships()}
        {activeSection === 'analytics' && renderAnalytics()}
        {activeSection === 'resources' && renderResources()}
        {activeSection === 'settings' && renderSettings()}
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-300'} border-t shadow-2xl`}>
        <div className="max-w-2xl mx-auto flex justify-around items-center overflow-x-auto">
          <button onClick={() => setActiveSection('dashboard')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'dashboard' ? 'text-cyan-400 border-t-4 border-cyan-400' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <Home size={22} /> {t[language].dashboard}
          </button>
          <button onClick={() => setActiveSection('income')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'income' ? 'text-emerald-400 border-t-4 border-emerald-400' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <TrendingUp size={22} /> {t[language].income}
          </button>
          <button onClick={() => setActiveSection('expenses')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'expenses' ? 'text-rose-400 border-t-4 border-rose-400' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <TrendingDown size={22} /> {t[language].expenses}
          </button>
          <button onClick={() => setActiveSection('banks')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'banks' ? 'text-teal-400 border-t-4 border-teal-400' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <PiggyBank size={22} /> {t[language].banks}
          </button>
          <button onClick={() => setActiveSection('wallets')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'wallets' ? 'text-amber-400 border-t-4 border-amber-400' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <Wallet size={22} /> {t[language].wallets}
          </button>
          <button onClick={() => setActiveSection('budgets')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'budgets' ? 'text-violet-400 border-t-4 border-violet-400' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <Banknote size={22} /> {t[language].budgets}
          </button>
          <button onClick={() => setActiveSection('goals')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'goals' ? 'text-fuchsia-400 border-t-4 border-fuchsia-400' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <Target size={22} /> {t[language].goals}
          </button>
          <button onClick={() => setActiveSection('memberships')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'memberships' ? 'text-pink-400 border-t-4 border-pink-400' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <Zap size={22} /> {language === 'en' ? 'Subs' : 'الاشتراكات'}
          </button>
          <button onClick={() => setActiveSection('analytics')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'analytics' ? 'text-cyan-400 border-t-4 border-cyan-400' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <BarChart3 size={22} /> {language === 'en' ? 'History' : 'السجل'}
          </button>
          <button onClick={() => setActiveSection('resources')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'resources' ? 'text-yellow-400 border-t-4 border-yellow-400' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <Lightbulb size={22} /> {t[language].resources}
          </button>
          <button onClick={() => setActiveSection('settings')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition text-xs font-medium ${activeSection === 'settings' ? 'text-slate-300 border-t-4 border-slate-300' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
            <Settings size={22} /> {t[language].settings}
          </button>
        </div>
      </div>
    </div>
  );
}