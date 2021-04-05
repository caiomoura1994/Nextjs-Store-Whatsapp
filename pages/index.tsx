import { useState } from 'react'
import { useCart } from 'react-use-cart'
import Link from 'next/link'

import Layout from '../components/layout'
import useModal from '../components/Modal'
import ProductCard from '../components/ProductCard'
import {
  CategorySectionTitle,
  ProductList,
  StyledShoppingCart,
  CategoriesList,
  StoreNavbar,
  OpenedHoursModal,
  FavCartButton
} from '../components/Store'
import { getSortedPostsData } from '../lib/posts'


const CATEGORIES_MOCK = [
  {
    selected: true,
    name: "Moda Praia",
    slug: "moda-praia"
  },
  {
    name: "Pijamas",
    slug: "pijamas"
  },
  {
    name: "Banho",
    slug: "banho"
  },
  {
    name: "Kids",
    slug: "kids"
  },
  {
    name: "Test",
    slug: "test"
  },
]

const PRODUCTS_MOCK = [
  {
    title: "Bolsa de palha",
    cod: 10,
    description: "Pizza de calabresa apimentada test",
    price: 20,
    image: "https://a-static.mlcdn.com.br/618x463/bolsa-feminina-dhaffy-bege-divisorias-alca-de-mao-e-transversal-dhaffy-bolsas/dhaffybolsas/5703861364/1a5bdaa8a82b22de3dc2468583981810.jpg"
  },
  {
    title: "Pizza test",
    cod: 10,
    description: "Pizza de calabresa apimentada test",
    price: 20,
    image: "https://a-static.mlcdn.com.br/618x463/bolsa-feminina-dhaffy-bege-divisorias-alca-de-mao-e-transversal-dhaffy-bolsas/dhaffybolsas/5703861364/1a5bdaa8a82b22de3dc2468583981810.jpg"
  },
  {
    title: "SC Praia",
    cod: 10,
    description: "Pizza de calabresa apimentada test",
    price: 20,
    image: "https://a-static.mlcdn.com.br/618x463/bolsa-feminina-dhaffy-bege-divisorias-alca-de-mao-e-transversal-dhaffy-bolsas/dhaffybolsas/5703861364/1a5bdaa8a82b22de3dc2468583981810.jpg"
  },
  {
    title: "XXX Praia",
    cod: 10,
    description: "Pizza de calabresa apimentada test",
    price: 20,
    image: "https://a-static.mlcdn.com.br/618x463/bolsa-feminina-dhaffy-bege-divisorias-alca-de-mao-e-transversal-dhaffy-bolsas/dhaffybolsas/5703861364/1a5bdaa8a82b22de3dc2468583981810.jpg"
  },
]

export default function Home({ allPostsData }) {
  const [selectedSlug, setSelectedSlug] = useState(CATEGORIES_MOCK[0].slug)
  const [Modal, show, toggle] = useModal(OpenedHoursModal);
  const { totalUniqueItems } = useCart();
  return (
    <>
      {show && <Modal toggleModal={toggle} />}
      <Layout home>
        <StoreNavbar toggleModal={toggle} />
        <CategoriesList show={show} slug={selectedSlug}>
          {CATEGORIES_MOCK.map(category => <a
            href={`#${category?.slug}`}
            key={category?.slug}
            className={category?.slug}
            onClick={() => setSelectedSlug(category?.slug)}
          >
            <p>{category?.name}</p>
          </a>
          )}
        </CategoriesList>
        <ProductList>
          {CATEGORIES_MOCK.map(category => <div key={category.slug}>
            <CategorySectionTitle id={category?.slug}>
              <p>{category.name}</p>
              <div />
            </CategorySectionTitle>
            {PRODUCTS_MOCK.map((product) => <ProductCard key={product.title} {...product} />)}
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
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
