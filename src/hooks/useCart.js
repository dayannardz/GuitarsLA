import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

function initialCart() {
    const cart = localStorage.getItem('cart');

    if (cart) {
        return JSON.parse(cart);
    }

    return [];
}

export const useCart = () => {

    //const validCart = true;

    const [data, setData] = useState(db);

    //const [auth, setAuth] = useState(false);
    //const [total, setTotal] = useState(0);
    const [cart, setCart] = useState(initialCart);

    function handlerClick(item) {
        const guitarExists = cart.findIndex((guitar) => guitar.id === item.id);

        if (guitarExists >= 0) {
            const updatedCart = [...cart];
            updatedCart[guitarExists].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
        }
    }

    function disminuirCantidad(id) {
        const updatedCart = [...cart];
        const index = updatedCart.findIndex((guitar) => guitar.id === id);

        updatedCart[index].quantity--;

        if (updatedCart[index].quantity === 0) {
            updatedCart.splice(index, 1);

        }
        setCart(updatedCart);
    }

    function eliminarCantidad(id) {

        const updatedCart = cart.filter((guitar) => guitar.id !== id);
        setCart(updatedCart);
    }

    function aumentarCantidad(id) {
        const updatedCart = [...cart];
        const index = updatedCart.findIndex((guitar) => guitar.id === id);

        if (updatedCart[index].quantity < 5) {
            updatedCart[index].quantity++;
        }
        setCart(updatedCart);
    }

    function vaciarCarrito() {
        setCart([]);
    }


    //useMemo guarda en cache

    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    const total = useMemo(() => cart.reduce((total, guitar) => total + guitar.price * guitar.quantity, 0),
        [cart]
    );

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return {
        cart,
        data,
        isEmpty,
        total,
        handlerClick,
        disminuirCantidad,
        eliminarCantidad,
        aumentarCantidad,
        vaciarCarrito
    }
}

//mandar logica del header al hook