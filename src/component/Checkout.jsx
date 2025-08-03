import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formating";
import Button from "./UI/button";
import { UserProgressContext } from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Input from "./Input";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, isLoading:isSending, error, sendRequest,clearData} = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish(event) {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    // fetch("https://example.com/api/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData,
    //     },
    //   }),
    // });
  }
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button >Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span className="center">Sending Order...</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order has been submitted succesfully</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount :{currencyFormatter.format(cartTotal)}</p>
      
      <Input label="Full Name" type="text" id="name" />
      <Input label="E-Mail Address" id="email" type="email" />
      <Input label="Street" id="street" type="text" />
      <div className="control-row">
        <Input label="Postal Code" type="text" id="postal-code" />
        <Input label="City" type="text" id="city" />
      </div>
      {error && <Error title="Failed to send order" message={error} />}
      <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
