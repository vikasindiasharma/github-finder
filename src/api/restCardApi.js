const baseUrl = 'http://localhost:3001/cards/';

 async function handleResponse(response) {
    if (response.ok) return response.json();
    if (response.status === 400) {  
      const error =  await response.text();
      throw new Error(error);
    }
    throw new Error("Network response was not ok.");
  } 
  
  function handleError(error) {  
    console.error("API call failed. " + error);
    throw error;
  }

export function getCards() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getCardByName(nameWithOwner) {
  return fetch(baseUrl + '?nameWithOwner='+ nameWithOwner)
    .then(handleResponse)
    .catch(handleError);
}

export async function saveCard(card) {

  let result = await saveCard_temp(card);
 return result; 
}

export function saveCard_temp(card) {


  return fetch(baseUrl , {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(card)
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function removeCard(nameWithOwner) {

  let cardid=-1;
  let cards =await getCardByName(nameWithOwner);  
  if ( cards && cards.length >0 )
  {
  cardid = cards[0].id ;
  }
  return fetch(baseUrl +  cardid , { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);

}
