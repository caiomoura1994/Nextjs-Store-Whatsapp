import styled from 'styled-components';

const HeaderSection = styled.section`
  display: flex;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  img {
    width: 9rem;
    height: 12rem;
    margin-right: 1rem;
    border-radius: 0.5rem;
    object-fit: cover;
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

export default {
  HeaderSection,
  ActionContainer,
  ProductContainer,
}