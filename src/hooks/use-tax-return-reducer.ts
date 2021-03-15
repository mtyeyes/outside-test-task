import { useReducer } from 'react';

export type TaxReturnState = {
  incomePerMonth: number | undefined,
  payoutPriority: PayoutPriority,
  taxReturnPayouts: TaxReturnPayouts,
  realEstateValue: number,
}

export type PayoutPriority = {
  [key: string]: {
    name: string,
    isSelected: boolean,
  }
}

export type TaxReturnPayouts = TaxReturnPayout[]

export type TaxReturnPayout = {
  amount: number,
  isSelected: boolean,
}

type TaxReturnAction = { type: 'setIncomePerMonth', payload: number }
  | { type: 'selectPayoutPriority', payload: string }
  | { type: 'selectTaxReturnPayout', payload: { index: number, isSelected: boolean } }
  | { type: 'setTaxReturnPayouts', payload: TaxReturnPayouts }
  | { type: 'setRealEstateValue', payload: number }


const taxReducer = (state: TaxReturnState, action: TaxReturnAction): TaxReturnState => {
  switch (action.type) {
    case 'setIncomePerMonth':{
      return {...state, incomePerMonth: action.payload};
    }
    case 'selectPayoutPriority': {
      if(state.payoutPriority[action.payload] !== undefined) {
        const newPayoutPriorityState = {...state.payoutPriority};
        Object.keys(newPayoutPriorityState).forEach(key => key === action.payload ? newPayoutPriorityState[key].isSelected = true : newPayoutPriorityState[key].isSelected = false);
        return {...state, payoutPriority: newPayoutPriorityState};
      } else {
        return state;
      }
    }
    case 'selectTaxReturnPayout': {
      const {index, isSelected} = action.payload;
      if(state.taxReturnPayouts[index] !== undefined) {
        const newTaxReturnPayoutsState = [...state.taxReturnPayouts];
        newTaxReturnPayoutsState[index].isSelected = isSelected;
        return {...state, taxReturnPayouts: newTaxReturnPayoutsState};
      } else {
        return state;
      }
    }
    case 'setTaxReturnPayouts': {
      return {...state, taxReturnPayouts: action.payload};
    }
    case 'setRealEstateValue':{
      return {...state, realEstateValue: action.payload};
    }
    default: return state;
  }
};

const initialTaxReturnState: TaxReturnState = {
  incomePerMonth: undefined,
  payoutPriority: {
    amount: {
      name: 'Платеж',
      isSelected: false,
    },
    time: {
      name: 'Срок',
      isSelected: true,
    }
  },
  taxReturnPayouts: [],
  realEstateValue: 2_000_000
};

const countTaxReturnPayouts = (incomePerMonth: number, realEstateValue: number): number[] => {
  const taxReturnPayoutPerYear = (incomePerMonth * 12) * 0.13;
  const maxReturnAmount = realEstateValue > 2_000_000 ? 260_000 : realEstateValue * 0.13;

  if (taxReturnPayoutPerYear >= maxReturnAmount) {
    return [maxReturnAmount];
  } else {
    return[...new Array(Math.floor(maxReturnAmount/taxReturnPayoutPerYear)).fill(Math.floor(taxReturnPayoutPerYear)), Math.floor(maxReturnAmount % taxReturnPayoutPerYear)];
  }
};

const useTaxReturnReducer = () => {
  const [taxReturnState, dispatch] = useReducer(taxReducer, initialTaxReturnState);

  const refreshTaxReturnPayouts = () => {
    if(taxReturnState.incomePerMonth === undefined) { return }
    const paymentsArray = countTaxReturnPayouts(taxReturnState.incomePerMonth, taxReturnState.realEstateValue);

    const newTaxReturnPayouts = paymentsArray.map(payment => {
      return {
        amount: payment,
        isSelected: taxReturnState.payoutPriority.time?.isSelected,
      };
    });

    dispatch({type: 'setTaxReturnPayouts', payload: newTaxReturnPayouts});
  };

  return [taxReturnState, dispatch, refreshTaxReturnPayouts] as [TaxReturnState, React.Dispatch<TaxReturnAction>, typeof refreshTaxReturnPayouts];
};

export default useTaxReturnReducer;
