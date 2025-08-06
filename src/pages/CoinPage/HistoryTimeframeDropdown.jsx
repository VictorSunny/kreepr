import DropdownSelect from "../../components/DropdownSelect/DropdownSelect"
import { useApiQueryContext } from "../../contexts/ApiQueryContext"

export default function HistoryTimeframeDropdown() {

    ////    SETUP DROPDOWNSELECT COMPONENT WITH NECESSARY CONTEXT VALUES FOR COIN PAGE

    const {historyTimeframe, timeframeChoices, changeHistoryTimeframe} = useApiQueryContext()

    return (
        <DropdownSelect defaultValues={historyTimeframe} optionsValues={timeframeChoices} setContextValue={changeHistoryTimeframe} />
    )
}