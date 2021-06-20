import styled from 'styled-components'
import { IStore } from '../@types/store';

interface IStoreNavbar {
    toggleModal: () => void
    store: IStore
}
const StoreNavbar = ({ store, toggleModal }: IStoreNavbar) => {
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
            if (
                timeNowToNumber > Number(start_hour.split(":").join("")) &&
                timeNowToNumber < Number(end_hour.split(":").join(""))
            ) { storeIsOpened = true; }
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

export default StoreNavbar;