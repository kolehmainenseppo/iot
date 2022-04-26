document.querySelector("#ac_threshold").addEventListener("input", (e) => {

    th = Number.parseFloat(e.target.value)
    document.querySelector("#ac_threshold_value").innerHTML = th + " C"

})

document.querySelector("#ac_threshold").addEventListener("change", (e) => {
    th = Number.parseFloat(e.target.value)

    fetch("/setthreshold", {
        method:"POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({threshold: th}) 
    })
    .then((data) => console.log(data))
})



const getData = () => {

    fetch("/getdata")
    .then(res => res.json())
    .then(data => {
        console.log(data)

        document.querySelector("#temp").innerHTML = data.temperature
        document.querySelector("#humi").innerHTML = data.humidity
        
    })
    
    setTimeout(() => {
        getData()
    }, 1000);
}

getData()