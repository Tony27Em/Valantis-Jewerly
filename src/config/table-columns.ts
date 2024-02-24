export const TABLE_COLUMNS = [
  {
    title: '№',
    dataIndex: 'index',
    key: 'index',
    render: (_text: any, _record: any, index: number) => index + 1,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    render: (brand: string) => brand || '-',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => `${price} ₽`,
  },
]