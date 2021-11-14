import { useEffect, useState } from 'react';
import { formatToBRL } from 'brazilian-values';
import { useRouter } from 'next/router'
import classNames from 'classnames';

import Layout from '../../../components/layout'
import { useCart } from "react-use-cart";
import CheckboxUi from '../../../components/ui/Checkbox';
import ProductDetailUi from '../../../components/pages/productDetailUi';
import ProductApi from '../../../services/ProductApi';
import { IProduct } from '../../../@types/store';
import produce from 'immer';

const PIZZA_SIZES = ['LARGE', 'FAMILY']

interface IProductPageDetail extends IProduct {
  pizzaProducts: IProduct[]
  categoryIsPizza: boolean;
}
export default function ProductPageDetail(props: IProductPageDetail) {
  const router = useRouter()
  const [productId, setProductId] = useState("");
  const [comment, setComment] = useState("");
  const [pizzaSizeSelected, setPizzaSizeSelected] = useState(PIZZA_SIZES[0]);
  const [aditionals, setAditionals] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const {
    removeItem,
    updateItemQuantity,
    addItem,
    getItem,
    updateItem
  } = useCart();
  const flavorsQuantityLimit = PIZZA_SIZES[0] === pizzaSizeSelected ? 3 : 4;
  const sumAdditionals = aditionals?.map(d => d.checked && Number(d.price) || 0)?.reduce((ad, currentValue) => ad + currentValue, 0)
  const itemProduct = getItem(productId);
  const checkedFlavors = selectedFlavors.filter(d => d.checked)
  let productPrice = Number(itemProduct?.price);
  if (props?.categoryIsPizza && checkedFlavors?.length > 0) {
    const [price] = checkedFlavors?.map((d) => Number(d.price)).sort((a, b) => a - b).reverse()
    productPrice = flavorsQuantityLimit === 3 ? price : price + 10;
  }

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

  function handleWithPizzaFlavors(flavorIndex, status) {
    if (checkedFlavors.length >= flavorsQuantityLimit && !status) return;
    if (selectedFlavors[flavorIndex].id === props.id) return;

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

  async function addToCard() {
    itemProduct && updateItem(itemProduct.id, {
      ...itemProduct,
      sumAdditionals,
      comment,
      price: productPrice,
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
    setAditionals([]);
    setSelectedFlavors([]);
  }
  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("storeData"))
    setAditionals(
      storeData?.additionals?.map((additional) => ({ ...additional, checked: false }))
    )
    setSelectedFlavors(
      props?.pizzaProducts?.map((product) => {
        return ({ ...product, checked: props.id === product.id })
      })
    )
  }, [])

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
        {props?.categoryIsPizza && <>
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
              Adicionar {formatToBRL((itemProduct?.quantity || 0) * (sumAdditionals + productPrice))}
            </div>
          </ProductDetailUi.ActionContainer>
        </section>
      </ProductDetailUi.ProductContainer>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const product = await ProductApi.get(params?.id);
  let pizzaProducts = []
  let categoryIsPizza = false;
  if (product?.categories) {
    const [{ id: categoryId, name }] = product.categories;
    categoryIsPizza = name.toLowerCase().includes('pizza');
    if (categoryIsPizza) {
      pizzaProducts = await ProductApi.listByCategory(String(categoryId));
    }
  }

  return {
    props: { ...product, pizzaProducts, categoryIsPizza }
  }
}