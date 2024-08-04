let tx = document.getElementById('inf'), fetche=true, error=false, sandbox=false
function dofe() {
    let txr="", us_east = [], eu_west = [], us_west = [], gb = [], sg = [], au = [], st = [];
    fetch(`https://${sandbox?"api-sandbox.moomoo.io":"api.moomoo.io"}/servers?v=1.22`).then(e=>e.json()).then(e=>{
        e.forEach(e=>{
            if(e.region == "us-east") {
                us_east.push(e) //Miami
            } else if (e.region == "us-west") {
                us_west.push(e) //Silicon Valley
            }else if (e.region == "eu-west") {
                eu_west.push(e) //Frankfurt
            } else if (e.region == "gb") {
                gb.push(e) //London
            } else if (e.region == "sg") {
                sg.push(e) //singapore
            } else if (e.region == "au") {
                au.push(e) //sydney
            } else {
                st.push(e)
            }
        })
        us_east=us_east.sort((e,a)=>e.name<a.name?-1:e.name>a.name?1:0),eu_west=eu_west.sort((e,a)=>e.name<a.name?-1:e.name>a.name?1:0),us_west=us_west.sort((e,a)=>e.name<a.name?-1:e.name>a.name?1:0),gb=gb.sort((e,a)=>e.name<a.name?-1:e.name>a.name?1:0),sg=sg.sort((e,a)=>e.name<a.name?-1:e.name>a.name?1:0),au=au.sort((e,a)=>e.name<a.name?-1:e.name>a.name?1:0),st=st.sort((e,a)=>e.name<a.name?-1:e.name>a.name?1:0);
        let total = [us_east, eu_west, us_west, gb, au, sg, st]
        for(let i = 0, len = total.length; i<len ; ++i) {
            for(let t = 0, len = total[i].length; t<len; ++t) {
                if(t == 0) {
                    txr+=regionname(total[i][t].region)+":\n\n"
                }
                txr+=`Server: ${total[i][t].name}, PlayerCount: ${total[i][t].playerCount}, Key: ${total[i][t].key}, Region: ${total[i][t].region}${t==len-1?"\n\n":"\n"}`
            }
        }
        //txr = e
        txr = txr
        tx.innerText=txr
            
    }).catch(e=>{error=true,tx.innerText=e})
}
function regionname(e) {
    if(e == "us-east") {
        return "Miami"
    } else if (e == "us-west") {
        return "Silicon Valley"
    } else if (e == "eu-west") {
        return "Frankfurt"
    } else if (e == "gb") {
        return "London"
    } else if (e == "sg") {
        return "Singapore"
    } else if (e == "au") {
        return "Sydney"
    } else {
        return e
    }
}
dofe()
setInterval(() => {
    if(fetche) {
        dofe()
    }
}, 500)
addEventListener("keydown", function(e) {
    if(e.keyCode==90) {
        fetche=!fetche
    }
    if(e.keyCode == 82) {
        sandbox=!sandbox
    }
})