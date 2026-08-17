/**
 * Format number to Indian currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Calculate EMI
 * P = principal, r = monthly interest rate (%), n = tenure in months
 */
export function calculateEMI(principal, annualRate, tenureMonths) {
  const r = annualRate / 12 / 100
  if (r === 0) return principal / tenureMonths
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1)
  return Math.round(emi)
}

/**
 * Generate amortization schedule
 */
export function generateAmortization(principal, annualRate, tenureMonths) {
  const emi = calculateEMI(principal, annualRate, tenureMonths)
  const r = annualRate / 12 / 100
  const schedule = []
  let balance = principal

  for (let month = 1; month <= tenureMonths; month++) {
    const interest = Math.round(balance * r)
    let principalPaid = emi - interest

    // On the final month, adjust principal to exactly clear the remaining balance
    if (month === Math.floor(tenureMonths)) {
      principalPaid = balance
    }

    balance = Math.max(0, balance - principalPaid)

    schedule.push({
      month,
      emi: principalPaid + interest,
      principal: principalPaid,
      interest,
      balance,
    })
  }
  return schedule
}

/**
 * Generate reference number for loan enquiry
 */
export function generateRefNumber() {
  const prefix = 'JB'
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 9000000) + 1000000
  return `${prefix}${year}${random}`
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
