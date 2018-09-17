var standings = [
    { team: "Boston", wins: 81, losses: 62, percentage: 0.566 },
    { team: "New York", wins: 77, losses: 65, percentage: 0.542 },
    { team: "Baltimore", wins: 71, losses: 72, percentage: 0.497 },
    { team: "Tampa Bay", wins: 71, losses: 73, percentage: 0.493 },
    { team: "Toronto", wins: 66, losses: 77, percentage: 0.462 }
];

class BaseballScores extends HTMLElement {
    constructor() {
        super();
        var shadow = this.attachShadow({ mode: 'open' });
        var grid = document.createElement('div');
        grid.classList.add("grid");
        for(let col in standings[0]){
            let $column = document.createElement("span");
            $column.classList.add("column");
            $column.innerHTML = (col[0].toUpperCase() + col.slice(1)).bold();
            grid.appendChild($column);
        }
        for( let stat of standings){
            //let row = document.createElement("div");
            //row.classList.add("row");
            let {team,wins,losses,} = stat;
            for(let column in stat){
                let $column = document.createElement("span");
                $column.classList.add("column");
                if(wins > losses) $column.classList.add("winning");
                else $column.classList.add("loosing");
                $column.textContent = stat[column];
                grid.appendChild($column);
            }
            //grid.appendChild(row);
        }
        /* Create some CSS to apply to the shadow dom
        var style = document.createElement('style');
        style.textContent = ``;
        */
        //Append grid children
        //Attach to the shadow dom
        //shadow.appendChild(style);
        shadow.appendChild(grid);
        //Apply Styles
        shadow.querySelector('.grid').style.display = "grid";
        shadow.querySelector('.grid').style["grid-template-columns"] = "17vw repeat(2, 10vw) 15vw";
        shadow.querySelector('.grid').style["grid-row-gap"] = "1ch";
        shadow.querySelector('.grid').style["font-family"] = "'Helvetica', sans-serif";
        shadow.querySelectorAll('.column').forEach( (col)=>{
            col.style["border-bottom"] = "1px solid #c3c3c3";
            col.style["padding-bottom"] = "0.75vh";
        } );
        shadow.querySelectorAll(".winning").forEach( (col)=>{
            col.style.color = 'blue';
        });
        shadow.querySelectorAll(".loosing").forEach( (col)=>{
            col.style.color = 'red';
        });
    }
}
customElements.define('baseball-scores', BaseballScores);

