import styled, { css } from 'styled-components'
import { IOpeninghour, IStore } from '../@types/store';

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
    background: #5BD590;
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
        object-fit: cover;
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
            border-radius: 1rem;
            background: ${({ theme, }) => theme.colors.red.DEFAULT};
            color: ${({ theme }) => theme.colors.white.DEFAULT};
            &--opened {
              background: ${({ theme }) => theme.colors.blue.dark};
              color: ${({ theme }) => theme.colors.white.DEFAULT};
            }
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
interface IStoreNavbar {
  toggleModal: () => void
  store: IStore
}
export const StoreNavbar = ({ store, toggleModal }: IStoreNavbar) => {
  const days = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
  const d = new Date();
  const dayName = days[d.getDay()];
  console.log(dayName)
  const filterIfTodayIsAvailabel = store.openinghours.filter(hour => hour.day_of_week === dayName);
  let storeIsOpened = false;

  if (filterIfTodayIsAvailabel.length > 0) {
    console.log('filterIfTodayIsAvailabel', filterIfTodayIsAvailabel)
    const [{ start_hour, end_hour }] = filterIfTodayIsAvailabel;
    const timeNowToNumber = Number(`${d.getHours()}${d.getMinutes()}`);
    if (start_hour && end_hour) {
      if (timeNowToNumber > Number(start_hour.split(":").join(""))) { storeIsOpened = true; }
      if (timeNowToNumber < Number(end_hour.split(":").join(""))) { storeIsOpened = true; }
    }
  }

  return <StoreNavbarStyles>
    {/* <div className="cover" /> */}
    <img alt="image" className="avatar" src={store?.photo || "https://guiasalvadoronline.com.br/images/usr/227dac6da7.jpg"} />
    <div className="title">
      <h1>{store?.establishment_name}</h1>
      <h2>{store?.description}</h2>
    </div>
    <div className="actions">
      <span className={`chip ${storeIsOpened && "chip--opened"}`}>{storeIsOpened ? "Aberto" : "Fechado"}</span>
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

interface IOpenedHoursModal {
  toggleModal: () => void
  openinghours: IOpeninghour[]
}
export const OpenedHoursModal = ({ toggleModal, openinghours }: IOpenedHoursModal) => {
  return <OpenedHoursModalStyle>
    <div className="container">
      <p className="center title">Horários de Funcionamento</p>
      {openinghours?.filter((o) => o.start_hour).map(({ start_hour, end_hour, day_of_week }) =>
        <div className="days-hours">
          <span>{day_of_week}</span> <span className="hour">{`${start_hour} às ${end_hour}`}</span>
        </div>
      )}
    </div>
    <div className="center ok-button gradient" onClick={toggleModal}>
      Ok
    </div>
  </OpenedHoursModalStyle>

};