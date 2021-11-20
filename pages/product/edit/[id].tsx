import { useEffect, useState } from 'react';
import { formatToBRL } from 'brazilian-values';
import { find } from 'lodash';
import { useRouter } from 'next/router'
import classNames from 'classnames';
import produce from 'immer';

import Layout from '../../../components/layout'
import { useCart } from "react-use-cart";
import CheckboxUi from '../../../components/ui/Checkbox';
import ProductDetailUi from '../../../components/pages/productDetailUi';

const PIZZA_SIZES = ['LARGE', 'FAMILY']

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query;
  const productId = String(id);
  const [pizzaSizeSelected, setPizzaSizeSelected] = useState(PIZZA_SIZES[0]);
  const flavorsQuantityLimit = PIZZA_SIZES[0] === pizzaSizeSelected ? 3 : 4;
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const {
    updateItemQuantity,
    addItem,
    getItem,
    updateItem,
    removeItem
  } = useCart();
  const itemProduct = getItem(productId);

  const checkedFlavors = selectedFlavors.filter(d => d.checked)
  let productPrice = Number(itemProduct?.price);
  if (itemProduct?.categoryIsPizza && checkedFlavors?.length > 0) {
    const [price] = checkedFlavors?.map((d) => Number(d.price)).sort((a, b) => a - b).reverse()
    productPrice = flavorsQuantityLimit === 3 ? price : price + 10;
  }

  const [comment, setComment] = useState("");
  const [aditionals, setAditionals] = useState(itemProduct?.aditionals || []);
  const sumAdditionals = aditionals.map(d => d.checked && d.price || 0).reduce((ad, currentValue) => ad + currentValue, 0)

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
      if (!haveSure) return;
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

  function handleWithPizzaFlavors(flavorIndex, status) {
    if (checkedFlavors.length >= flavorsQuantityLimit && !status) return;
    if (selectedFlavors[flavorIndex].id === itemProduct.id) return;

    const multableSelectedFlavor = produce(selectedFlavors, draftState => {
      draftState[flavorIndex].checked = !status
    })

    setSelectedFlavors([...multableSelectedFlavor])
    itemProduct && updateItem(itemProduct.id, {
      ...itemProduct,
      selectedFlavors: multableSelectedFlavor.filter(d => d.checked),
      pizzaSizeSelected,
      comment
    })
  }


  function handleChangeComment(event) {
    setComment(event.target.value)
    itemProduct && updateItem(itemProduct?.id, {
      ...itemProduct,
      comment: event.target.value
    })
  }

  useEffect(() => {
    console.log(itemProduct)
    const storeData = JSON.parse(localStorage.getItem("storeData"))
    setAditionals(
      storeData?.additionals?.map((additional) => ({ ...additional, checked: false }))
    )
    setSelectedFlavors(
      itemProduct?.pizzaProducts?.map((product) => {

        const flavorIsChecked = find(itemProduct?.selectedFlavors, { id: product.id });
        console.log('flavorIsChecked:', flavorIsChecked)
        return ({ ...product, checked: !!flavorIsChecked })
      })
    )
  }, [itemProduct])

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
        {itemProduct?.categoryIsPizza && <>
          <div className="flex m-3">
            {PIZZA_SIZES.map((size) => {
              const isSelectedSize = size === pizzaSizeSelected;
              const buttonClassName = classNames('product-sizes-button', { gradient: isSelectedSize, 'op-5': !isSelectedSize })
              return <div
                onClick={() => setPizzaSizeSelected(size)}
                className={buttonClassName}
              >
                {/* {size === PIZZA_SIZES[0] && '6 Fatias'} */}
                {size === PIZZA_SIZES[0] && '8 Fatias'}
                {size === PIZZA_SIZES[1] && '12 Fatias'}
              </div>
            })}
          </div>
          <div className="section-title">Escolha até {flavorsQuantityLimit} sabores</div>
          <section>
            {flavorsQuantityLimit && selectedFlavors?.map((pizzaProduct, idx) => <CheckboxUi
              onClick={() => handleWithPizzaFlavors(idx, pizzaProduct.checked)}
              text={`${pizzaProduct.name} | ${formatToBRL(flavorsQuantityLimit === 3 ? pizzaProduct.price : Number(pizzaProduct.price) + 10)}`}
              isChecked={pizzaProduct.checked}
            />)}
          </section>
        </>
        }
        <div className="section-title">Adicionais</div>
        <section>
          {aditionals?.map((ad, index) => {
            return <CheckboxUi
              key={ad.id}
              onClick={() => handleWithAditionals(index, ad.checked)}
              text={`${ad.description} | ${formatToBRL(ad.price)}`}
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
              Total {formatToBRL((itemProduct?.quantity || 0) * (sumAdditionals + productPrice))}
            </div>
          </ProductDetailUi.ActionContainer>
        </section>
      </ProductDetailUi.ProductContainer>
    </Layout>
  )
}


export async function getServerSideProps() {
  return {
    props: {}
  }
}