import Header from "./components/containers/header";
import LogIn from "./scenes/login";
import Footer from"./components/containers/footer";
import Body from "./components/containers/body";

function App() {
  return (
    <Body>
      <Header/>
      <LogIn/>
      <Footer/>
    </Body>
  );

}

export default App;
