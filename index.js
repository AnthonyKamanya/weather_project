fetch('https://api.github.com/users/AnthonyKamanya/repos')
.then((response)=>{
    if(!response.ok){
        throw new Error("Sorry please try again");
    }
    return response.json()
})
.then((data)=>{
    console.log(data)
})
.catch((error)=>{
    console.log('An error occurred:', error)
})
.finally(()=>{})