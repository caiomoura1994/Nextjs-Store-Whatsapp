import Link from 'next/link'
import React, { useState } from 'react'
import { useCart } from 'react-use-cart'
import { IStore } from '../@types/store'
import Layout from '../components/layout'
import useModal from '../components/Modal'
import ProductCard from '../components/ProductCard'
import {
  CategoriesList,
  CategorySectionTitle,
  FavCartButton,
  OpenedHoursModal,
  ProductList,
  StoreNavbar,
  StyledShoppingCart,
} from '../components/Store'
import StoreApi from '../services/StoreApi'


export default function Home({ storeData }: { storeData: IStore }) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(storeData.categories[0].id)
  const [Modal, show, toggle] = useModal(OpenedHoursModal);
  const { totalUniqueItems } = useCart();
  return (
    <>
      {show && <Modal toggleModal={toggle} />}
      <Layout home>
        <StoreNavbar toggleModal={toggle} />
        <CategoriesList show={show} slug={selectedCategorySlug}>
          {storeData?.categories?.map(category => <a
            href={`#${category?.id}`}
            key={category?.id}
            className={`category-${category?.id}`}
            onClick={() => setSelectedCategorySlug(category?.id)}
          >
            <p>{category?.name}</p>
          </a>
          )}
        </CategoriesList>
        <ProductList>
          {storeData?.categories?.map(category => <div key={category.id}>
            <CategorySectionTitle id={`category-${category?.id}`}>
              <p>{category.name}</p>
              <div />
            </CategorySectionTitle>
            {storeData?.products?.map((product) => <ProductCard key={product?.slug} {...product} />)}
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

export async function getStaticProps() {
  const storeData = await StoreApi.getBySlug("pastello");
  return {
    props: {
      storeData
    }
  }
}
