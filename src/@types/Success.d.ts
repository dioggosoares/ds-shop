export interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
    totalPurchased: number
  }
  products: {
    id: string
    name: string
    images: string
  }[]
}
