import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Product } from '~/schemas/product'

export function ProductItem({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <Card className="group-hover:bg-primary">
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
    </Link>
  )
}
