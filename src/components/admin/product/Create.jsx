import React, { useEffect, useState, useRef, useMemo } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { adminToken, apiUrl } from '../../common/http';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

const Create = ({ placeholder }) => {
    const [disabled, setDisable] = useState(false)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [sizes, setSizes] = useState([])
    const [sizesChecked, setSizesChecked] = useState([])
    const [gallery, setGallery] = useState([])
    const [galleryImages, setGalleryImages] = useState([])
    
    const navigate = useNavigate();

    const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || ''
		}),
		[placeholder]
	);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm();

    const saveProduct = async(data) => {
        setDisable(true)
        console.log(data)

        const formData = {...data, 'description' : content, 'gallery' : gallery}

        const res = await fetch(`${apiUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${adminToken()}`
            },
            body: JSON.stringify(formData)
        }).then(res =>res.json())
        .then(result => {
            console.log(result)
            setDisable(false)

            if (result.status === 200) {
                toast.success(result.message)
                navigate('/admin/products')
            } else {
                const formErrors = result.errors;
                Object.keys(formErrors).forEach( (field) => {
                    setError(field, {message: formErrors[field][0]});
                })
            }
        })
    }

    const handleFileChange = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append('image', file);
        setDisable(true)

        const res = await fetch(`${apiUrl}/temp-images`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${adminToken()}`
            },
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === 200) {
                gallery.push(result.data.id)
                setGallery(gallery)

                galleryImages.push(result.data.image_url)
                setGalleryImages(galleryImages)

                toast.success(result.message)
            } else {
                toast.error(result.errors.image[0])
            }

            setDisable(false)            
            e.target.value = null
        })
    }

    const fetchCategories = async () => {
        const res = await fetch(`${apiUrl}/categories`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${adminToken()}`
            }
        })
        .then(res => res.json())
        .then(result => {
            setCategories(result.data)
        })
    }

    const fetchBrands = async () => {
        const res = await fetch(`${apiUrl}/brands`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${adminToken()}`
            }
        })
        .then(res => res.json())
        .then(result => {
            setBrands(result.data)
        })
    }

    const fetchSizes = async () => {
        const res = await fetch(`${apiUrl}/sizes`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${adminToken()}`
            }
        })
        .then(res => res.json())
        .then(result => {
            setSizes(result.data)           
        })
    }

    const deleteImage = (image) => {
        const newGallery = galleryImages.filter((img) => img !== image)
        setGalleryImages(newGallery)
    }        

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        fetchSizes();
    }, [])

    return (
        <Layout>
			<div className="container">
				<div className="row">
					<div className="d-flex justify-content-between mt-5 pb-3">
						<h4 className="h4 pb-0 mb-0">Products / Create</h4>
                        <Link to="/admin/products" className='btn btn-primary'>Back</Link>
					</div>

					<div className="col-md-3">
						<Sidebar />
					</div>

					<div className="col-md-9">
						<form onSubmit={handleSubmit(saveProduct)}>
                            <div className="card shadow">
                                <div className="card-body p-4">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Title</label>
                                        <input 
                                            {
                                                ...register('title', {
                                                    required : 'The title field is required'
                                                })
                                            }
                                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                            type="text" 
                                            placeholder="Title" />
                                        {errors.title && <span className="invalid-feedback">{errors.title?.message}</span>}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="" className="form-label">Category</label>
                                                <select
                                                    {
                                                        ...register('category', {
                                                            required : 'Please select a category'
                                                        })
                                                    } 
                                                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                                    >
                                                    <option value="">Select a category</option>
                                                    {
                                                        categories && categories.map((category) => {
                                                            return (
                                                                <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.category && <span className="invalid-feedback">{errors.category?.message}</span>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="" className="form-label">Brand</label>
                                                <select
                                                    {
                                                        ...register('brand')
                                                    }
                                                    className='form-control'
                                                >
                                                    <option value="">Select a brand</option>
                                                    {
                                                        brands && brands.map((brand) => {
                                                            return (
                                                                <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className='form-label'>Short Description</label>
                                        <textarea 
                                            {
                                                ...register('short_description')
                                            }
                                            className='form-control' placeholder='Short Description' rows={3}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className='form-label'>Description</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        />
                                    </div>

                                    <h3 className="py-3 border-bottom mb-3">Price</h3>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="" className="form-label">Price</label>
                                            <input 
                                                {
                                                    ...register('price', {
                                                        required : 'The price field is required'
                                                    })
                                                }
                                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                type="text" 
                                                placeholder="Price" />
                                            {errors.price && <span className="invalid-feedback">{errors.price?.message}</span>}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="" className="form-label">Discounted Price</label>
                                            <input 
                                                {
                                                    ...register('compare_price')
                                                }
                                                type="text" className="form-control" placeholder='Discounted Price' />
                                        </div>
                                    </div>

                                    <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="" className="form-label">SKU</label>
                                                <input 
                                                    {
                                                        ...register('sku', {
                                                            required : 'The sku field is required'
                                                        })
                                                    }
                                                    className={`form-control ${errors.sku ? 'is-invalid' : ''}`}
                                                    type="text" 
                                                    placeholder="SKU" />
                                                {errors.sku && <span className="invalid-feedback">{errors.sku?.message}</span>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="" className="form-label">Barcode</label>
                                                <input 
                                                    {
                                                        ...register('barcode')
                                                    }
                                                    type="text" className="form-control" placeholder='Barcode' />
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="" className="form-label">Qty</label>
                                                <input 
                                                    {
                                                        ...register('qty')
                                                    }
                                                    type="text" className="form-control" placeholder='Qty' />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="" className="form-label">Status</label>
                                                <select
                                                    {
                                                        ...register('status')
                                                    }
                                                    className='form-control'
                                                    >
                                                    <option value="">Select a status</option>
                                                    <option value="1">Active</option>
                                                    <option value="0">Block</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Featured</label>
                                        <select
                                            {
                                                ...register('is_featured')
                                            }
                                            className='form-control'
                                            >
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </div>

                                    <h3 className="py-3 border-bottom mb-3">Sizes</h3>

                                    <div className="mb-3">
                                        {
                                            sizes && sizes.map(size => {
                                                return (
                                                    <div className="form-check-inline ps-2" key={`product-size-${size.id}`}>
                                                        <input
                                                            {
                                                                ...register('sizes')
                                                            }
                                                            checked={sizesChecked.includes(size.id)}
                                                            onChange={ (e) => {
                                                                if (e.target.checked) {
                                                                    setSizesChecked([...sizesChecked, size.id])
                                                                } else {
                                                                    setSizesChecked(sizesChecked.filter(sid => sid != size.id))
                                                                }
                                                            }}
                                                            type="checkbox" 
                                                            className="form-check-input" 
                                                            id={`size-${size.id}`}
                                                            value={size.id} 
                                                        />
                                                        <label 
                                                            htmlFor={`size-${size.id}`} 
                                                            className="form-check-label ps-2"
                                                        >
                                                            {size.name}
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                        
                                    </div>

                                    <h3 className="py-3 border-bottom mb-3">Gallery</h3>

                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Image</label>
                                        <input 
                                            onChange={handleFileChange}
                                            type="file" className='form-control' />
                                    </div>

                                    <div className="mb-3">
                                        <div className="row">
                                            {
                                                galleryImages && galleryImages.map((image, index) => {
                                                    return (
                                                        <div key={`gallery-${index}`} className="col-md-2">
                                                            <div className="card shadow">
                                                                <img src={image} alt="" className="img-fluid" />                                                                
                                                            </div>
                                                            <button className='btn btn-danger mt-3 w-100' onClick={ () => deleteImage(image)}>Delete</button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button 
                                disabled={disabled}
                                className="btn btn-primary mt-3 mb-5"
                            >Create</button>
                        </form>

					</div>
				</div>
			</div>
		</Layout>
    )
}

export default Create