import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import * as act from "../../redux/actions";
import Card from "../../components/Card/Card"
import styles from "./ShoppingCart.module.css"
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";


//* las cards que vengan del home...
//! revisar la convergencia
const ShoppingCart = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const totalPrice = useSelector(state => state.total)
    const totalPrices = totalPrice.toFixed(2) 
    const history = useHistory()
    // const wholePart = Math.floor(totalPrice / 100);
    // const partDecimal = (totalPrice % 100).toString().padStart(2, '0');
    // const formattedTotalPrice = parseFloat(`${wholePart}.${partDecimal}`);
    const dataUser = JSON.parse(localStorage.getItem("user"));
    //console.log(dataUser);

    //! no deberia borrar si no hay nada, METER EL CAMBIO
    const handleRemove = () => {
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your cart has been deleted.',
              'success'
            )
            dispatch(act.clearCart())
          }
        })
    }

    const handleBuy = async () => {
        try {

          if (dataUser === null) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Please register or log in to make a purchase',
              showConfirmButton: false,
              timer: 2000
            })
            return 
          }
          if (cart.length === 0) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'The cart is empty',
              showConfirmButton: false,
              timer: 2000
            });
            //console.log(totalPrices == 0.00);
          } else if (totalPrices == 0.00) {
            //console.log("SIRVIOOO AAAAAA", totalPrices, cart, dataUser);
            dispatch(act.freeOrder(totalPrices, cart, dataUser));
            dispatch(act.clearCart())
            history.push("/library")
            //console.log("Free order dispatched");
          } else if (totalPrice > 0.00) {
            //console.log("NOOOOOOOOOO AAAAAAAA");
            dispatch(act.createOrder(totalPrices, cart, dataUser))
          }
        } catch (error) {
          console.error(error.message);
        }
      };

    return (
        <div >
            <br />
            <h2 className={styles.titleCarrito} >Shopping Cart</h2>
            <br />
            {cart.length === 0 ? (
                <div className={styles.container}>
                    <div className={styles.juegosContainer}>
                        <div className={styles.cajitaItems}>
                            <div className={styles.emptyCart}> 
                                <p> There are no games in the cart... </p>
                            </div>
                        </div>
                    </div>
                <div className={styles.cajitaResumen}>
                    <div className={styles.cajitaTotal}>
                        <h4 className={styles.titleCarrito}>TOTAL: $ {totalPrices} </h4>
                    </div>
                    <div className={styles.botones}> 
                        <button className={styles.botonBorrar} onClick={() => {handleRemove()}} disabled={cart.length === 0}>{/* poner icono para borrar todo del carrito */}Delete</button>
                        <button className={styles.botonComprar} onClick={() => {handleBuy()}}>Buy</button>
                    </div>
                </div>
            </div>
            ) : (
            <div className={styles.container}>
                <div className={styles.juegosContainer}>
                    <div className={styles.cajitaItems}>
                        {cart.map((game, i) => {
                            return (
                                <li className={styles.li} key={`${game.id} - ${i}`}>  
                                <Card
                                key={game.id} 
                                id={game.id}
                                name={game.name} 
                                image={game.image || game.capsule_image}
                                price={game.price_overview?.final || game.price || game.final_price}
                                />
                                </li>
                            )})
                        }
                    </div>
                </div>
                <div className={styles.cajitaResumen}>
                    <div className={styles.cajitaTotal}>
                        <h4 className={styles.titleCarrito}>TOTAL: ${totalPrices}</h4>
                    </div>
                    <div className={styles.botones}>
                        <button className={styles.botonBorrar} onClick={() => {handleRemove()}} disabled={cart.length === 0}>{/* poner icono para borrar todo del carrito */}Delete</button>
                        <button className={styles.botonComprar} onClick={() => {handleBuy()}}>Buy</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default ShoppingCart;