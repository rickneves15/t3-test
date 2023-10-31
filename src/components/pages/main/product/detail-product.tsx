import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '~/components/ui/card'
import { Product } from '~/schemas/product'

export function DetailProduct({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="group-hover:text-secondary">
          {product.name}
        </CardTitle>
        <CardDescription>{product.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-x-4 text-sm text-muted-foreground">
          <div className="flex">{product.description}</div>
          <div className="flex justify-end">{product.price}</div>
        </div>
      </CardContent>
    </Card>
  )
}
