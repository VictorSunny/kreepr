import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import PercentChange from "../../components/PercentChange/PercentChange"
import toOneDecimal from "../../utilities/toOneDecimal"
import numberGrouper from "../../utilities/numberGrouper"
import amountGrouper from "../../utilities/amountGrouper"
import './RegularCoinsTable.css'

import { useApiQueryContext } from "../../contexts/ApiQueryContext"

// const allCoinsData = lazy(() => import('../../api/allCoinsData'))


export default function RegularCoinTable({coinPages}) {

    ////    DISPLAYS ALL COINS IN SCROLLABLE TABLE FORMAT

    const {preferredCurrency} = useApiQueryContext()

    // class for formatting raw numbers into readable currency values
    const formatAmount = amountGrouper(preferredCurrency.value)


    const navigator = useNavigate()
    // direct user to coin page on click of coin row
    const handleCoinClick = (e) => {
        const coinSlug = e.currentTarget.dataset.slug
        navigator(`/coin/${coinSlug}`)
    }

    return (
        <table id="all-coins-table">
            <thead>
                <tr>
                    <th scope="col" id="coin-header">Coin</th>
                    <th scope="col">Price</th>
                    <th scope="col">Market Cap</th>
                    <th scope="col">Volume</th>
                    <th scope="col">1h</th>
                    <th scope="col">24h</th>
                    <th scope="col">7d</th>
                    <th scope="col">30d</th>
                    <th scope="col">Circulating Supply</th>
                    <th scope="col">Total Supply</th>
                </tr>
            </thead>
            <tbody>
                {
                    coinPages.pages?.map((page) => {
                        return(
                            page.map((coin, index) => {
                                return (
                                    <motion.tr
                                    initial={{
                                        x: 80,
                                        opacity: 0
                                    }}
                                    animate={{
                                        x: 0,
                                        opacity: 1
                                    }}
                                    transition={{
                                        delay: index * 0.06,
                                    }}
                                    key={coin.symbol+index}
                                    data-slug={coin.id}
                                    onClick={handleCoinClick}>
                                            <th scope="row">
                                                <CoinMeta coin={coin}/>
                                            </th>
                                            <td>{formatAmount.format(coin.current_price)}</td>
                                            <td>{formatAmount.format(coin.market_cap)}</td>
                                            <td>{formatAmount.format(coin.total_volume)}</td>
                                            <td>
                                                <PercentChange percentage={toOneDecimal(coin.price_change_percentage_1h_in_currency) } />
                                            </td>
                                            <td>
                                                <PercentChange percentage={toOneDecimal(coin.price_change_percentage_24h_in_currency) } />
                                            </td>
                                            <td>
                                                <PercentChange percentage={toOneDecimal(coin.price_change_percentage_7d_in_currency) } />
                                            </td>
                                            <td>
                                                <PercentChange percentage={toOneDecimal(coin.price_change_percentage_30d_in_currency) } />
                                            </td>
                                            <td>{numberGrouper.format(coin.circulating_supply)}</td>
                                            <td>{numberGrouper.format(coin.total_supply)}</td>
                                    </motion.tr>
                                )
                            })
                        )
                    })
                }
            </tbody>
        </table>
    )
}

function CoinMeta({coin}) {
    
    const coinMarketCapRank = coin.market_cap_rank
    const CoinTickerSymbol = coin.symbol
    const coinName = coin.name
    const coinSmallThumbnail = coin.image

    return(

        <div className="coin-meta">
            <div className="coin-logo-container">
                <img src={coinSmallThumbnail} className="coin-logo" loading="lazy" alt="coin logo"></img>
                {/* <img src="/css-icon.svg" className="coin-logo"></img> */}
            </div>
            <div className="coin-details">
                <div className="coin-rank">
                    #{coinMarketCapRank}
                </div>
                <div className="coin-ticker-id">
                    {String(CoinTickerSymbol).toUpperCase()}
                </div>
                <div className="coin-name">
                    dnjdjdnjnd{coinName}
                </div>
            </div>
        </div>

    )
}