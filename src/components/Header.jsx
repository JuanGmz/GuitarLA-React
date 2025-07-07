import { useMemo } from "react"

export default function Header({ basket, removeFromBasket, increaseQuantity, decreaseQuantity, clearBasket }) {
    // Derived state
    const isEmpty = useMemo(() => basket.length === 0, [basket])

    const basketTotal = useMemo(() => basket.reduce((total, item) => total + (item.quantity * item.price), 0), [basket])

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="./img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>

                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="./img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">Your basket is empty</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {basket.map(guitar => (
                                                    <tr key={guitar.id}>
                                                        <td>
                                                            <img className="img-fluid" src={`./img/${guitar.image}.jpg`} alt={`Guitar ${guitar.name}`} />
                                                        </td>
                                                        <td>{guitar.name}</td>
                                                        <td className="fw-bold">${guitar.price}</td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(guitar.id)}
                                                            >
                                                                -
                                                            </button>
                                                            <span>{guitar.quantity}</span>
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(guitar.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromBasket(guitar.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <p className="text-end">Total: <span className="fw-bold">${basketTotal}</span></p>

                                        <button
                                            className="btn btn-dark w-100 mt-3 p-2"
                                            onClick={clearBasket}
                                        >
                                            Delete Basket
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}