import styled from 'styled-components'
import { IOpeninghour } from '../@types/store';


interface IOpenedHoursModal {
  toggleModal: () => void
  openinghours: IOpeninghour[]
}
const OpenedHoursModal = ({ toggleModal, openinghours }: IOpenedHoursModal) => {
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

const OpenedHoursModalStyle = styled.div`
border-radius: 1rem;
width: 90%;
background: ${({ theme }) => theme.colors.white.DEFAULT};
z-index: 99;
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

export default OpenedHoursModal;