import { create } from 'zustand'
// import { createJSONStorage } from 'zustand/middleware';

const store = () => {

}

const cartStore = create() (
    persist (store, {
        name: 'cart-store',
        // storage: createJSONStorage(() => sessionStorage),  (This is for Session Storage)
    })
)