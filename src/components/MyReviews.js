import React, { useEffect } from "react";

// Will Need to Go to the API Index after the Merge
const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

async function getMyReviews(userId, token){
    try {
        const response = await fetch(`${BASE}/reviews/user/${userId}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });
          const result = await response.json();
          return result;
    } catch (error) {
        console.error;
    }
}




// end of "Will Need to go in API index after Merge"

const MyReviews = () => {
    const [currentUserData, setCurrentUserData] = useState(grabUser());

    useEffect(() => {
        const userId = currentUserData.id
        getMyReviews(userId)
    }, [])

    return (
        <div>
            <p>My Reviews Page</p>

        </div>
    )
}

export default MyReviews