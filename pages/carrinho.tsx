import styled from 'styled-components';
import Link from 'next/link'
import Layout from '../components/layout'
import { StyledShoppingCart } from '../components/Store';
import CheckboxUi from '../components/ui/Checkbox';


export default function ProductPage({ }) {
  return (
    <Layout>
      <CartTitle>
        <StyledShoppingCart />
        <h1>Carrinho</h1>
      </CartTitle>
      {[1, 2].map(() => (
        <ProductCardCartContainer>
          <div className="action-buttons">
            <div>
              <label className="gradient-color">+</label>
            </div>
            <span>1</span>
            <div>
              <label className="gradient-color">-</label>
            </div>
          </div>
          <div className="orderDetail">
            <div className="flex justify-space-between product">
              <label>Bolsa de Palha</label>
              <label>300,00</label>
            </div>
            <div className="flex justify-space-between additionals">
              <label>Ad. Strass</label>
              <label>30,00</label>
            </div>
            <div className="flex justify-space-between additionals">
              <label>Ad. Strass</label>
              <label>30,00</label>
            </div>
            <div className="flex justify-space-between subtotal">
              <label>Subtotal</label>
              <label className="value">360,00</label>
            </div>
            <div className="edit-comment">
              <label>Editar Comentário</label>
            </div>
          </div>
        </ProductCardCartContainer>
      ))}
      <ShippingSection>
        <h2>Entrega</h2>
        <CheckboxUi
          onClick={() => { }}
          text="Entregar no meu endereço"
        />
        <CheckboxUi
          onClick={() => { }}
          text="Retirar na loja"
        />
        <Link href="/">
          <a>{"Continue a comprar"}</a>
        </Link>
      </ShippingSection>
      <FinishOrderButton className="gradient flex justify-center">
        Fechar Pedido R$1080,00
      </FinishOrderButton>
    </Layout>
  )
}



const FinishOrderButton = styled.section`
  color: white;
  padding: 1.5rem;
  font-size: 1.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const CartTitle = styled.section`
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

const ShippingSection = styled.section`
  margin: 1rem;
  margin-bottom: 10rem;
  color: ${({ theme }) => theme.colors.gray.dark};
  h2 {
    font-weight: 400;
    margin-bottom: 1rem;
  }
  .container {
    margin-left: 1rem;
  }
  a {
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.colors.blue.DEFAULT};
    margin-top: 2rem;
  }
`;

const ProductCardCartContainer = styled.div`
  display: flex;
  margin: 0 1rem 1rem;
  -webkit-box-shadow: 0px 3px 6px 0px #00000029;
  -moz-box-shadow: 0px 3px 6px 0px #00000029;
  box-shadow: 0px 3px 6px 0px #00000029;
  padding: 0.5rem;
  border-radius: 0.75rem;
  .orderDetail {
    width: 100%;
    color: ${({ theme }) => theme.colors.gray.DEFAULT};
    margin: 0 0.5rem;
  }
  .product {
    font-weight: 600;
    color:${({ theme }) => theme.colors.gray.dark};
  }
  .edit-comment {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    label {
      padding: 0.5rem 2rem;
      border: solid;
      border-width: 1px;
      border-color: ${({ theme }) => theme.colors.gray.DEFAULT};
      color: ${({ theme }) => theme.colors.gray.DEFAULT};
      border-radius: 2rem;
    }
  }
  .additionals {
  }
  .subtotal {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray.dark};
    .value{
      color: ${({ theme }) => theme.colors.green.light};
    }
  }
  .action-buttons {
    text-align: center;
    div {
      background-color: #f4f4f4;
      font-size: 1.5rem;
      width: 3rem;
      text-align: center;
      border-radius: 1rem;
      margin: 0 0.25rem 0.5rem 0.25rem;
    }
  }
`;