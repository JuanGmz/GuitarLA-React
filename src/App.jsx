import { useBasket } from "./hooks/useBasket"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"

export default function App() {
    const { data, basket, addToBasket, removeFromBasket, increaseQuantity, decreaseQuantity, clearBasket, isEmpty, basketTotal } = useBasket()

    return (
        <>
            <Header
                basket={basket}
                removeFromBasket={removeFromBasket}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearBasket={clearBasket}
                isEmpty={isEmpty}
                basketTotal={basketTotal}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Our Collection</h2>

                <div className="row mt-5">
                    {data.map((guitar) =>
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            addToBasket={addToBasket}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}