type EndingRelativeToNumeralValue = {
  relevantNumbers: number[],
  ending: string
}

const relevantEndingsToNumeralValues = ( amount: number, type: 'years' | 'rubles' | 'preposition' ) => {
  const lastDigitOfAmount = parseInt(`${amount}`[`${amount}`.length-1]);
  const endingsRelativeToAmountOfYears = [
    {
      relevantNumbers: [1, 4, 5, 9, 10],
      ending: 'ый'
    },
    {
      relevantNumbers: [2, 6, 7, 8],
      ending: 'ой'
    },
    {
      relevantNumbers: [3],
      ending: 'ий'
    },
  ];

  const endingsRelativeToAmountOfCurrency = [
    {
      relevantNumbers: [1],
      ending: 'ь'
    },
    {
      relevantNumbers: [2, 3, 4],
      ending: 'я'
    },
    {
      relevantNumbers: [5, 6, 7, 8, 9, 0],
      ending: 'ей'
    },
  ];

  const endingsRelativeToAmountOfPreposition = [
    {
      relevantNumbers: [2],
      ending: 'о'
    }
  ];

  const acquireRelevantEnding = ( endingsRelevantToNumeralValue: EndingRelativeToNumeralValue[], i: number ) => {

    return endingsRelevantToNumeralValue.find(element => element.relevantNumbers.includes(i))?.ending || '';
  };

  switch(type) {
    case 'years': return acquireRelevantEnding(endingsRelativeToAmountOfYears, lastDigitOfAmount);
    case 'rubles': return acquireRelevantEnding(endingsRelativeToAmountOfCurrency, lastDigitOfAmount);
    case 'preposition': return acquireRelevantEnding(endingsRelativeToAmountOfPreposition, lastDigitOfAmount);
    default: return null;
  }
};

export default relevantEndingsToNumeralValues;
