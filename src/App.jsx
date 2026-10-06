import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useCart } from "./hooks/useCart";
//imports

function App() {
  const {
    cart,
    data,
    handlerClick,
    disminuirCantidad,
    eliminarCantidad,
    aumentarCantidad,
    vaciarCarrito
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        disminuirCantidad={disminuirCantidad}
        aumentarCantidad={aumentarCantidad}
        eliminarCantidad={eliminarCantidad}
        vaciarCarrito={vaciarCarrito}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              handlerClick={handlerClick}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;