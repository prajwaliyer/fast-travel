import React from 'react'
import { GlobalStyle } from './components/styles/GlobalStyles';

const layout = ({children}) => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default layout