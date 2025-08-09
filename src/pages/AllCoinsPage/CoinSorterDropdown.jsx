import DropdownSelect from '../../components/DropdownSelect/DropdownSelect';
import { useApiQueryContext } from '../../contexts/ApiQueryContext';

export default function CoinSorterDropdown() {
  ////    SETUP DROPDOWNSELECT COMPONENT WITH NECESSARY CONTEXT VALUES FOR ALL-COINS-PAGE

  const { coinSortOrder, coinSortChoices, changeCoinSortOrder } = useApiQueryContext();

  return (
    <DropdownSelect
      defaultValues={coinSortOrder}
      optionsValues={coinSortChoices}
      setContextValue={changeCoinSortOrder}
    />
  );
}
