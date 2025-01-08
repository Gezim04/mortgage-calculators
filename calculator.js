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

// ... (le reste du code reste identique)
