


function runGraphs(){
    
    function getMonthName(month){
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month%12];
    }

    function getLoadin(element){
        let cloneElement;
        if(element){
            cloneElement = element.querySelector(".js-loadin-demo");
        }
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
        if(cloneElement){
            cloneElement = cloneElement.cloneNode(true);
            cloneElement.classList.remove("js-loadin-demo");
            return cloneElement;
        }
        return;
    }
    
    function createBarGraphs(data){
        // Designed to work on one element for now. 
        // Design may be changed in feature for more dynamic behavior
        let barsElm = document.querySelector("#finance-performance-graph .bars");
        
        let cloneBar;
        if(barsElm){
            cloneBar = getLoadin(barsElm);
        }
        if(cloneBar){
            cloneBar = cloneBar.cloneNode(true);
           
            let month = 0;
            let size = 0;
            for(let barData of data){

                if(typeof barData.size != "undefined"){
                    size = barData.size;
                }
                barData.size = size;

                if(typeof barData.month != "undefined"){
                    month = barData.month - 1;
                } else {
                    month++;
                }
                barData.month = month;

                if(typeof barData.element == "undefined"){
                    barData.element = {};
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
                    barData.element.barGrow = barGrow;
                }
            }
        }
        return data;
    }

    async function runAnimation(elm, v){
        let animation = elm.animate([
            {height:v+"%"}
        ],{
            duration: 3000,
            interations: 1,
            easing: "ease",
            fill: "forwards"
        });

        await animation.finished;

        animation.commitStyles();
        animation.cancel();
    }
    
    function animateBars(bars, r){
        for(let bar of bars){
            if(!bar.element.barGrow) continue;
            runAnimation(bar.element.barGrow, Math.round(r * bar.size));
        }
    }
    
    let data = createBarGraphs([
        {size: 70, month: 7},
        {size: 45},
        {size: 38},
        {size: 50},
        {size: 75},
        {size: 85}
    ]);
    animateBars(data, 1);

    // for debug and usage
    window.runAnimation = runAnimation;
    window.getLoadin = getLoadin;
}

runGraphs();