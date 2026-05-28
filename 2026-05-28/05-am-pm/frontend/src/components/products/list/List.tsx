import { useEffect, useState } from 'react'
import type Category from '../../../models/Category'
import './List.css'
import { getAllCategories } from '../../../services/categories'
import type ProductModel from '../../../models/Product'
import Product from '../product/Product'
import { getPerCategory } from '../../../services/products'
import { Link } from 'react-router-dom'

export default function List() {

    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<ProductModel[]>([])

    useEffect(() => {
        (async () => {
            try {
                const categories = await getAllCategories()
                setCategories(categories)
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    async function categoryChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        try {
            const categoryId = event.currentTarget.value
            const products = await getPerCategory(categoryId)
            setProducts(products)
        } catch (e) {
            alert(e)
        }

    }

    function productDeleted(id: string) {
        setProducts(products.filter(product => product.id !== id))
    }

    return (
        <div className='List'>

            <select onChange={categoryChanged}>
                <option value="" selected disabled>please select category</option>
                {categories.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
            </select>

            <hr />

            {products.map(product => <Product 
                key={product.id} 
                product={product}
                productDeleted={productDeleted}
            />)}

            <hr />

            <Link to="/add-product">add product</Link>


        </div>
    )
}