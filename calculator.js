function MortgageCalculator() {
    const [loanData, setLoanData] = React.useState({
        amount: 500000,
        duration: 25,
        rate: 2.5,
        downPayment: 100000
    });

    const calculateMonthlyPayment = () => {
        const principal = loanData.amount - loanData.downPayment;
        const monthlyRate = loanData.rate / 100 / 12;
        const numberOfPayments = loanData.duration * 12;
        
        const monthlyPayment = 
            (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        
        return monthlyPayment.toFixed(2);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Calculateur de Prêt</h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Montant du bien (CHF)</label>
                    <input
                        type="number"
                        value={loanData.amount}
                        onChange={(e) => setLoanData({...loanData, amount: Number(e.target.value)})}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Apport personnel (CHF)</label>
                    <input
                        type="number"
                        value={loanData.downPayment}
                        onChange={(e) => setLoanData({...loanData, downPayment: Number(e.target.value)})}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Durée (années)</label>
                    <input
                        type="number"
                        value={loanData.duration}
                        onChange={(e) => setLoanData({...loanData, duration: Number(e.target.value)})}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Taux d'intérêt (%)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={loanData.rate}
                        onChange={(e) => setLoanData({...loanData, rate: Number(e.target.value)})}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                        <div className="font-semibold mb-2">Mensualité estimée :</div>
                        <div className="text-2xl font-bold text-blue-600">
                            {calculateMonthlyPayment()} CHF / mois
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<MortgageCalculator />, document.getElementById('root'));
