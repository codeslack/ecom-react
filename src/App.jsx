import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/admin/Login'
import Dashboard from './components/admin/Dashboard'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'
import {default as ShowCategories} from './components/admin/category/Show';
import {default as CreateCategory} from './components/admin/category/Create';


function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/shop' element={<Shop />} />
					<Route path='/product' element={<Product />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/checkout' element={<Checkout />} />
					<Route path='/admin/login' element={<Login />} />
					
					{/* // admin routes */}
					<Route path='/admin/dashboard' element={
						<AdminRequireAuth>
							<Dashboard />
						</AdminRequireAuth>
					} />

					<Route path='/admin/categories' element={
						<AdminRequireAuth>
							<ShowCategories />
						</AdminRequireAuth>
					} />

					<Route path='/admin/categories/create' element={
						<AdminRequireAuth>
							<CreateCategory />
						</AdminRequireAuth>
					} />
				</Routes>
				<ToastContainer />
			</BrowserRouter>

		</>
	)
}

export default App
