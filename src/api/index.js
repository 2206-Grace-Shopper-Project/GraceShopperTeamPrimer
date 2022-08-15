export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

// USER FUNCTIONS

// MOVIE FUNCTIONS

// CART FUNCTIONS

// ORDERS FUNCTIONS
export async function getUserOrders(userId) {
    try {
        const response = await fetch(`${BASE}/orders/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        console.log(token, 'token')
        const result = await response.json()
        return result
    } catch (error) {
        
    }

}

export async function getAllOrders() {
    
}