import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import { IStore } from '../@types/store'
import Layout from '../components/layout'
import useModal from '../components/Modal'
import ProductCard from '../components/ProductCard'
import SEO from '../components/SEO'
import {
  CategoriesList,
  CategorySectionTitle,
  FavCartButton,
  ProductList,
  StyledShoppingCart,
} from '../components/Store'
import StoreNavbar from '../components/StoreNavbar'
import OpenedHoursModal from '../components/OpenedHoursModal'
import ProductApi from '../services/ProductApi'
import StoreApi from '../services/StoreApi'

interface HomeProps {
  storeData: IStore
}

export default function Home({ storeData }: HomeProps) {
  console.log('storeData', storeData);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(storeData.categories[0].id)
  const [categories, setCategories] = useState([])
  const [Modal, show, toggle] = useModal(OpenedHoursModal);
  const { totalUniqueItems } = useCart();

  async function handleWithCategories() {
    const categoriesWithProducts = await Promise.all(
      storeData?.categories?.map(async category => {
        const products = await ProductApi.listByCategory(String(category?.id))
        return {
          ...category,
          products
        }
      })
    )
    setCategories(categoriesWithProducts.filter((category) => category?.products.length))
  }
  useEffect(() => {
    localStorage.setItem("storeData", JSON.stringify(storeData))
    handleWithCategories()
  }, [])

  return (
    <>
      <SEO title={storeData?.establishment_name} description={storeData?.description} image={storeData?.photo} />
      {show && <Modal toggleModal={toggle} openinghours={storeData?.openinghours} />}
      <Layout home>
        <StoreNavbar toggleModal={toggle} store={storeData} />
        <CategoriesList show={show} slug={selectedCategorySlug}>
          {categories?.map(category => <a
            href={`#category-${category?.id}`}
            key={category?.id}
            className={`category-${category?.id}`}
            onClick={() => setSelectedCategorySlug(category?.id)}
          >
            <p>{category?.name}</p>
          </a>
          )}
        </CategoriesList>
        <ProductList>
          {categories?.map(category => <div key={category.id}>
            <CategorySectionTitle id={`category-${category?.id}`}>
              <p>{category.name}</p>
              <div />
            </CategorySectionTitle>
            {category?.products?.map((product) => <ProductCard key={product?.id} {...product} />)}
          </div>
          )}
        </ProductList>
        {!show && totalUniqueItems > 0 && <Link href="/carrinho">
          <FavCartButton className="gradient">
            <StyledShoppingCart />
            <span>{totalUniqueItems}</span>
          </FavCartButton>
        </Link>
        }
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const storeData = await StoreApi.getBySlug(params.slug);
  return {
    props: {
      storeData
    }
  }
}
