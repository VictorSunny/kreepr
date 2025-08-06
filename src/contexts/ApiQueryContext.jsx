import { createContext, useContext, useState } from "react";

export const ApiQueryContext = createContext()

export const useApiQueryContext = () => useContext(ApiQueryContext)

export default function ApiQueryProvider({ children }) {

    ////    CONTEXT PROVIDER FOR API QUERIES

    // default values for api queries
    const defaultCoinSortOrder = { value: 'market_cap_desc', text: 'market cap - asc' }
    const defaulHistoryTimeframe = { value: '7', text: 'past week' }
    const defaultCurrency = { value: 'usd', text: 'USD', name: 'united states dollar', symbol: '&#36' }

    // coin list sort options supported by backend api
    const coinSortChoices = [
        { value: 'id_asc', text: 'name - asc' },
        { value: 'id_desc', text: 'name - desc' },
        { value: 'market_cap_asc', text: 'market cap - asc' },
        { value: 'market_cap_desc', text: 'market cap - desc' },
        { value: 'volume_asc', text: 'volume - asc' },
        { value: 'volume_desc', text: 'volume - desc' },
    ]

    // currencies supported by backend api
    const currencyChoices = [
        { value: 'usd', text: 'USD', name: 'united states dollar' },
        { value: 'eur', text: 'EUR', name: 'euro' },
        { value: 'cny', text: 'CNY', name: 'chinese yuan' },
        { value: 'gbp', text: 'GBP', name: 'british pound' },
        { value: 'jpy', text: 'JPY', name: 'japanese yen' },
        { value: 'aed', text: 'AED', name: 'united arab emirates dirham' },
        { value: 'aud', text: 'AUD', name: 'australian dollar' },
        { value: 'cad', text: 'CAD', name: 'canadian dollar' },
        { value: 'chf', text: 'CHF', name: 'swiss franc' },
        { value: 'inr', text: 'INR', name: 'indian rupee' },
        { value: 'krw', text: 'KRW', name: 'south korean won' },
        { value: 'brl', text: 'BRL', name: 'brazilian real' },
        { value: 'rub', text: 'RUB', name: 'russian ruble' },
        { value: 'mxn', text: 'MXN', name: 'mexican peso' },
        { value: 'sgd', text: 'SGD', name: 'singapore dollar' },
        { value: 'hkd', text: 'HKD', name: 'hong kong dollar' },
    ]

    // timeframes supported by backend api
    const timeframeChoices = [
        { value: '1', text: '1 day' },
        { value: '7', text: '1 week' },
        { value: '14', text: '2 weeks' },
        { value: '30', text: '1 month' },
        { value: '90', text: '3 months' },
        { value: '180', text: '6 months' },
        { value: '360', text: '1 year' },
    ]

    // set default api query parameters with default values
    const [coinSortOrder, setCoinSortOrder] = useState(defaultCoinSortOrder)
    const [preferredCurrency, setPrefferedCurrency] = useState(defaultCurrency)
    const [historyTimeframe, setHistoryTimreframe] = useState(defaulHistoryTimeframe)

    // functions for changing api query parameter values
    const changePreferredCurrency = (currencySymbolObj) => {
        return setPrefferedCurrency(currencySymbolObj)
    }
    const changeCoinSortOrder = (sortOrderObj) => {
        return setCoinSortOrder(sortOrderObj)
    }
    const changeHistoryTimeframe = (timeframeObj) => {
        return setHistoryTimreframe(timeframeObj)
    }

    // package all states and state-change functions
    const values = {
        coinSortOrder,
        coinSortChoices,
        preferredCurrency,
        currencyChoices,
        historyTimeframe,
        timeframeChoices,
        changeCoinSortOrder,
        changePreferredCurrency,
        changeHistoryTimeframe,
    }

    //    useEffect(() => {
    //     console.log(`current sort value is: ${coinSortOrder.text}`);
    //     console.log(`preferred currency is: ${preferredCurrency}`);
    //     console.log(`Coin historic data is spanning from: ${historyTimeframe.text}`);
    //    }, [coinSortOrder, preferredCurrency, historyTimeframe])

    return (
        <ApiQueryContext.Provider value={values}>
            {children}
        </ApiQueryContext.Provider>
    )
}