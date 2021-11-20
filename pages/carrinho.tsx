import Link from 'next/link'
import Layout from '../components/layout'
import { StyledShoppingCart } from '../components/Store';
import ShippingForm from '../components/ShippingForm';
import CheckboxUi from '../components/ui/Checkbox';
import CarrinhoUi from '../components/pages/carrinhoUi';
import { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import { useRouter } from 'next/router';
import { IItemProduct } from '../@types/cart';
import { formatToBRL, formatToPhone, isPhone } from "brazilian-values"
import { useForm } from 'react-hook-form';
import ViaCep from '../services/ViaCep';
import Input from '../components/ui/Input';
import { generateWhatsappText } from '../utils/whatsappText';
import { IStore } from '../@types/store';

export default function ProductPageCart({ }) {

  const [storeData, setStoreData] = useState<Partial<IStore>>({});
  const [shippigType, setShippigType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const { back, push } = useRouter()

  useEffect(() => {
    setStoreData(JSON.parse(localStorage.getItem("storeData")))
  }, [])
  const {
    items,
    updateItemQuantity,
    getItem,
    removeItem,
    isEmpty
  } = useCart();
  const formContext = useForm();

  const [cep, phone, thing] = formContext.watch(['cep', 'phone', 'thing']);
  console.log('items:', items);
  const products: IItemProduct[] = items?.map(product => {
    const itemProduct = getItem(product?.id);
    const checkedAditionals = itemProduct?.aditionals?.filter((aditional) => aditional?.checked)
    // console.log('checkedAditionals', checkedAditionals)
    console.log('itemProduct?.quantity', itemProduct?.quantity)
    console.log('itemProduct?.sumAdditionals', itemProduct?.sumAdditionals)
    console.log('itemProduct?.itemTotal', itemProduct?.itemTotal)
    const subTotalValue = (itemProduct?.quantity * itemProduct?.sumAdditionals) + Number(itemProduct?.itemTotal);
    return {
      ...itemProduct,
      checkedAditionals,
      subTotalValue,
      itemProduct
    }
  })
  const totalCart = products?.length > 0 ? (
    products?.map(p => p.subTotalValue)?.reduce((accumulator, currentValue) => accumulator + currentValue)
  ) : 0;


  async function removeCartItem(productId, itemProduct) {
    if (itemProduct?.quantity === 1) {
      const haveSure = confirm("Tem certeza que quer excluir esse item ?");
      if (!haveSure) return;
      removeItem(itemProduct?.id);
    }
    itemProduct && updateItemQuantity(productId, itemProduct?.quantity - 1)
  }

  function addCartItem(productId, itemProduct) {
    updateItemQuantity(productId, itemProduct?.quantity + 1)
  }

  function sendWhatsappMessage(props) {
    console.log('props', props)
    if (!paymentMethod) return alert("Forma de pagamento inválida.")
    if (!props.thing && paymentMethod === 'money') return alert("Troco não informádo")
    if (!isPhone(props.phone)) return alert("Número de Telefone inválido.")
    if (!shippigType) return alert("Forma de entrega deve ser selecionada.")
    const whatsappText = generateWhatsappText({ ...props, total: totalCart, products, shippigType, storeData, paymentMethod })

    open(`https://api.whatsapp.com/send/?phone=55${storeData.phone_number}&text=${encodeURIComponent(whatsappText)}&app_absent=0`)
  }

  async function requestViaCep(cepParam) {
    if (cepParam?.length !== 8) return;
    const { erro, ...viaCepRecponse } = await ViaCep.get(cepParam);
    if (erro) return alert("Cep Não encontrado");
    formContext?.setValue('street', viaCepRecponse?.logradouro);
    formContext?.setValue('city', viaCepRecponse?.localidade);
    formContext?.setValue('neigbohood', viaCepRecponse?.bairro);
    formContext?.setValue('state', viaCepRecponse?.uf);
  }

  useEffect(() => {
    requestViaCep(cep);
  }, [cep])

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
              {product.selectedFlavors?.map((product, idxProduct) => (
                <div key={product?.id} className="flex justify-space-between additionals">
                  <label> {idxProduct + 1} - {product?.name}</label>
                </div>
              ))}
              {!product?.selectedFlavors?.length && <br />}
              {product.checkedAditionals?.map((aditional) => (
                <div key={aditional?.id} className="flex justify-space-between additionals">
                  <label>• {aditional?.description}</label>
                  <label>{formatToBRL(aditional?.price)}</label>
                </div>
              ))}
              {!product.checkedAditionals?.length && <br />}
              <div className="flex justify-space-between subtotal m-2">
                <label>Subtotal</label>
                <label className="value">{formatToBRL(product.subTotalValue)}</label>
              </div>
              {/* <div onClick={() => push(`product/edit/${product?.id}`)} className="edit-comment">
                <label>Editar</label>
              </div> */}
            </div>
          </CarrinhoUi.ProductCardCartContainer>
        ))
      }
      <CarrinhoUi.ShippingSection>
        <Input
          errors={formContext?.formState?.errors}
          {...formContext.register("name", { required: true })}
          id="name"
          label="Nome*"
        />
        <Input
          errors={formContext?.formState?.errors}
          {...formContext.register("phone", { required: true })}
          id="phone"
          label="Telefone*"
          value={phone}
          onChange={(event) => {
            formContext?.setValue('phone', formatToPhone(String(event.target.value)));
          }}
        />
        <h2>Entrega</h2>
        {storeData?.can_pick_up_in_store && <CheckboxUi
          onClick={() => setShippigType("pickInStore")}
          text="Retirar na loja"
          isChecked={shippigType === "pickInStore"}
        />}
        {storeData?.delivery && <CheckboxUi
          onClick={() => setShippigType("address")}
          text="Entregar no meu endereço"
          isChecked={shippigType === "address"}
        />}
        {
          shippigType === "address" && <ShippingForm formContext={formContext} />
        }
        <h2>Formas de pagamento</h2>
        <CheckboxUi
          onClick={() => setPaymentMethod("money")}
          text="Dinheiro"
          isChecked={paymentMethod === "money"}
        />
        {paymentMethod === "money" && <div className="thing-container">
          <h4>R$</h4>
          <Input
            errors={formContext?.formState?.errors}
            {...formContext.register("thing")}
            id="thing"
            label="Troco para quanto?*"
            value={thing}
            onChange={(event) => {
              formContext?.setValue('thing', String(event.target.value));
            }}
            type="number"
          />
        </div>}
        <CheckboxUi
          onClick={() => setPaymentMethod("creditCard")}
          text="Cartão"
          isChecked={paymentMethod === "creditCard"}
        />
        <CheckboxUi
          onClick={() => setPaymentMethod("pix")}
          text="Pix"
          isChecked={paymentMethod === "pix"}
        />
        <a href="#" onClick={back}>
          Continue a comprar
        </a>
      </CarrinhoUi.ShippingSection>
      <CarrinhoUi.FinishOrderButton
        onClick={formContext.handleSubmit(sendWhatsappMessage)}
        className="gradient flex justify-center"
      >
        Fechar Pedido {formatToBRL(totalCart)}
      </CarrinhoUi.FinishOrderButton>
    </Layout>
  )
}
