module.exports = {
  docsSidebar: [
    'docs/home',
    {
      type: 'category',
      label: 'Get started',
      items: ['docs/get-started/doc1', 'docs/get-started/doc2'],
    },
    {
      type: 'category',
      label: 'SEPA transaction',
      items: ['docs/sepa-transactions/doc1', 'docs/sepa-transactions/doc2'],
    },
    {
      type: 'category',
      label: 'Credit card',
      items: ['docs/credit-card/doc1'],
    },
    {
      type: 'category',
      label: 'Payment',
      items: ['docs/payment/doc1'],
    },
    {
      type: 'category',
      label: 'KYC',
      items: ['docs/kyc/doc1'],
    },
  ],
  apisSidebar: [
    'api/api1',
    'api/api3',
    {
      type: 'category',
      label: 'Card factory',
      items: ['api/api2'],
    },
  ],
}
