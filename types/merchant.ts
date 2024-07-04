export type Merchant = {
    id: string
    name: string
    slug: string
    desc: string
    category: string
    business_model: string
    img_url: string
    images: MerchantImage[]
  }

export type MerchantImage = {
    id: string
    img_url: string
    merchant_id: string
}