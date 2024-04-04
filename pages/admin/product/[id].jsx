import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';

import Loading from '../../../components/loadingSkeletonOrders';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
export default function AdminProductEditScreen() {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('slug', data.slug);
        setValue('price', data.price);
        setValue('image', data.image);
        setValue('category', data.category);
        setValue('brand', data.brand);
        setValue('countInStock', data.countInStock);
        setValue('description', data.description);
        setValue('highlight1', data.highlights[0]);
        setValue('highlight2', data.highlights[1]);
        setValue('highlight3', data.highlights[2]);
        setValue('highlight4', data.highlights[3]);
        setValue('image1', data.images[3].src);
        setValue('image2', data.images[0].src);
        setValue('image3', data.images[1].src);
        setValue('image4', data.images[2].src);
        setValue('alt1', data.images[3].alt);
        setValue('alt2', data.images[0].alt);
        setValue('alt3', data.images[1].alt);
        setValue('alt4', data.images[2].alt);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const uploadHandler = async (e, imageField) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageField, data.secure_url);
      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
    highlight1,
    highlight2,
    highlight3,
    highlight4,
    image1,
    image2,
    image3,
    image4,
    alt1,
    alt2,
    alt3,
    alt4,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
        highlight1,
        highlight2,
        highlight3,
        highlight4,
        image1,
        image2,
        image3,
        image4,
        alt1,
        alt2,
        alt3,
        alt4,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5 mb-[5vh] h-fit">
        <div className="flex justify-start sm:shadow-2xl sm:mx-6 sm:p-6 sm:rounded-2xl">
          <div>
            <ul>
              <li>
                <Link href="/admin/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/admin/orders">Orders</Link>
              </li>
              <li>
                <Link
                  className="font-bold text-primary text-3xl"
                  href="/admin/products"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link href="/admin/users">Users</Link>
              </li>
              <li>
                <Link href="/admin/upcyclers">Upcyclers</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-3 sm:shadow-2xl sm:p-6 sm:rounded-2xl sm:mr-6">
          {loading ? (
            <div>
              <Loading />
            </div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-3xl font-bold text-primary">{`Edit Product ${productId}`}</h1>
              <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="w-full"
                  id="name"
                  autoFocus
                  {...register('name', {
                    required: 'Please enter name',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  className="w-full"
                  id="slug"
                  {...register('slug', {
                    required: 'Please enter slug',
                  })}
                />
                {errors.slug && (
                  <div className="text-red-500">{errors.slug.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="w-full"
                  id="price"
                  {...register('price', {
                    required: 'Please enter price',
                  })}
                />
                {errors.price && (
                  <div className="text-red-500">{errors.price.message}</div>
                )}
              </div>
              <div className="my- bg-slate-50 rounded-lg p-3">
                <div className="mb-4">
                  <label htmlFor="image" className="font-semibold">
                    Main Page Image
                  </label>
                  <input
                    type="text"
                    className="w-full"
                    id="image"
                    {...register('image', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="imageFile">Upload image</label>
                  <input
                    type="file"
                    className="w-full"
                    id="imageFile"
                    onChange={(e) => uploadHandler(e, 'image')}
                  />

                  {loadingUpload && <div>Uploading....</div>}
                </div>
              </div>
              {/* image section */}
              <div className="my-2 bg-slate-50 rounded-lg p-3">
                <div className="mb-4">
                  <label htmlFor="image" className="font-semibold">
                    Feature Image
                  </label>
                  <input
                    type="text"
                    className="w-full"
                    id="image1"
                    {...register('image1', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="image">alt text</label>
                  <input
                    type="text"
                    className="w-full"
                    id="alt1"
                    {...register('alt1', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="imageFile">Upload image</label>
                  <input
                    type="file"
                    className="w-full"
                    id="imageFile"
                    onChange={(e) => uploadHandler(e, 'image1')}
                  />

                  {loadingUpload && <div>Uploading....</div>}
                </div>
              </div>
              {/* image section */}
              <div className="my-2 bg-slate-50 rounded-lg p-3">
                <div className="mb-4">
                  <label htmlFor="image" className="font-semibold">
                    Primary Image
                  </label>
                  <input
                    type="text"
                    className="w-full"
                    id="image2"
                    {...register('image2', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="image">alt text</label>
                  <input
                    type="text"
                    className="w-full"
                    id="alt2"
                    {...register('alt2', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="imageFile">Upload image</label>
                  <input
                    type="file"
                    className="w-full"
                    id="imageFile"
                    onChange={(e) => uploadHandler(e, 'image2')}
                  />

                  {loadingUpload && <div>Uploading....</div>}
                </div>
              </div>
              {/* image section */}
              <div className="my-2 bg-slate-50 rounded-lg p-3">
                <div className="mb-4">
                  <label htmlFor="image" className="font-semibold">
                    Secondary Image
                  </label>
                  <input
                    type="text"
                    className="w-full"
                    id="image3"
                    {...register('image3', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="image">alt text</label>
                  <input
                    type="text"
                    className="w-full"
                    id="alt3"
                    {...register('alt3', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="imageFile">Upload image</label>
                  <input
                    type="file"
                    className="w-full"
                    id="imageFile"
                    onChange={(e) => uploadHandler(e, 'image3')}
                  />

                  {loadingUpload && <div>Uploading....</div>}
                </div>
              </div>
              {/* image section */}
              <div className="my-2 bg-slate-50 rounded-lg p-3">
                <div className="mb-4">
                  <label htmlFor="image" className="font-semibold">
                    Tetiary Image
                  </label>
                  <input
                    type="text"
                    className="w-full"
                    id="image4"
                    {...register('image4', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="image">alt text</label>
                  <input
                    type="text"
                    className="w-full"
                    id="alt4"
                    {...register('alt4', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="imageFile">Upload image</label>
                  <input
                    type="file"
                    className="w-full"
                    id="imageFile"
                    onChange={(e) => uploadHandler(e, 'image4')}
                  />

                  {loadingUpload && <div>Uploading....</div>}
                </div>
              </div>
              {/* image section */}
              <div className="mb-4">
                <label htmlFor="category">category</label>
                <input
                  type="text"
                  className="w-full"
                  id="category"
                  {...register('category', {
                    required: 'Please enter category',
                  })}
                />
                {errors.category && (
                  <div className="text-red-500">{errors.category.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="brand">brand</label>
                <input
                  type="text"
                  className="w-full"
                  id="brand"
                  {...register('brand', {
                    required: 'Please enter brand',
                  })}
                />
                {errors.brand && (
                  <div className="text-red-500">{errors.brand.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="countInStock">countInStock</label>
                <input
                  type="text"
                  className="w-full"
                  id="countInStock"
                  {...register('countInStock', {
                    required: 'Please enter countInStock',
                  })}
                />
                {errors.countInStock && (
                  <div className="text-red-500">
                    {errors.countInStock.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="countInStock">description</label>
                <textarea
                  type="text"
                  rows="4"
                  className="w-full"
                  id="description"
                  {...register('description', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="countInStock">Highlight 1</label>
                <input
                  type="text"
                  rows="4"
                  className="w-full"
                  id="highlight1"
                  {...register('highlight1', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="countInStock">Highlight 2</label>
                <input
                  type="text"
                  rows="4"
                  className="w-full"
                  id="highlight2"
                  {...register('highlight2', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="countInStock">Highlight 3</label>
                <input
                  type="text"
                  rows="4"
                  className="w-full"
                  id="highlight3"
                  {...register('highlight3', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="countInStock">Highlight 4</label>
                <input
                  type="text"
                  rows="4"
                  className="w-full"
                  id="highlight4"
                  {...register('highlight4', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? 'Loading' : 'Update'}
                </button>
              </div>
              <div className="mb-4">
                <Link href={`/admin/products`}>Back</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth = { adminOnly: true };
