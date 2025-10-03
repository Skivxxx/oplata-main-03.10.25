import React, { useState, useMemo } from 'react';
import { 
  Home, 
  CreditCard, 
  History, 
  Settings, 
  Phone, 
  Zap, 
  Search,
  Filter,
  Calendar,
  ChevronDown,
  Download,
  Bell,
  LogOut,
  User,
  ShoppingCart,
  Wifi,
  Gamepad2,
  Plus,
  ArrowUpDown
} from 'lucide-react';

interface Transaction {
  id: string;
  service: string;
  provider: string;
  amount: number;
  currency: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
  type: 'energy' | 'mobile' | 'internet' | 'other';
  accountNumber: string;
}

interface CartItem {
  id: string;
  provider: string;
  service: string;
  accountNumber: string;
  amount: number;
  commission: number;
  currency: string;
  logo: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', service: 'Premier Energy', provider: 'Premier Energy', amount: 10.00, currency: 'MDL', date: '2023-09-15', status: 'success', type: 'energy', accountNumber: '203377' },
  { id: '2', service: 'Premier Energy', provider: 'Premier Energy', amount: 10.00, currency: 'MDL', date: '2023-09-14', status: 'success', type: 'energy', accountNumber: '203377' },
  { id: '3', service: 'Premier Energy', provider: 'Premier Energy', amount: 10.00, currency: 'MDL', date: '2023-09-13', status: 'success', type: 'energy', accountNumber: '203377' },
  { id: '4', service: 'Moldcell', provider: 'Moldcell', amount: 22.00, currency: 'MDL', date: '2023-09-12', status: 'success', type: 'mobile', accountNumber: '69052401' },
  { id: '5', service: 'Moldcell', provider: 'Moldcell', amount: 22.00, currency: 'MDL', date: '2023-09-11', status: 'success', type: 'mobile', accountNumber: '69052401' },
  { id: '6', service: 'Moldcell', provider: 'Moldcell', amount: 22.00, currency: 'MDL', date: '2023-09-10', status: 'success', type: 'mobile', accountNumber: '69052401' },
  { id: '7', service: 'Moldcell', provider: 'Moldcell', amount: 12.00, currency: 'MDL', date: '2023-09-09', status: 'success', type: 'mobile', accountNumber: '69052401' },
  { id: '8', service: 'Moldcell', provider: 'Moldcell', amount: 12.00, currency: 'MDL', date: '2023-09-08', status: 'success', type: 'mobile', accountNumber: '69052401' },
];

const mockCartItems: CartItem[] = [
  { id: '1', provider: 'Moldcell', service: 'Moldcell', accountNumber: '79105829', amount: 100.00, commission: 2.50, currency: 'MDL', logo: 'moldcell' },
  { id: '2', provider: 'Sun Communications', service: 'Sun Communications', accountNumber: '99999999', amount: 50.00, commission: 0, currency: 'MDL', logo: 'sun' },
  { id: '3', provider: 'Orange', service: 'Orange', accountNumber: '60031339', amount: 100.00, commission: 3.00, currency: 'MDL', logo: 'orange' },
  { id: '4', provider: 'StarNet', service: 'StarNet', accountNumber: '163535', amount: 450.00, commission: 6.75, currency: 'MDL', logo: 'starnet' },
  { id: '5', provider: 'Moldtelecom', service: 'Moldtelecom Telefonie Mobila/Internet Mobil', accountNumber: '37367311274', amount: 450.00, commission: 0, currency: 'MDL', logo: 'moldtelecom' },
];

function App() {
  const [activeTab, setActiveTab] = useState('history');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState('2023-08-01');
  const [dateTo, setDateTo] = useState('2023-09-30');
  const [billingForm, setBillingForm] = useState({
    fullName: '',
    country: '',
    city: '',
    address: '',
    zip: ''
  });

  const [profileForm, setProfileForm] = useState({
    fullName: 'Alexandra Poloasin',
    email: 'alex@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const isFormValid = billingForm.fullName && billingForm.country && billingForm.city && billingForm.address && billingForm.zip;
  const isProfileFormValid = profileForm.fullName && profileForm.email;

  const handleFormChange = (field: string, value: string) => {
    setBillingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileFormChange = (field: string, value: string) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const savedCards = [
    {
      id: '1',
      type: 'mastercard',
      number: '5596 00****** 0832',
      expiry: '03/28',
      isDefault: true
    },
    {
      id: '2', 
      type: 'mastercard',
      number: '5596 00****** 0832',
      expiry: '03/28',
      isDefault: false
    }
  ];

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      const matchesSearch = transaction.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           transaction.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || transaction.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProviderLogo = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'premier energy':
        return <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg border border-blue-300/50 transform hover:scale-110 transition-transform">
          <Zap className="w-6 h-6 text-white drop-shadow-lg" />
        </div>;
      case 'moldcell':
        return <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg border border-purple-300/50 transform hover:scale-110 transition-transform">
          <Phone className="w-6 h-6 text-white drop-shadow-lg" />
        </div>;
      default:
        return <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg border border-gray-300/50 transform hover:scale-110 transition-transform">
          <CreditCard className="w-6 h-6 text-white drop-shadow-lg" />
        </div>;
    }
  };

  const getCartItemLogo = (logo: string) => {
    switch (logo) {
      case 'moldcell':
        return <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg border border-purple-300/50">
          <span className="text-white font-bold text-xs">moldcell</span>
        </div>;
      case 'sun':
        return <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg border border-red-300/50">
          <span className="text-white font-bold text-xs">SUN</span>
        </div>;
      case 'orange':
        return <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg border border-orange-300/50">
          <span className="text-white font-bold text-xs">orange</span>
        </div>;
      case 'starnet':
        return <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg border border-yellow-300/50">
          <span className="text-white font-bold text-xs">StarNet</span>
        </div>;
      case 'moldtelecom':
        return <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg border border-blue-300/50">
          <span className="text-white font-bold text-xs">MT</span>
        </div>;
      default:
        return <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg border border-gray-300/50">
          <CreditCard className="w-6 h-6 text-white drop-shadow-lg" />
        </div>;
    }
  };

  const totalCartAmount = mockCartItems.reduce((sum, item) => sum + item.amount, 0);
  const totalCommission = mockCartItems.reduce((sum, item) => sum + item.commission, 0);
  const grandTotal = totalCartAmount + totalCommission;

  const sidebarItems = [
    { id: 'home', label: 'Начальная страница', icon: Home },
    { id: 'history', label: 'История', icon: History },
    { id: 'cards', label: 'Контроль карт', icon: CreditCard },
    { id: 'cart', label: 'Корзина', icon: ShoppingCart },
    { id: 'profile', label: 'Contul meu', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  OPLATA.MD
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Căutare rapidă a serviciilor..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 text-sm"
                />
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm font-medium text-gray-700">Alexandra Poloasin</span>
                </div>
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              {/* User Profile */}
              <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl border border-white/30">
                    <User className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Alexandra Poloasin</h3>
                    <p className="text-blue-100 text-sm">alex@example.com</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-2 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-md border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </button>
                ))}
                
                {/* Logout Button */}
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-2 text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-sm">
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span>Ieșire</span>
                </button>
              </nav>

              {/* Quick Actions */}
              <div className="p-4 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Быстрые действия</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200">
                    <Plus className="w-4 h-4" />
                    <span>Новый платеж</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200">
                    <ArrowUpDown className="w-4 h-4" />
                    <span>Перевод</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'history' && (
              <>
                {/* Page Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Istoricul plăților
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Din acest meniu poți vedea istoricul tranzacțiilor, descărca factura sau repeta plata.
                  </p>
                </div>

                {/* Filters Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 mb-8">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Date Range */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white/80"
                          />
                        </div>
                        <span className="text-gray-400">—</span>
                        <div className="flex items-center space-x-2">
                          <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white/80"
                          />
                        </div>
                      </div>

                      {/* Search */}
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Поиск по услугам и провайдерам..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                        />
                      </div>

                      {/* Filter Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setIsFilterOpen(!isFilterOpen)}
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 bg-white/80"
                        >
                          <Filter className="w-4 h-4" />
                          <span className="text-sm">Фильтр</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isFilterOpen && (
                          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-20 overflow-hidden">
                            <div className="p-2">
                              {[
                                { value: 'all', label: 'Все платежи', icon: CreditCard },
                                { value: 'energy', label: 'Энергия', icon: Zap },
                                { value: 'mobile', label: 'Мобильная связь', icon: Phone },
                                { value: 'internet', label: 'Интернет', icon: Wifi },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => {
                                    setFilterType(option.value);
                                    setIsFilterOpen(false);
                                  }}
                                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                                    filterType === option.value 
                                      ? 'bg-blue-50 text-blue-700' 
                                      : 'hover:bg-gray-50 text-gray-700'
                                  }`}
                                >
                                  <option.icon className="w-4 h-4" />
                                  <span>{option.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Filter Summary */}
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <span>
                        Период: {new Date(dateFrom).toLocaleDateString('ru-RU')} - {new Date(dateTo).toLocaleDateString('ru-RU')}
                      </span>
                      <span>{filteredTransactions.length} транзакций</span>
                    </div>
                  </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">История транзакций</h2>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Экспорт</span>
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {filteredTransactions.map((transaction, index) => (
                      <div 
                        key={transaction.id}
                        className="p-6 hover:bg-blue-50/50 transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-blue-500"
                        style={{ 
                          animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="transform group-hover:scale-110 transition-transform duration-200">
                              {getProviderLogo(transaction.provider)}
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                {transaction.service}
                              </h3>
                              <p className="text-sm text-gray-600">{transaction.accountNumber}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <p className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                                {transaction.amount.toFixed(2)} {transaction.currency}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(transaction.date).toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                            
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(transaction.status)}`}>
                              Succes
                            </span>

                            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:rotate-180 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700">
                        Total: <span className="font-semibold">{filteredTransactions.length}</span>
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Rânduri pe pagină:</span>
                        <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>10</option>
                          <option>25</option>
                          <option>50</option>
                        </select>
                      </div>
                      <nav className="flex items-center space-x-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200">
                          ‹
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium shadow-md">
                          1
                        </button>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200">
                          2
                        </button>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200">
                          ›
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'cards' && (
              <>
                {/* Cards Page Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    CARDURILE MELE
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Gestionează-ți cardurile și alege cardul folosit implicit.
                  </p>
                </div>

                {/* Cards Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Carduri bancare (2)</h2>
                  </div>

                  <div className="p-6 space-y-4">
                    {savedCards.map((card) => (
                      <div key={card.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-blue-50/50 transition-all duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                      <input
                              type="radio"
                              name="defaultCard"
                              checked={card.isDefault}
                              onChange={() => {}}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                          </div>
                          
                          {/* Mastercard Logo */}
                          <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                            <div className="flex space-x-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
                              <div className="w-3 h-3 bg-orange-400 rounded-full opacity-80 -ml-1"></div>
                            </div>
                          </div>
                          
                          <div>
                            <p className="font-semibold text-gray-900">Mastercard {card.number}</p>
                            <p className="text-sm text-gray-600">Expira {card.expiry}</p>
                          </div>
                        </div>
                        
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                          <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">Șterge</span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'cart' && (
              <>
                {/* Cart Page Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Coșul meu
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Plătește mai multe facturi cu o singură plată. Primești o confirmare separată pentru fiecare factură în raport. În extrasul băncii va apărea o singură tranzacție comună.
                  </p>
                </div>

                {/* Cart Items */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Facturi ({mockCartItems.length})</h2>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {mockCartItems.map((item, index) => (
                      <div 
                        key={item.id}
                        className="p-6 hover:bg-blue-50/50 transition-all duration-300 group cursor-pointer"
                        style={{ 
                          animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="transform group-hover:scale-110 transition-transform duration-200">
                              {getCartItemLogo(item.logo)}
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                {item.service}
                              </h3>
                              <p className="text-sm text-gray-600">{item.accountNumber}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <p className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                                {item.amount.toFixed(2)} {item.currency}
                              </p>
                              {item.commission > 0 && (
                                <p className="text-sm text-gray-500">
                                  Comision: {item.commission.toFixed(2)} {item.currency}
                                </p>
                              )}
                            </div>
                            
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50">
                              <div className="w-8 h-8 bg-gray-200 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors">
                                <span className="text-xs font-bold">Șterge</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add More Button */}
                  <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">Adaugă +</span>
                    </button>
                  </div>

                  {/* Billing Form and Cart Summary */}
                  <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Billing Form */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-4">
                          Pentru prima plată cu coșul este necesar să completați datele
                        </h3>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Numele complet (obligatoriu)"
                            value={billingForm.fullName}
                            onChange={(e) => handleFormChange('fullName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Țara (obligatoriu)"
                            value={billingForm.country}
                            onChange={(e) => handleFormChange('country', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Orașul (obligatoriu)"
                            value={billingForm.city}
                            onChange={(e) => handleFormChange('city', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Adresa (obligatoriu)"
                            value={billingForm.address}
                            onChange={(e) => handleFormChange('address', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Zip"
                            value={billingForm.zip}
                            onChange={(e) => handleFormChange('zip', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 text-sm"
                          />
                        </div>
                      </div>
                      
                      {/* Cart Summary */}
                      <div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Factură totală:</span>
                            <span className="font-semibold">{totalCartAmount.toFixed(2)} MDL</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Comision:</span>
                            <span className="font-semibold">{totalCommission.toFixed(2)} MDL</span>
                          </div>
                          <div className="border-t border-gray-200 pt-3">
                            <div className="flex justify-between text-lg font-bold">
                              <span>Total:</span>
                              <span className="text-blue-700">{grandTotal.toFixed(2)} MDL</span>
                            </div>
                          </div>
                          <button 
                            disabled={!isFormValid}
                            className={`w-full mt-4 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                              isFormValid 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl cursor-pointer' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            Plătește tot
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'profile' && (
              <>
                {/* Profile Page Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Contul meu
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Aici poți schimba numele, parola și fotografia de profil.
                  </p>
                </div>

                {/* Profile Settings */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Setări profil</h2>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Profile Photo Section */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fotografia de profil</h3>
                          <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl border border-gray-200">
                              <User className="w-12 h-12 text-gray-400" />
                            </div>
                            <div className="space-y-2">
                              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium">
                                Încarcă fotografie
                              </button>
                              <button className="block px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                                Șterge fotografia
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Personal Information */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informații personale</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Numele complet</label>
                              <input
                                type="text"
                                value={profileForm.fullName}
                                onChange={(e) => handleProfileFormChange('fullName', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 text-sm"
                                placeholder="Introduceți numele complet"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                              <input
                                type="email"
                                value={profileForm.email}
                                onChange={(e) => handleProfileFormChange('email', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 text-sm"
                                placeholder="Introduceți adresa de email"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Password Change Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schimbă parola</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Parola curentă</label>
                            <input
                              type="password"
                              value={profileForm.currentPassword}
                              onChange={(e) => handleProfileFormChange('currentPassword', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 text-sm"
                              placeholder="Introduceți parola curentă"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Parola nouă</label>
                            <input
                              type="password"
                              value={profileForm.newPassword}
                              onChange={(e) => handleProfileFormChange('newPassword', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 text-sm"
                              placeholder="Introduceți parola nouă"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmă parola nouă</label>
                            <input
                              type="password"
                              value={profileForm.confirmPassword}
                              onChange={(e) => handleProfileFormChange('confirmPassword', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 text-sm"
                              placeholder="Confirmați parola nouă"
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 space-y-3">
                          <button 
                            disabled={!isProfileFormValid}
                            className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                              isProfileFormValid 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl cursor-pointer' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            Salvează modificările
                          </button>
                          <button className="w-full px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
                            Anulează
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Securitate</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
                        <div>
                          <h3 className="font-semibold text-gray-900">Autentificare în două etape</h3>
                          <p className="text-sm text-gray-600">Protejează-ți contul cu un nivel suplimentar de securitate</p>
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium">
                          Activează
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                        <div>
                          <h3 className="font-semibold text-gray-900">Sesiuni active</h3>
                          <p className="text-sm text-gray-600">Gestionează dispozitivele conectate la contul tău</p>
                        </div>
                        <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium">
                          Vezi sesiuni
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;