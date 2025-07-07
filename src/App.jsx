import { useState, useEffect } from "react"
import { db } from "./data/db"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"

export default function App() {
    const initialBasket = () => {
        const localStorageBasket = localStorage.getItem('basket')

        return localStorageBasket ? JSON.parse(localStorageBasket) : []
    }

    // State for the guitars
    const [data] = useState(db)
    // State for the basket
    const [basket, setBasket] = useState(initialBasket)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket))
    }, [basket])

    function addToBasket(item) {
        const itemExists = basket.findIndex(guitar => guitar.id === item.id)

        if (itemExists >= 0) {
            if(basket[itemExists].quantity >= MAX_ITEMS) {
                return
            }

            const updatedbasket = [...basket]

            updatedbasket[itemExists].quantity++

            setBasket(updatedbasket)
        } else {
            item.quantity = 1

            setBasket([...basket, item])
        }
    }

    function removeFromBasket(id) {
        setBasket(prevBasket => prevBasket.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id) {
        const updatedBasket = basket.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }

            return item
        })

        setBasket(updatedBasket)
    }

    function decreaseQuantity(id) {
        const updatedBasket = basket.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }

            return item
        })

        setBasket(updatedBasket)
    }

    function clearBasket() {
        setBasket([])
    }

    return (
        <>
            <Header
                basket={basket}
                removeFromBasket={removeFromBasket}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearBasket={clearBasket}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Our Collection</h2>

                <div className="row mt-5">
                    {data.map((guitar) =>
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            setBasket={setBasket}
                            addToBasket={addToBasket}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}