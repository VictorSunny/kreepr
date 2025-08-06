import DropdownSelect from "../../components/DropdownSelect/DropdownSelect"
import { useApiQueryContext } from "../../contexts/ApiQueryContext"

export default function PreferredCurrencyDropdown() {

    const {preferredCurrency, currencyChoices, changePreferredCurrency} = useApiQueryContext()

    return (
        <div style={{marginBlock: '0.4rem'}}>
            <h4>change currency &#9660;</h4>
            <DropdownSelect defaultValues={preferredCurrency} optionsValues={currencyChoices} setContextValue={changePreferredCurrency} specialOptions={true} scrollToTop={true} />
        </div>
    )
}