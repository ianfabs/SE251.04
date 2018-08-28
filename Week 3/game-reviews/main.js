const reviews = [
    {"gameId":9,"gameTitle":"Overwatch","consoles":"PS4, XboxOne, PC","rating":"T","score":5,"imageName":"Overwatch.jpg"},
    {"gameId":10,"gameTitle":"Civilization VI","consoles":"PC","rating":"E10+","score":5,"imageName":"civ6.jpg"},
    {"gameId":11,"gameTitle":"NBA 2K17","consoles":"PS4, XboxOne, PC","rating":"E","score":5,"imageName":"NBA2k17.jpg"},
    {"gameId":12,"gameTitle":"TitanFall 2","consoles":"PS4, XboxOne, PC","rating":"M","score":5,"imageName":"Titanfall2.jpg"},
    {"gameId":13,"gameTitle":"Uncharted 4: a thief\'s end","consoles":"PS4","rating":"T","score":5,"imageName":"Uncharted4.jpg"},
    {"gameId":14,"gameTitle":"XCom 2","consoles":"PS4, XboxOne, PC","rating":"T","score":5,"imageName":"Xcom2.jpg"},
    {"gameId":15,"gameTitle":"Battlefield 1","consoles":"PS4, XboxOne, PC","rating":"M","score":5,"imageName":"Battlefield1.jpg"},
    {"gameId":16,"gameTitle":"Dark Souls 3","consoles":"PS4, XboxOne, PC","rating":"M","score":5,"imageName":"DarkSouls3.jpg"},
    {"gameId":17,"gameTitle":"Dishonored 2","consoles":"PS4, XboxOne, PC","rating":"M","score":5,"imageName":"DisHonored2.jpg"},
    {"gameId":18,"gameTitle":"Fire Emblem Fates: Conquest","consoles":"3DS","rating":"T","score":4,"imageName":"FireEmblemFates.jpg"},
    {"gameId":19,"gameTitle":"Forza Horizon 3","consoles":"XboxOne, PC","rating":"E","score":5,"imageName":"ForzaHorizon3.jpg"},
    {"gameId":20,"gameTitle":"Gears of War 4","consoles":"XboxOne, PC","rating":"M","score":5,"imageName":"GearsofWar4.jpg"},
    {"gameId":21,"gameTitle":"Call of Duty: Infinite Warfare","consoles":"XboxOne, PC","rating":"M","score":5,"imageName":"CoDIW.jpg"},
    {"gameId":22,"gameTitle":"Dead Rising 4","consoles":"XboxOne","rating":"M","score":5,"imageName":"DeadRising4.jpg"},
    {"gameId":23,"gameTitle":"Doom","consoles":"XboxOne, PC","rating":"T","score":5,"imageName":"Doom.jpg"},
    {"gameId":24,"gameTitle":"Fifa 17","consoles":"XboxOne, PC","rating":"E","score":5,"imageName":"FIFA17.jpg"},
    {"gameId":25,"gameTitle":"Madden NFL 17","consoles":"PS4, XboxOne, PC","rating":"E","score":4,"imageName":"Madden17.jpg"}
];
/*
@class Table(JSONObject obj, String ctx)
@param JSONObject obj `object, data for table`
@param String ctx `context`, the id of the table body
*/
class Table {
    constructor( obj, ctx ){
        this.raw = obj;
        //When called, should fill in the table with the data
        if(document.querySelector(ctx).tagName != "TBODY"){
            this.$ = document.querySelector(`${ctx} tbody`);
        }else this.$ = document.querySelector(ctx);

        this.raw.forEach( (elem) => {
            let tr = document.createElement("tr");

            for(var prop in elem){
                let td = document.createElement("td");
                let txt = document.createTextNode(elem[prop]);
                if(prop == 'gameTitle'){
                    let a = document.createElement("a");
                    a.appendChild(txt);
                    a.setAttribute("data-img", `./img/${elem.imageName}`);
                    a.setAttribute("data-title", `${elem.gameTitle}`);
                    a.className = 'review';
                    td.appendChild( a );
                    tr.appendChild(td);
                }else if(prop == 'imageName' || prop == 'gameId'){
                    continue;
                }else{
                    td.appendChild( txt );
                    tr.appendChild(td);
                }
            }

            this.$.appendChild(tr);
        } );

        document.querySelectorAll(".review").forEach( (el)=>{
            el.addEventListener("click", (e)=>{
                document.querySelector("#gameImage").setAttribute("src", e.target.getAttribute("data-img"));
                document.querySelector("#gameTitle").innerHTML = e.target.getAttribute("data-title");
            });
        } );
    }
}

var t = new Table(reviews, "#reviewsBody");