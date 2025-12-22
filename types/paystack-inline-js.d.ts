// types/paystack-inline-js.d.ts
declare module '@paystack/inline-js' {
  class PaystackPop {
    constructor()
    newTransaction(options: {
      key: string
      email: string
      amount: number
      ref?: string
      currency?: string
      callback?: (response: any) => void
      onClose?: () => void
    }): void
  }
  export default PaystackPop
}