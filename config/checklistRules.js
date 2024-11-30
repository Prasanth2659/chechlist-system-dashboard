const checklistRules = [
    {
      id: 1,
      description: "Valuation Fee Paid",
      evaluate: (data) => data.isValuationFeePaid === true,
    },
    {
      id: 2,
      description: "UK Resident",
      evaluate: (data) => data.isUkResident === true,
    },
    {
      id: 3,
      description: "Risk Rating Medium",
      evaluate: (data) => data.riskRating === "Medium",
    },
    {
      id: 4,
      description: "LTV Below 60%",
      evaluate: (data) => {
        const ltv = (data.loanRequired / data.purchasePrice) * 100;
        return ltv < 60;
      },
    },
  ];
  
  module.exports = checklistRules;
  