import Faq from "./components/Faq/Faq"
import Header from "./components/Header/Header"
import Materials from "./components/Materials/Materials"
import Input from "./components/input/Input"

function App() {
  return (
    <>
      <Header/>
      <Input placeholder='Email' />
      <Input placeholder='Введите пароль' />
      <Materials />
      <Faq />
    </>
  )
}

export default App
