import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { formatToBRL } from 'brazilian-values';
import { useRouter } from 'next/router'

import Layout from '../../components/layout'
import { useCart } from "react-use-cart";
import CheckboxUi from '../../components/ui/Checkbox';


const PRODUCT_MOCK = {
  title: "Bolsa de palha",
  id: "2",
  cod: 10,
  description: "Bolsa de Palha M, ideal para usar em ambientes abertos, com 3 divisórias sendo 2 externas e 1 interna.",
  price: 20,
  image: "https://a-static.mlcdn.com.br/618x463/bolsa-feminina-dhaffy-bege-divisorias-alca-de-mao-e-transversal-dhaffy-bolsas/dhaffybolsas/5703861364/1a5bdaa8a82b22de3dc2468583981810.jpg"
}

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


export default function ProductPage({ }) {
  const router = useRouter()
  const [productId, setProductId] = useState("");
  const [comment, setComment] = useState("");
  const [aditionals, setAditionals] = useState(ADITIONALS);
  const {
    // totalUniqueItems,
    // totalItems,
    // items,
    updateItemQuantity,
    addItem,
    getItem,
    updateItem
  } = useCart();
  const sumAdditionals = aditionals.map(d => d.checked && d.price || 0).reduce((ad, currentValue) => ad + currentValue)
  const itemProduct = getItem(productId);

  useEffect(() => {
    setProductId(`${Date.now()}-${PRODUCT_MOCK.id}`)
  }, []);

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
    router.back();
  }

  async function removeCartItem() {
    itemProduct && updateItemQuantity(productId, itemProduct?.quantity - 1)
  }

  function addCartItem() {
    if (itemProduct) {
      updateItemQuantity(productId, itemProduct?.quantity + 1)
    } else {
      addItem({
        ...PRODUCT_MOCK,
        aditionals,
        price: sumAdditionals + PRODUCT_MOCK.price,
        id: productId,
        comment
      })
    }
  }

  function goBackAction() {
    // params
    return ""
  }

  function handleChangeComment(event) {
    setComment(event.target.value)
  }
  return (
    <Layout goBackAction={goBackAction}>
      <ProductContainer>
        <HeaderSection>
          <img src={PRODUCT_MOCK.image} />
          <div>
            <h1>{PRODUCT_MOCK.title}</h1>
            <p>Cód: {PRODUCT_MOCK.cod}</p>
            <p>{PRODUCT_MOCK.description}</p>
          </div>
        </HeaderSection>
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
          <ActionContainer>
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
              Adicionar {formatToBRL((itemProduct?.quantity || 0) * (sumAdditionals + PRODUCT_MOCK.price))}
            </div>
          </ActionContainer>
        </section>
      </ProductContainer>
    </Layout>
  )
}



const HeaderSection = styled.section`
  display: flex;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  img {
    width: 9rem;
    height: 12rem;
    margin-right: 1rem;
    border-radius: 0.5rem;
  }
  h1 {
    font-size: 1rem;
    color:${({ theme }) => theme.colors.gray.dark};
  }
  p {
    font-size: 0.75rem;
    color:${({ theme }) => theme.colors.gray.dark};
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;
const ProductContainer = styled.div`
  section {
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.colors.gray.DEFAULT};
  }
  textarea {
    width: 100%;
    height: 7rem;
    padding: 1rem 1.5rem 0 1.5rem;
    box-sizing: border-box;
    border: 2px solid ${({ theme }) => theme.colors.gray.custom_ecommerce};
    border-radius: 0.75rem;
    background-color: white;
    font-size: 16px;
    resize: none;
    /* margin-top: 1rem; */
  }
  .section-title {
    background: ${({ theme }) => theme.colors.gray.custom_sending};
    color: ${({ theme }) => theme.colors.gray.dark};
    padding: 0.5rem 1rem;
  }
  
  .add-button {
    padding: 1rem 1.5rem;
    color: white;
    text-align: center;
    border-radius: 3rem;
    align-self: center;
    width: 100%;
    margin-left: 1rem;
  }

  .counter {
    align-self: center;
    div {
      padding: 0.25rem 0.75rem;
      background-color: ${({ theme }) => theme.colors.gray.custom_sending};
      border-radius: 0.5rem;
      font-size: 2rem;
    }
    span {
      padding: 1rem;
    }
  }
`;