import Header from "./component/Header";
import Meals from "./component/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContext,UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";

function App() {
  return (
    <UserProgressContextProvider>
    <CartContextProvider>
      <Header/>
      <Meals/>
      <Cart/>
      <Checkout/>
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
