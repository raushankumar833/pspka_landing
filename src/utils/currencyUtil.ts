export const currencySetter = (paisa: number): string => {
  const theNewCurrency: string = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(paisa);
  const currencySymbol: string = theNewCurrency.substring(0, 1);
  // let theAmount: string = theNewCurrency.substring(1);
  const rupees = paisa / 100;

  const formattedRupees: string = rupees.toFixed(2);

  return `${currencySymbol}${formattedRupees}`;
};

export const numberSetter = (number: number): string => {
  const theNewCurrency: string = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(number);
  const theAmount: string = theNewCurrency.substring(1);
  return `${theAmount}`;
};

export function convertINRToWords(number: number) {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = [
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  function convertNumberToWords(n: any) {
    const num: number = parseInt(n, 10);
    let words = '';

    if (num < 10) {
      words += units[num];
    } else if (num < 20) {
      words += teens[num - 10];
    } else if (num < 100) {
      words += tens[Math.floor(num / 10)];
      if (num % 10) {
        words += ' ' + units[num % 10];
      }
    } else if (num < 1000) {
      words += units[Math.floor(num / 100)] + ' Hundred';
      if (num % 100) {
        words += ' ' + convertNumberToWords(num % 100);
      }
    } else if (num < 100000) {
      words += convertNumberToWords(Math.floor(num / 1000)) + ' Thousand';
      if (num % 1000) {
        words += ' ' + convertNumberToWords(num % 1000);
      }
    } else if (num < 10000000) {
      words += convertNumberToWords(Math.floor(num / 100000)) + ' Lakh';
      if (num % 100000) {
        words += ' ' + convertNumberToWords(num % 100000);
      }
    } else {
      words += convertNumberToWords(Math.floor(num / 10000000)) + ' Crore';
      if (num % 10000000) {
        words += ' ' + convertNumberToWords(num % 10000000);
      }
    }

    return words.trim();
  }

  let words = convertNumberToWords(number);
  words = words.charAt(0).toUpperCase() + words.slice(1); // Capitalize the first letter
  return words + ' Rupees';
}

// export const convertPaisaToRupees = (paisa: number): string => {
//   // Convert paisa to rupees

//   const rupees = paisa / 100;

//   // Format rupees to two decimal places
//   const formattedRupees: string = rupees.toFixed(2);

//   return formattedRupees;
// };
