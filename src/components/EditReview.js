import React from "react"


// Add this to the API Index after the Merge
const BASE = `https://radiant-citadel-20620.herokuapp.com/api`

async function editReview (token, id, review){
    try {
    const response = await fetch(`${BASE}/reviews/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
            review
        }),
    });
    const result = await response.json();
    return result;
    } catch (error) {
        console.error;
    }
}

// end "Add this to the API Index after the Merge"




const EditReview = ({setIsShown, token, reviewId }) => {
    let id = reviewId
    console.log(id,"with cameo by penn gilette")
  const handleSubmit = async (event) => {
    event.preventDefault();
    const review = event.target[0].value
    await editReview(token, id, review)
    setIsShown(false)
  };

    return (
        <div>
            <b>Edit Reviews page</b>
            <form onSubmit={handleSubmit}>
                <label>New Review</label>
                <input id="newReview" required/>
                <button type="submit">Update Your Review</button>
            </form>
            
        </div>
    )
}

export default EditReview