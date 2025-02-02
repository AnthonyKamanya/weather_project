fetch('https://api.github.com/users/AnthonyKamanya/repos',GET)
.then((response)=>{
    if(!response.ok){
        alert("Sorry please try again")
    }
    return response.json
})
.catch(()=>{})
.finally(()=>{})