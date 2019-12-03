let monthList = [
  { id: "", name: 'Month' },
  { id: "1", name: '1-JAN' },
  { id: "2", name: '2-FEB' },
  { id: "3", name: '3-MAR' },
  { id: "4", name: '4-APR' },
  { id: "5", name: '5-MAY' },
  { id: "6", name: '6-JUN' },
  { id: "7", name: '7-JUL' },
  { id: "8", name: '8-AUG' },
  { id: "9", name: '9-SEP' },
  { id: "10", name: '10-OCT' },
  { id: "11", name: '11-NOV' },
  { id: "12", name: '12-DEC' },
];

let yearList = [];
let thisYear = new Date().getFullYear();
for (let i = 0; i < 20; i++) {
  yearList.push(thisYear + i)
}
yearList = yearList.map((year) => {
  return { id: year.toString(), name: year.toString() }
})
yearList.unshift({ id: "", name: "Year" });
const frequencies = [
  { id: "1", name: 'week' },
  { id: "2", name: '2 weeks' },
  { id: "3", name: '3 weeks' },
  { id: "4", name: 'month' }]

const cards = [
  { id: 'visa', name: 'Visa' },
  { id: 'mastercard', name: 'Mastercard' },
  { id: 'amexpress', name: 'American Express' }
]
export { monthList, yearList, frequencies, cards };