import styled from 'styled-components';

const FinishOrderButton = styled.div`
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
padding-bottom: 10rem;
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

export default {
    FinishOrderButton,
    CartTitle,
    ShippingSection,
    ProductCardCartContainer,
}