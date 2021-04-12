import Link from 'next/link'
import Layout from '../components/layout'
import { StyledShoppingCart } from '../components/Store';
import ShippingForm from '../components/ShippingForm';
import CheckboxUi from '../components/ui/Checkbox';
import CarrinhoUi from '../components/pages/carrinhoUi';
import { useState } from 'react';
import { useCart } from 'react-use-cart';
import { useRouter } from 'next/router';
import { IItemProduct } from '../@types/cart';
import { formatToBRL } from "brazilian-values"

export default function ProductPage({ }) {
  const [shippigType, setShippigType] = useState("");
  const { back, push } = useRouter()
  const {
    items,
    updateItemQuantity,
    getItem,
    isEmpty
  } = useCart();

  async function removeCartItem(productId, itemProduct) {
    updateItemQuantity(productId, itemProduct?.quantity - 1)
  }

  function addCartItem(productId, itemProduct) {
    updateItemQuantity(productId, itemProduct?.quantity + 1)
  }

  if (isEmpty) {
    return (
      <Layout>
        <CarrinhoUi.CartTitle>
          <StyledShoppingCart />
          <h1>Carrinho</h1>
        </CarrinhoUi.CartTitle>
        <h2 className="text-center">Seu carrinho está vazio</h2>
        <CarrinhoUi.FinishOrderButton onClick={back} className="gradient flex justify-center">
          Voltar para loja
        </CarrinhoUi.FinishOrderButton>
      </Layout>
    )
  }

  const products: IItemProduct[] = items?.map(product => {
    const itemProduct = getItem(product?.id);
    const checkedAditionals = itemProduct?.aditionals?.filter((aditional) => aditional?.checked)
    const subTotalValue = (itemProduct?.quantity * itemProduct?.sumAdditionals) + Number(itemProduct?.itemTotal);
    return {
      ...itemProduct,
      checkedAditionals,
      subTotalValue,
      itemProduct
    }
  })
  const totalCart = products.map(p => p.subTotalValue).reduce((accumulator, currentValue) => accumulator + currentValue)

  return (
    <Layout>
      <CarrinhoUi.CartTitle>
        <StyledShoppingCart />
        <h1>Carrinho</h1>
      </CarrinhoUi.CartTitle>
      {
        products?.map(product => (
          <CarrinhoUi.ProductCardCartContainer key={product.id}>
            <div className="action-buttons">
              <div onClick={() => addCartItem(product.id, product.itemProduct)}>
                <label className="gradient-color">+</label>
              </div>
              <span>{product?.quantity}</span>
              <div onClick={() => removeCartItem(product.id, product.itemProduct)}>
                <label className="gradient-color">-</label>
              </div>
            </div>
            <div className="orderDetail">
              <div className="flex justify-space-between product">
                <label>{product.itemProduct?.name}</label>
                <label>{formatToBRL(product.itemProduct?.itemTotal)}</label>
              </div>
              {product.checkedAditionals?.map((aditional) => (
                <div key={aditional?.id} className="flex justify-space-between additionals">
                  <label>{aditional?.title}</label>
                  <label>{formatToBRL(aditional?.price)}</label>
                </div>
              ))}
              {!product.checkedAditionals?.length && <br />}

              <div className="flex justify-space-between subtotal">
                <label>Subtotal</label>
                <label className="value">{formatToBRL(product.subTotalValue)}</label>
              </div>
              <div onClick={() => push(`product/${product?.id}/edit`)} className="edit-comment">
                <label>Editar</label>
              </div>
            </div>
          </CarrinhoUi.ProductCardCartContainer>
        ))
      }
      <CarrinhoUi.ShippingSection>
        <h2>Entrega</h2>
        <CheckboxUi
          onClick={() => setShippigType("pickInStore")}
          text="Retirar na loja"
          isChecked={shippigType === "pickInStore"}
        />
        <CheckboxUi
          onClick={() => setShippigType("address")}
          text="Entregar no meu endereço"
          isChecked={shippigType === "address"}
        />
        {
          shippigType === "address" && <ShippingForm />
        }
        <Link href="/">
          <a>Continue a comprar</a>
        </Link>
      </CarrinhoUi.ShippingSection>
      <CarrinhoUi.FinishOrderButton
        onClick={() => open("https://api.whatsapp.com/send/?phone=5571988362338&text&app_absent=0")}
        className="gradient flex justify-center"
      >
        Fechar Pedido {formatToBRL(totalCart)}
      </CarrinhoUi.FinishOrderButton>
    </Layout>
  )
}
