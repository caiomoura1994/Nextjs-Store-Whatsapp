import { useState } from 'react';
import { formatToBRL } from 'brazilian-values';
import { useRouter } from 'next/router'

import Layout from '../../../components/layout'
import { useCart } from "react-use-cart";
import CheckboxUi from '../../../components/ui/Checkbox';
import ProductDetailUi from '../../../components/pages/productDetailUi';


export default function ProductPage() {


  const router = useRouter()
  const { id } = router.query;
  const productId = String(id);
  const {
    updateItemQuantity,
    addItem,
    getItem,
    updateItem,
    removeItem
  } = useCart();
  const itemProduct = getItem(productId);

  const [comment, setComment] = useState("");
  const [aditionals, setAditionals] = useState(itemProduct?.aditionals || []);
  const sumAdditionals = aditionals.map(d => d.checked && d.price || 0).reduce((ad, currentValue) => ad + currentValue)

  function handleWithAditionals(aditionalIndex, status) {
    const multable = aditionals;
    multable[aditionalIndex] = {
      ...aditionals[aditionalIndex],
      checked: !status
    }
    setAditionals([...multable])
    itemProduct && updateItem(itemProduct?.id, {
      ...itemProduct,
      aditionals: multable,
      comment
    })
  }

  async function addToCard() {
    itemProduct && updateItem(itemProduct?.id, {
      ...itemProduct,
      sumAdditionals,
      comment
    })
    router.back();
  }

  async function removeCartItem() {
    if (itemProduct?.quantity === 1) {
      const haveSure = confirm("Tem certeza que quer excluir esse item ?");
      removeItem(itemProduct?.id);
      haveSure && router.back();
      return
    }
    itemProduct && updateItemQuantity(productId, itemProduct?.quantity - 1)
  }

  function addCartItem() {
    if (!productId) return;
    if (itemProduct) {
      updateItemQuantity(productId, itemProduct?.quantity + 1)
    } else {
      addItem({
        ...itemProduct,
        aditionals,
        sumAdditionals,
        price: sumAdditionals + Number(itemProduct?.price),
        id: productId,
        comment
      })
    }
  }


  function handleChangeComment(event) {
    setComment(event.target.value)
    itemProduct && updateItem(itemProduct?.id, {
      ...itemProduct,
      comment: event.target.value
    })
  }

  return (
    <Layout>
      <ProductDetailUi.ProductContainer>
        <ProductDetailUi.HeaderSection>
          <img alt="image" src={itemProduct?.photo} />
          <div>
            <h1>{itemProduct?.name}</h1>
            {/* <p>Cód: {itemProduct?.cod}</p> */}
            <p>{itemProduct?.description}</p>
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
              Total {formatToBRL((itemProduct?.quantity || 0) * (sumAdditionals + Number(itemProduct?.price)))}
            </div>
          </ProductDetailUi.ActionContainer>
        </section>
      </ProductDetailUi.ProductContainer>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false
  }
}

export async function getStaticProps() {
  return {
    props: {}
  }
}