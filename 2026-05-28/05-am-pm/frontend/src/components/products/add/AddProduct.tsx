import { useEffect, useState } from 'react'
import './AddProduct.css'
import { getAllCategories } from '../../../services/categories'
import type Category from '../../../models/Category'
import type ProductDraft from '../../../models/ProductDraft'
import { useForm } from 'react-hook-form'
import { newProduct } from '../../../services/products'
import { useNavigate } from 'react-router-dom'

export default function AddProduct() {

    const [categories, setCategories] = useState<Category[]>([])
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

    const {register, handleSubmit} = useForm<ProductDraft>()

    const navigate = useNavigate()

    async function submit(draft: ProductDraft) {
        try {
            await newProduct(draft)
            navigate('/')
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='AddProduct'>
            <form onSubmit={handleSubmit(submit)}>
                <select {...register('categoryId')}>
                    <option value="" selected disabled>please select category</option>
                    {categories.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
                </select>
                <input placeholder='name' {...register('name')}/>
                <input placeholder='price' type="number" {...register('price')}/>
                <input placeholder='manu' type="date" {...register('manufactureDate')}/>
                <input placeholder='expi' type="date" {...register('expirationDate')}/>
                <button>add product</button>
            </form>
        </div>
    )
}