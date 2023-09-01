


function run(){
    
    function getMonthName(month){
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month%12];
    }
    
    function createBarGraphs(data){
        // Designed to work on one element for now. 
        // Design may be changed in feature for more dynamic behavior
        let barsElm = document.querySelector("#finance-performance-graph .bars");
        let cloneBar;
        if(barsElm){
            cloneBar = barsElm.querySelector(".bar-element");
        }
        if(cloneBar){
            cloneBar = cloneBar.cloneNode(true);
            while(barsElm.firstChild){
                barsElm.removeChild(barsElm.firstChild);
            }
            
            let bars = [];
            let month = 0;
            let size = 0;
    
            for(let barData of data){

                if(barData.month != undefined){
                    month = barData.month - 1;
                } else {
                    month++;
                }
                if(barData.size != undefined){
                    size = barData.size;
                }
    
                let bar = cloneBar.cloneNode(true);
    
                barsElm.appendChild(bar);
                
                let weekDay = bar.querySelector(".week-day");
                if(weekDay){
                    weekDay.innerText = getMonthName(month).toUpperCase().slice(0, 3);
                }
                let barGrow = bar.querySelector(".bar-grow");
                if(barGrow){
                    barGrow.style.height = "0%";
                }
                
                barData.size = size;
                barData.month = month;
                barData.elm = barGrow;
            }
        }
        return data;
    }

    function animateBars(bars, r){
        async function runAnimation(bar, v){
            let animation = bar.elm.animate([
                {height:v+"%"}
            ],{
                duration: 3000,
                interations: 1,
                easing: "ease",
                fill: "forwards"
            });

            await animation.finished;
            console.log("done")
            animation.commitStyles();
        }
        for(let bar of bars){
            if(!bar.elm) continue;
            runAnimation(bar, Math.round(r * bar.size));
        }
    }
    
    let data = createBarGraphs([
        {size: 40, month: 7},
        {},
        {size: 70},
        {},
        {size: 20},
        {size: 98}
    ]);
    animateBars(data, 1);
}

run();