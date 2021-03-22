import { useReducer } from 'react';

type UseTaxReturnReducer = () => [TaxReturnState, React.Dispatch<TaxReturnAction>, RefreshTaxReturnPayouts];

export type TaxReturnState = {
  incomePerMonth: number | undefined;
  payoutPriority: PayoutPriority;
  taxReturnPayouts: TaxReturnPayouts;
  realEstateValue: number;
};

export type PayoutPriority = {
  [key: string]: {
    name: string;
    isSelected: boolean;
  };
};

export type TaxReturnPayouts = TaxReturnPayout[];

export type TaxReturnPayout = PossibleTaxReturnPayout | ReceivedTaxReturnPayout;

export type PossibleTaxReturnPayout = {
  amount: number;
  isSelected: boolean;
  isReceived: false;
};

export type ReceivedTaxReturnPayout = {
  amount: number;
  isSelected: boolean;
  isReceived: true;
  receivedFor: string;
};

export type TaxReturnAction =
  | { type: 'setIncomePerMonth'; payload: number }
  | {
      type: 'selectPayoutPriority';
      payload: string;
    }
  | {
      type: 'selectTaxReturnPayout';
      payload: {
        index: number;
        isSelected: boolean;
      };
    }
  | { type: 'receiveSelectedTaxReturnPayout' }
  | {
      type: 'setTaxReturnPayouts';
      payload: TaxReturnPayouts;
    }
  | {
      type: 'setRealEstateValue';
      payload: number;
    };

type RefreshTaxReturnPayouts = () => void;

const taxReducer = (state: TaxReturnState, action: TaxReturnAction): TaxReturnState => {
  switch (action.type) {
    case 'setIncomePerMonth': {
      return {
        ...state,
        incomePerMonth: action.payload,
      };
    }
    case 'selectPayoutPriority': {
      if (state.payoutPriority[action.payload] !== undefined) {
        const newPayoutPriorityState = {
          ...state.payoutPriority,
        };
        Object.keys(newPayoutPriorityState).forEach((key) =>
          key === action.payload
            ? (newPayoutPriorityState[key].isSelected = true)
            : (newPayoutPriorityState[key].isSelected = false),
        );
        return {
          ...state,
          payoutPriority: newPayoutPriorityState,
        };
      } else {
        return state;
      }
    }
    case 'selectTaxReturnPayout': {
      const { index, isSelected } = action.payload;
      if (state.taxReturnPayouts[index]) {
        const newTaxReturnPayoutsState = [...state.taxReturnPayouts];
        newTaxReturnPayoutsState[index]!.isSelected = isSelected;
        return {
          ...state,
          taxReturnPayouts: newTaxReturnPayoutsState,
        };
      } else {
        return state;
      }
    }
    case 'receiveSelectedTaxReturnPayout': {
      const selectedPayoutPriority = Object.keys(state.payoutPriority).find(
        (key) => state.payoutPriority[key].isSelected === true,
      );
      const newTaxReturnPayoutsState = [...state.taxReturnPayouts].map((payout) => {
        switch (true) {
          case payout.isSelected === true && payout.isReceived === false: {
            return {
              amount: payout.amount,
              isSelected: true,
              isReceived: true,
              receivedFor: selectedPayoutPriority!,
            };
          }
          default:
            return payout;
        }
      });
      return {
        ...state,
        taxReturnPayouts: newTaxReturnPayoutsState,
      };
    }
    case 'setTaxReturnPayouts': {
      return {
        ...state,
        taxReturnPayouts: action.payload,
      };
    }
    case 'setRealEstateValue': {
      return {
        ...state,
        realEstateValue: action.payload,
      };
    }
    default:
      return state;
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
    },
  },
  taxReturnPayouts: [],
  realEstateValue: 2_000_000,
};

const countTaxReturnPayouts = (incomePerMonth: number, realEstateValue: number): number[] => {
  const taxReturnPayoutPerYear = incomePerMonth * 12 * 0.13;
  const maxReturnAmount = realEstateValue > 2_000_000 ? 260_000 : realEstateValue * 0.13;

  if (maxReturnAmount <= 0) {
    return [];
  }

  if (taxReturnPayoutPerYear >= maxReturnAmount) {
    return [maxReturnAmount];
  } else {
    return [
      ...new Array(Math.floor(maxReturnAmount / taxReturnPayoutPerYear)).fill(Math.floor(taxReturnPayoutPerYear)),
      Math.floor(maxReturnAmount % taxReturnPayoutPerYear),
    ];
  }
};

const useTaxReturnReducer: UseTaxReturnReducer = () => {
  const [taxReturnState, dispatch] = useReducer(taxReducer, initialTaxReturnState);

  const refreshTaxReturnPayouts = () => {
    if (taxReturnState.incomePerMonth === undefined) {
      return;
    }

    const paymentsIntoTaxReturnPayouts = (payment: number) => {
      return {
        amount: payment,
        isSelected: false,
        isReceived: false,
      } as const;
    };
    const paymentsArray = countTaxReturnPayouts(taxReturnState.incomePerMonth, taxReturnState.realEstateValue);
    const newTaxReturnPayouts = paymentsArray.map(paymentsIntoTaxReturnPayouts);

    dispatch({
      type: 'setTaxReturnPayouts',
      payload: newTaxReturnPayouts,
    });
  };

  return [taxReturnState, dispatch, refreshTaxReturnPayouts];
};

export default useTaxReturnReducer;
