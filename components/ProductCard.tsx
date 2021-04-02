import styled from "styled-components"
import { formatToBRL } from "brazilian-values"

export default function ProductCard({ title, cod, description, price, image }) {
    return <ProductCardContainer>
        <img src={image} />
        <div className="card-body">
            <div>
                <p className="title">{title}</p>
                {cod && <p className="cod">Cód: {cod}</p>}
                <p>{description}</p>
            </div>
            <p className="price">{formatToBRL(price)}</p>
        </div>
    </ProductCardContainer>
}

const ProductCardContainer = styled.div`
    padding: 0.75rem;
    min-height: 8rem;
    margin: 1.5rem 0;
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