import type Product from '../../../models/Product'
import { deleteProduct } from '../../../services/products'
import './Product.css'

interface ProductProps {
    product: Product
    productDeleted(id: string): void
}
export default function Product(props: ProductProps) {

    const { product: {id, name, expirationDate, manufactureDate, price }, productDeleted } = props

    async function deleteMe() {
        try {
            if(confirm('are you sure?')) {
                await deleteProduct(id)
                productDeleted(id)
            }
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='Product'>
            <div>{name}</div>
            <div>{price}</div>
            <div>{(new Date(manufactureDate)).toLocaleDateString()}</div>
            <div>{(new Date(expirationDate)).toLocaleDateString()}</div>
            <button onClick={deleteMe}>delete</button>
        </div>
    )
}