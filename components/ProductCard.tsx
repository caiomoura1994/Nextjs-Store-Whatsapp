import styled from "styled-components"

export default function ProductCard({ }) {
    return <ProductCardContainer>
        <img src="https://a-static.mlcdn.com.br/618x463/bolsa-feminina-dhaffy-bege-divisorias-alca-de-mao-e-transversal-dhaffy-bolsas/dhaffybolsas/5703861364/1a5bdaa8a82b22de3dc2468583981810.jpg" />
        <div className="card-body">
            <div>
                <p className="title">Bolsa de Palha</p>
                <p className="cod">Cód: 85655</p>
                <p>Tamanho 50x80 cm</p>
            </div>
            <p className="price">R$ 300,0</p>
        </div>
    </ProductCardContainer>
}

const ProductCardContainer = styled.div`
    padding: 0.75rem;
    min-height: 8rem;
    margin: 0.75rem;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    -webkit-box-shadow: 0px 3px 6px 0px #00000029;
    -moz-box-shadow: 0px 3px 6px 0px #00000029;
    box-shadow: 0px 3px 6px 0px #00000029;
    img {
        width: 6rem;
        height: 7.5rem;
    }
    .title {
        font-size: 1rem;
        color:${({ theme }) => theme.colors.gray.dark};
    }
    .price {
        font-size: 1rem;
        color:${({ theme }) => theme.colors.green.light};
        font-weight: 500;
    }
    .cod {
        font-weight: 600;
    }
    .card-body {
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 0.75rem;
        font-size: 0.75rem;
        color:${({ theme }) => theme.colors.gray.DEFAULT};
    }
`;