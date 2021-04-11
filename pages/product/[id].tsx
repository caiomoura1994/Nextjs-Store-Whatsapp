import { useEffect, useState } from 'react';
import { formatToBRL } from 'brazilian-values';
import { useRouter } from 'next/router'

import Layout from '../../components/layout'
import { useCart } from "react-use-cart";
import CheckboxUi from '../../components/ui/Checkbox';
import ProductDetailUi from '../../components/pages/productDetailUi';
import ProductApi from '../../services/ProductApi';
import { IProduct } from '../../@types/store';

const ADITIONALS = [
  {
    title: "Bolsa de palha",
    id: 1,
    checked: false,
    price: 10
  },
  {
    title: "Test 2",
    id: 2,
    checked: false,
    price: 20
  }
]


export default function ProductPage(props: IProduct) {
  const router = useRouter()
  const [productId, setProductId] = useState("");
  const [comment, setComment] = useState("");
  const [aditionals, setAditionals] = useState(ADITIONALS);
  const {
    // totalUniqueItems,
    // totalItems,
    // items,
    removeItem,
    updateItemQuantity,
    addItem,
    getItem,
    updateItem
  } = useCart();
  const sumAdditionals = aditionals.map(d => d.checked && d.price || 0).reduce((ad, currentValue) => ad + currentValue)
  const itemProduct = getItem(productId);

  useEffect(() => {
    setProductId(`${Date.now()}-${props.id}`)
  }, []);

  useEffect(() => {
    addCartItem()
  }, [productId]);

  function handleWithAditionals(aditionalIndex, status) {
    const multable = aditionals;
    multable[aditionalIndex] = {
      ...aditionals[aditionalIndex],
      checked: !status
    }
    setAditionals([...multable])
    itemProduct && updateItem(itemProduct.id, {
      ...itemProduct,
      aditionals: multable,
      comment
    })
  }

  async function addToCard() {
    itemProduct && updateItem(itemProduct.id, {
      ...itemProduct,
      sumAdditionals,
      comment
    })
    router.back();
  }

  async function removeCartItem() {
    itemProduct && updateItemQuantity(productId, itemProduct?.quantity - 1)
  }

  function addCartItem() {
    if (!productId) return;
    if (itemProduct) {
      updateItemQuantity(productId, itemProduct?.quantity + 1)
    } else {
      addItem({
        ...props,
        aditionals,
        sumAdditionals,
        price: sumAdditionals + Number(props.price),
        id: productId,
        comment
      })
    }
  }


  function handleChangeComment(event) {
    setComment(event.target.value)
  }

  const goBackAction = () => {
    removeItem(productId);
    setAditionals(ADITIONALS);
  }

  return (
    <Layout goBackAction={goBackAction}>
      <ProductDetailUi.ProductContainer>
        <ProductDetailUi.HeaderSection>
          <img alt="image" src={props.photo} />
          <div>
            <h1>{props.name}</h1>
            {/* <p>Cód: {props.cod}</p> */}
            <p>{props.description}</p>
          </div>
        </ProductDetailUi.HeaderSection>
        <div className="section-title">Adicionais</div>
        <section>
          {aditionals?.map((ad, index) => {
            return <CheckboxUi
              key={ad.id}
              onClick={() => handleWithAditionals(index, ad.checked)}
              text={`${ad.title} | ${formatToBRL(ad.price)}`}
              isChecked={ad.checked}
            />
          }
          )}
        </section>
        <div className="section-title">Algum comentário?</div>
        <section>
          <textarea onChange={handleChangeComment} placeholder="Ex: Remover maionese.">
          </textarea>
          <ProductDetailUi.ActionContainer>
            <div className="flex counter">
              <div onClick={removeCartItem}>
                <label className="gradient-color">-</label>
              </div>
              <span>{itemProduct?.quantity || 0}</span>
              <div onClick={addCartItem}>
                <label className="gradient-color">+</label>
              </div>
            </div>
            <div onClick={addToCard} className="gradient add-button">
              Adicionar {formatToBRL((itemProduct?.quantity || 0) * (sumAdditionals + Number(props.price)))}
            </div>
          </ProductDetailUi.ActionContainer>
        </section>
      </ProductDetailUi.ProductContainer>
    </Layout>
  )
}


export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "2" } },
      { params: { id: "1" } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const product = await ProductApi.get(params?.id);
  return {
    props: product
  }
}