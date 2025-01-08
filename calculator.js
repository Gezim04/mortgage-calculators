function BuyingCapacityCalculator() {
    const [data, setData] = React.useState({
        propertyPrice: 1000000,
        annualIncome: 150000,
        downPayment: 200000,
    });

    const [results, setResults] = React.useState({
        isValid: false,
        message: ''
    });

    const calculateCapacity = () => {
        // Vérification des fonds propres (20% minimum)
        const downPaymentPercentage = (data.downPayment / data.propertyPrice) * 100;
        
        if (downPaymentPercentage < 20) {
            setResults({
                isValid: false,
                message: 'Les fonds propres doivent représenter au moins 20% du prix d\'achat'
            });
            return;
        }

        // Calcul selon la formule
        const mortgageAmount = data.propertyPrice - data.downPayment; // Montant hypothécaire
        const annualInterest = mortgageAmount * 0.05; // Intérêts annuels (5%)
        const twoThirdsValue = (data.propertyPrice * 2) / 3; // 2/3 de la valeur du bien
        const annualAmortization = (mortgageAmount - twoThirdsValue) / 15; // Amortissement annuel
        const maintenanceCosts = data.propertyPrice * 0.01; // Frais d'entretien (1%)

        // Coût annuel total
        const totalAnnualCost = annualInterest + annualAmortization + maintenanceCosts;

        // Ratio d'endettement
        const debtRatio = (totalAnnualCost / data.annualIncome) * 100;

        setResults({
            isValid: debtRatio <= 33,
            message: debtRatio > 33 ? 'Le ratio d\'endettement dépasse 33% de vos revenus' : ''
        });
    };

    React.useEffect(() => {
        calculateCapacity();
    }, [data]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Calculateur de Capacité d'Achat</h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Prix du bien (CHF)</label>
                    <input
                        type="number"
                        value={data.propertyPrice}
                        onChange={(e) => setData({...data, propertyPrice: Number(e.target.value)})}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Revenu annuel du ménage (CHF)</label>
                    <input
                        type="number"
                        value={data.annualIncome}
                        onChange={(e) => setData({...data, annualIncome: Number(e.target.value)})}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Fonds propres (CHF)</label>
                    <input
                        type="number"
                        value={data.downPayment}
                        onChange={(e) => setData({...data, downPayment: Number(e.target.value)})}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Minimum requis: {(data.propertyPrice * 0.2).toLocaleString()} CHF (20%)
                    </p>
                </div>

                <div className={`mt-6 p-4 rounded-lg ${results.isValid ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="text-center">
                        <div className="text-lg font-medium">
                            {results.isValid ? "✅ Vous avez la capacité d'acquérir ce bien" : "❌ Vous n'avez pas la capacité d'acquérir ce bien"}
                        </div>
                        {!results.isValid && 
                            <div className="text-sm text-gray-600 mt-2">
                                Raison : {results.message}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<BuyingCapacityCalculator />, document.getElementById('root'));
