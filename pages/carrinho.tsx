import Link from 'next/link'
import Layout from '../components/layout'
import { StyledShoppingCart } from '../components/Store';
import ShippingForm from '../components/ShippingForm';
import CheckboxUi from '../components/ui/Checkbox';
import CarrinhoUi from '../components/pages/carrinhoUi';
import { useState } from 'react';
import { useCart } from 'react-use-cart';
import ProductApi from '../services/ProductApi';



export default function ProductPage({ }) {
  const [shippigType, setShippigType] = useState("");
  const {
    totalUniqueItems,
    totalItems,
    items,
    removeItem,
    updateItemQuantity,
    addItem,
    getItem,
    updateItem
  } = useCart();

  async function removeCartItem(productId, itemProduct) {
    updateItemQuantity(productId, itemProduct?.quantity - 1)
  }

  function addCartItem(productId, itemProduct) {
    updateItemQuantity(productId, itemProduct?.quantity + 1)
  }
  return (
    <Layout>
      <CarrinhoUi.CartTitle>
        <StyledShoppingCart />
        <h1>Carrinho</h1>
      </CarrinhoUi.CartTitle>
      {items?.map(product => {
        const itemProduct = getItem(product?.id);
        console.log(itemProduct)
        const checkedAditionals = itemProduct?.aditionals?.filter((aditional) => aditional?.checked)
        return (
          <CarrinhoUi.ProductCardCartContainer key={product.id}>
            <div className="action-buttons">
              <div onClick={() => addCartItem(product.id, itemProduct)}>
                <label className="gradient-color">+</label>
              </div>
              <span>{product?.quantity}</span>
              <div onClick={() => removeCartItem(product.id, itemProduct)}>
                <label className="gradient-color">-</label>
              </div>
            </div>
            <div className="orderDetail">
              <div className="flex justify-space-between product">
                <label>{itemProduct?.name}</label>
                <label>{itemProduct?.itemTotal}</label>
              </div>
              {checkedAditionals?.map((aditional) => (
                <div key={aditional?.id} className="flex justify-space-between additionals">
                  <label>{aditional?.title}</label>
                  <label>{aditional?.price}</label>
                </div>
              ))}
              {!checkedAditionals?.length && <br />}

              <div className="flex justify-space-between subtotal">
                <label>Subtotal</label>
                <label className="value">{(itemProduct?.quantity * itemProduct?.sumAdditionals) + Number(itemProduct?.itemTotal)}</label>
              </div>
              <div className="edit-comment">
                <label>Editar</label>
              </div>
            </div>
          </CarrinhoUi.ProductCardCartContainer>
        )
      })}
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
        Fechar Pedido R$1080,00
      </CarrinhoUi.FinishOrderButton>
    </Layout>
  )
}
