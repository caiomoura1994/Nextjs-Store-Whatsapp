import React, { useState } from 'react'
import styled from 'styled-components'

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
`
const useModal = (Element: any) => {
  const [showModal, setShowModal] = useState(false)

  const toggle = () => setShowModal(!showModal)

  const Modal: any = props => {
    return (
      <StyledModal>
        <Element {...props} />
      </StyledModal>
    )
  }

  return [Modal, showModal, toggle]
}

export default useModal
