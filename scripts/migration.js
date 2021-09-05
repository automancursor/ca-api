let data = require("./data.json");
data = data["工作表1"];
const axios = require("axios");

const sendRequest = async (data) => {
    try{
        const result = await axios(`https://v2.api.cvac.net.au/Authenticate/admin_add_user`,{
            data: data,
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQkJXIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IkIyMjY5OEI4LTQyQTItNDExNS05NjMxLTFDMkQxRTJBQzVGNyIsImp0aSI6IjBkZDAzZDAyLWViNDItNDhiMy1hOGQwLTdkOWY4NzUyMDliYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjIwMDE3ODYyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDEifQ.ZQFxy5pdiMuA9Svd0yNo-9DUAIXAySukJu6fznqG-V4"
            }
        })
        return result;
    }catch (e) {
        console.log( e )
    }
}

const list = Object.keys(data);
const migrate = async () =>{
    for(let key in data){
        const refererIndex = parseInt(data[key]["referrerId"]);
        if(!refererIndex){
            console.log("=========== NO referer !!!!! =========" )
            continue;
        }
        // console.log(list[refererIndex - 1])
        try{
            await sendRequest(
                {
                    "Password": "Cva@66666",
                    "PayPassword": "123123",
                    "Username": data[key].username.replace(/ /g,""),
                    "ReferrerName": data[ data[key].referrerId ].username.replace(/ /g,""),
                    "Cva": data[key]["cva"],
                    "Mobile": data[key]["mobile"].charAt(0) == "4" ? `+61${data[key]["mobile"]}`:`+86${data[key]["mobile"]}`,
                    "Email": data[key]["email"]
                }
            )
        }
        catch (e) {
            return;
        }

    }
}

migrate();
