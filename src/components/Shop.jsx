import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Link, useSearchParams } from 'react-router-dom'
import { apiUrl } from './common/http'
import { toast } from 'react-toastify'

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [catChecked, setCatChecked] = useState(() =>{
        const category = searchParams.get('category');
        return category ? category.split(',') : [];
    });
    const [brandChecked, setBrandChecked] = useState(() =>{
        const brand = searchParams.get('brand');
        return brand ? brand.split(',') : [];
    });


    const fetchProducts = async () => {
        let search = []
        let params = ''

        if (catChecked.length > 0) {
            search.push(['category', catChecked])
        }

        if (brandChecked.length > 0) {
            search.push(['brand', brandChecked])
        }

        if (search.length > 0) {
            params = new URLSearchParams(search)
            setSearchParams(params)
        } else {
            setSearchParams([])
        }


        await fetch(`${apiUrl}/get-products?${params}`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
            }
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === 200) {
                setProducts(result.data)
            } else {
                toast.error(result.message)
            }
        })
    }

    const fetchCategories = async () => {
        await fetch(`${apiUrl}/get-categories`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
            }
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === 200) {
                setCategories(result.data)
            } else {
                toast.error(result.message)
            }
        })
    }

    const fetchBrands = async () => {
        await fetch(`${apiUrl}/get-brands`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
            }
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === 200) {
                setBrands(result.data)
            } else {
                toast.error(result.message)
            }
        })
    }

    const handleCategory = (e) => {
        const {checked, value} = e.target;

        if (checked) {
            setCatChecked(pre => [...pre, value])
        } else {
            setCatChecked(catChecked.filter(id => id != value))
        }
    }

    const handleBrand = (e) => {
        const {checked, value} = e.target;

        if (checked) {
            setBrandChecked(pre => [...pre, value])
        } else {
            setBrandChecked(brandChecked.filter(id => id != value))
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        fetchProducts();
    }, [catChecked, brandChecked])

    return (
        <Layout>
            <div className="container">
                <nav aria-label="breadcrumb" className="py-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Shop</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card shadow border-0 mb-3">
                            <div className="card-body p-4">
                                <h3 className="card-title mb-3">Categories</h3>
                                <ul>
                                    {
                                        categories && categories.map(category => {
                                            return (
                                                <li className='mb-2' key={`category-${category.id}`}>
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={ searchParams.get('category')
                                                                    ? searchParams.get('category').includes(category.id)
                                                                    : false
                                                                }
                                                        value={category.id} id={`category-${category.id}`}
                                                        onClick={handleCategory}
                                                    />
                                                    <label
                                                        htmlFor={`category-${category.id}`}
                                                        className='ps-2'
                                                    >
                                                        {category.name}
                                                    </label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>

                            </div>
                        </div>

                        <div className="card shadow border-0 mb-3">
                            <div className="card-body p-4">
                                <h3 className="card-title mb-3">Brands</h3>
                                <ul>
                                    {
                                        brands && brands.map(brand => {
                                            return (
                                                <li className='mb-2' key={`brand-${brand.id}`}>
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={ searchParams.get('brand') 
                                                            ? searchParams.get('brand').includes(brand.id) 
                                                            : false 
                                                        }
                                                        value={brand.id} id={`brand-${brand.id}`}
                                                        onClick={handleBrand}
                                                    />
                                                    <label
                                                        htmlFor={`brand-${brand.id}`}
                                                        className='ps-2'
                                                    >
                                                        {brand.name}
                                                    </label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row pb-5">
                            {
                                products && products.map(product => {
                                    return (
                                        <div className="col-md-4 col-6" key={`product-${product.id}`}>
                                            <div className="product card shadow-0 border-0">
                                                <div className="card-img">
                                                    <Link to={`/product/${product.id}`}>
                                                        <img src={product.image_url} alt="Product Image" className='w-100' />
                                                    </Link>
                                                </div>
                                                <div className="card-body pt-3">
                                                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                                                    <div className='price'>
                                                        Rs {product.price}

                                                        {
                                                            product.compare_price && <span className='text-decoration-line-through ms-3'>Rs {product.compare_price}</span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shop
