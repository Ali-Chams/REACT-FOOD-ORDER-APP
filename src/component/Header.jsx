import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/button";
import CartContext from "../store/CartContext";
import { UserProgressContextProvider,UserProgressContext } from "../store/UserProgressContext";
export default function Header() {
  const cartCtx = useContext(CartContext);
  const UserProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberofItems, items) => {
    return totalNumberofItems + items.quantity;
  }, 0);
  function handleShowCart() {
    UserProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>REACT RESTAURANT</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
