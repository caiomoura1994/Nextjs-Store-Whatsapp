import styled, { css } from 'styled-components'

export const CategorySectionTitle = styled.div`
  padding-top: 2.25rem;
  p {    
    font-size: 1.25rem;
    color:${({ theme }) => theme.colors.green.light};
    margin-bottom: 4px;
  }
  div {
    margin-bottom: 1rem;
    height: 2px;
    width: 80px;
    background: ${({ theme }) => theme.colors.green.light};
  }
`;

export const ProductList = styled.div`
  padding: 1.5rem 1.25rem 1.5rem 1.25rem;
  ${CategorySectionTitle}:first-child {
    padding-top: 0;
  }
  background: ${({ theme }) => theme.colors.gray.light};
`;

export const FavCartButton = styled.div`
  height: 3rem;
  width: 3rem;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  place-content: center;
  span {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    background: ${({ theme }) => theme.colors.green.light};
    text-align: center;
    border-radius: 50%;
    color: white;
    font-size: 0.75rem;
    padding: 0.1rem 0.4rem;
  }
`;

export const StyledShoppingCart = styled.i`
  & {
    color: white;
    display: block;
    box-sizing: border-box;
    position: relative;
    transform: scale(var(--ggs, 1));
    width: 20px;
    height: 21px;
    background: linear-gradient(to left, currentColor 12px, transparent 0) no-repeat -1px 6px/18px 2px,
      linear-gradient(to left, currentColor 12px, transparent 0) no-repeat 6px 14px/11px 2px,
      linear-gradient(to left, currentColor 12px, transparent 0) no-repeat 0 2px/4px 2px,
      radial-gradient(circle, currentColor 60%, transparent 40%) no-repeat 12px 17px/4px 4px,
      radial-gradient(circle, currentColor 60%, transparent 40%) no-repeat 6px 17px/4px 4px;
  }
  &::after,
  &::before {
    content: '';
    display: block;
    position: absolute;
    box-sizing: border-box;
    width: 2px;
    height: 14px;
    background: currentColor;
    top: 2px;
    left: 4px;
    transform: skew(12deg);
  }
  &::after {
    height: 10px;
    top: 6px;
    left: 16px;
    transform: skew(-12deg);
  }
`

export const CategoriesList: any = styled.div`
  overflow: auto;
  /* padding: 0.25rem 0; */
  white-space: nowrap;
  position: ${({ show }: any) => !show && "sticky"};
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  a {
    display: inline-block;
    text-decoration: none;
    p {
        font-size:1rem;
        padding: 0.25rem 1rem;
        border: solid;
        border-width: 0;
        border-bottom-width: 0.15rem;
    }
  }
  ${({ theme, slug }: any) => {
    const { gray, green } = theme.colors;
    return css`
      color: ${gray.DEFAULT};
      border-color: ${gray.DEFAULT};
      .category-${slug}{
          color: ${green.light};
          border-color: ${green.light};
      }
    `
  }}
`;
