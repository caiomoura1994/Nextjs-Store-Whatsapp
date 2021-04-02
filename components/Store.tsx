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

export const CategoriesList: any = styled.div`
  overflow: auto;
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
      .${slug}{
          color: ${green.light};
          border-color: ${green.light};
      }
    `
  }}
`;

const StoreNavbarStyles = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    /* background-image: url("https://i.stack.imgur.com/jRLAt.png"); */
    background-repeat: no-repeat;
    background-size: contain;
    background-position-y: 0px;
    .cover {
        width: 100%;
        height: 6rem;
        /* background-image: url("https://i.stack.imgur.com/jRLAt.png"); */
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
        background-size: cover;
    }
    .avatar {
        height: 7rem;
        width: 7rem;
        margin: 1rem;
        border-radius: 50%;
        border-width: 1px;
        margin-top: 2rem;
        border: solid;
        border-color: white;
        border-width: 2px;
    }
    .title {
        margin-bottom: 1.5rem;
        h1 {
            font-size: 1rem;
            color:${({ theme }) => theme.colors.green.light};
            font-weight: 400;
        }
        h2 {
            font-size: 0.75rem;
            color: ${({ theme }) => theme.colors.gray.DEFAULT};
            margin-bottom: 4px;
            font-weight: 400;
        }
    }
    .actions {
        .chip {
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            background: ${({ theme }) => theme.colors.red.DEFAULT};
            color: ${({ theme }) => theme.colors.white.DEFAULT};
        }
        .hour {
            padding: 1rem;
            color: ${({ theme }) => theme.colors.blue.DEFAULT};
        }
        .arrow-down {
            border: solid;
            border-color: ${({ theme }) => theme.colors.blue.DEFAULT};
            border-width: 0 2px 2px 0;
            display: inline-block;
            padding: 0.2rem;
            vertical-align: 0.1rem;
            margin-left: 0.2rem;
            /* transform: rotate(45deg); */
            /* -webkit-transform: rotate(45deg); */
        }
    }
`;

export const StoreNavbar = ({ toggleModal }) => {
  return <StoreNavbarStyles>
    {/* <div className="cover" /> */}
    <img className="avatar" src="https://guiasalvadoronline.com.br/images/usr/227dac6da7.jpg" />
    <div className="title">
      <h1>MOOI Modas</h1>
      <h2>Moda para todxs.</h2>
    </div>
    <div className="actions">
      <span className="chip">Fechado</span>
      <span onClick={toggleModal} className="hour">Ver horários <i className="arrow-down"></i></span>
    </div>
  </StoreNavbarStyles>
};

const OpenedHoursModalStyle = styled.div`
  border-radius: 1rem;
  width: 90%;
  background: ${({ theme }) => theme.colors.white.DEFAULT};
  div {
    font-size: 1rem;
  }
  .container {
    padding: 2rem 1rem;
  }
  .center {
    text-align: center;
  }
  .title {
    margin-bottom: 2rem;
  }
  .days-hours {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0.5rem;
    border: solid;
    border-width: 0;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.colors.gray.custom_ecommerce};
  }
  .hour {
    padding: 0.5rem 1rem;
    border-width: 1px;
    border: solid;
    border-color: ${({ theme }) => theme.colors.gray.light};
    border-radius: 1rem;
    margin: 0.25rem;
  }
  .ok-button {
    padding: 1rem;
    width: 100%;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    color: #fff;
    font-size: 1.5rem;
  }
`;

export const OpenedHoursModal = ({ toggleModal }) => {
  return <OpenedHoursModalStyle>
    <div className="container">
      <p className="center title">Horários de Funcionamento</p>
      <div className="days-hours">
        <span>Domingo</span> <span className="hour">18:00 às 23:00</span>
      </div>
      <div className="days-hours">
        <span>Terça</span> <span className="hour">18:00 às 21:00</span>
      </div>
      <div className="days-hours">
        <span>Quarta</span> <span className="hour">18:00 às 23:00</span>
      </div>
      <div className="days-hours">
        <span>Quinta</span> <span className="hour">18:00 às 23:00</span>
      </div>
      <div className="days-hours">
        <span>Sexta</span> <span className="hour">18:00 às 23:00</span>
      </div>
      <div className="days-hours">
        <span>Sábado</span> <span className="hour">18:00 às 23:00</span>
      </div>
    </div>
    <div className="center ok-button gradient" onClick={toggleModal}>
      Ok
    </div>
  </OpenedHoursModalStyle>

};