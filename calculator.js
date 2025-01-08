function BuyingCapacityCalculator() {
    const [data, setData] = React.useState({
        propertyPrice: 1000000,
        annualIncome: 150000,
        downPayment: 200000,
    });

    const [results, setResults] = React.useState({
        isValid: false,
        message: '',
        monthlyPayment: 0
    });

    const calculateCapacity = () => {
        // Calculer le pourcentage de fonds propres
        const downPaymentPercentage = (data.downPayment / data.propertyPrice) * 100;
        
        // Montant du prêt
        const loanAmount = data.propertyPrice - data.downPayment;
        
        // Calcul du paiement mensuel théorique (taux à 5%)
        const monthlyPayment = (loanAmount * 0.05) / 12;
        
        // Calcul de la charge mensuelle par rapport au revenu
        const monthlyIncome = data.annualIncome / 12;
        const paymentRatio = (monthlyPayment / monthlyIncome) * 100;

        let isValid = true;
        let message = '';

        if (downPaymentPercentage < 20) {
            isValid = false;
            message = 'Les fonds propres doivent représenter au moins 20% du prix d\'achat';
        } else if (paymentRatio > 33) {
            isValid = false;
            message = 'La charge mensuelle est trop élevée par rapport à vos revenus';
        } else {
            message = 'Votre capacité financière est suffisante';
        }

        setResults({
            isValid,
            message,
            monthlyPayment
        });
    };

    React.useEffect(() => {
        calculateCapacity();
    }, [data]);

// ... (le reste du code reste identique jusqu'au return)

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
