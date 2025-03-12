export const banks = [
  { code: '01', name: 'Arab Tunisian Bank', bic: 'ATB' },
  { code: '02', name: 'Banque Franco-Tunisienne', bic: 'BFT' },
  { code: '03', name: 'Banque Nationale Agricole', bic: 'BNA' },
  { code: '04', name: 'Attijari Bank', bic: 'BS' },
  { code: '05', name: 'Banque De Tunisie', bic: 'BT' },
  { code: '07', name: 'Amen Bank', bic: 'AB' },
  { code: '08', name: 'Banque Internationale Arabe De Tunisie', bic: 'BIAT' },
  { code: '09', name: 'Banque Developpement Econom De', bic: 'BDET' },
  { code: '10', name: 'Societe Tunisienne De Banque', bic: 'STB' },
  { code: '11', name: "Union Bancaire P/Le Commerce Et L'Indust", bic: 'UBCI' },
  { code: '12', name: 'Union Internationale De Banques', bic: 'UIB' },
  { code: '14', name: "Banque De L'Habitat", bic: 'BH' },
  { code: '16', name: 'Citibank', bic: 'CITIBANK' },
  { code: '17', name: 'Centre Des Cheques Postaux', bic: 'CCP' },
  { code: '18', name: 'Banque Nationale De Developpement Touris', bic: 'BNDT' },
  { code: '20', name: 'Banque Tuniso-Koweitienne De Devel', bic: 'BTK' },
  { code: '21', name: "Societe Tunisio-Saoudienne D'Investissem", bic: 'STUSID' },
  { code: '23', name: 'Qatar National Bank', bic: 'QNB' },
  { code: '24', name: "Banque Tunisie Emirats D'Investis- Semen", bic: 'BTE' },
  { code: '25', name: 'Banque Zitouna', bic: 'BZ' },
  { code: '26', name: 'Banque Arabe Tuniso-Libyenne De Devel', bic: 'BTL' },
  { code: '27', name: 'Banque Tunisienne De Solidarite', bic: 'BTS' },
  { code: '28', name: 'Arab Banking Corporation', bic: 'ABC' },
  { code: '31', name: 'Bcma Tunis', bic: 'BCMA' },
  { code: '32', name: 'El Baraka Bank', bic: 'BEST' },
  { code: '33', name: 'North African International Bank', bic: 'NAIB' },
  { code: '35', name: 'Alubaf Tunis', bic: 'ALUBAF' },
  { code: '47', name: 'Wifak International Bank', bic: 'WIB' },
  { code: '66', name: 'Caisse Mutuelle De Credit Agricole De Tu', bic: 'CMCAT' },
  { code: '72', name: 'Union Tunisienne De Banques', bic: 'UTB' },
  { code: '73', name: 'Tunis International Bank', bic: 'TIB' },
  { code: '74', name: "Loan And Investment Co 'Linc'", bic: 'LINC' },
  { code: '75', name: 'Citibank (Ancien Code)', bic: 'CITIBANK' },
  { code: '76', name: 'Banque Tunisienne De Solidarite', bic: 'BTS' },
  { code: '77', name: 'Abc', bic: 'ABC' },
  { code: '78', name: 'Arab Bank Coorporation', bic: 'ABC' },
]

export const TnRib = (value: string | undefined) => {
  // function getExistElementByCurrentCode() {
  //   if (!value) return false
  //   return banks.find(({ code }) => code == value.substring(0, 2))
  // }

  function isValid() {
    if (!value) return false
    const regex = new RegExp('^[0-9]{20}$')
    return regex.test(value)
    // getExistElementByCurrentCode() &&
    // +value.slice(-2) === 97 - Number(BigInt(value.substring(0, 18) + '00') % 97n)
  }

  return isValid()
}
