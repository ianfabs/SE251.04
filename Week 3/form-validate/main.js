const d = document;
const form = {
    elem: d.querySelector("form"),
    fields: [],
    warningArea: d.querySelector("#info"),
    valid: false,
    inputValid : [],
};

const makeFlag = (type, title, content, elemId = '') => {
    if(type == 'warn' || type == 'okay' || type == 'err'){
        //ur good
    }else{ type="warn"}

    if(elemId != ''){
        console.log(`#${elemId}`);
        d.querySelector(`#${elemId}`).classList.add(type);
        
    }
    let Container = d.createElement("div");
    Container.classList.add("msg", type);
    let Icon = d.createElement("span");
    Icon.classList.add("icon");
    let Body = d.createElement("div");
    Body.classList.add("body");
    //Things in body
    let Title = (d.createElement("span"));
    Title.classList.add("title");
    Title.appendChild(d.createTextNode(title));
    let Content = d.createElement("div");
    Content.classList.add("content");
    Content.appendChild( d.createTextNode(content) );

    Container.appendChild(Icon);
    Body.appendChild(Title);
    Body.appendChild(Content);
    Container.appendChild(Body);
    form.warningArea.appendChild(Container);
}

form.fields = form.elem.querySelectorAll("input[type=text]");

form.fields.forEach( elem => {
    d.querySelector(`#${elem.id}`).onfocus = function(){
        this.className = '';
    }
} );

const handleIt = ()=>{
    let g = 0;
    
    while (form.warningArea.firstChild) {
        form.warningArea.removeChild(form.warningArea.firstChild);
    }
    form.fields.forEach( elem => {
        
        if(elem.value != ''){
            //good
            if(elem.id.includes("first")){
                //Should not have any extra characters
                if( elem.value.search( /[0-9!@#\$%\^\&*\)\(+=._-]+$/g ) == -1 ){
                    //No Weird Characters!
                    //Okay!
                    if(form.inputValid[0] == 'undefined' || form.inputValid[0] == null){
                        form.inputValid[0] = true;
                        g++;
                    }
                }else{
                    //Warn
                    makeFlag("warn", "Warning", `Please use only alphabetical characters in the ${elem.id} field`, elem.id);
                }
            }
            if(elem.id.includes("last")){
                //Should not have any extra characters
                if( elem.value.search( /[0-9!@#\$%\^\&*\)\(+=._-]+$/g ) == -1 ){
                    //No Weird Characters!
                    //Okay!
                    if(form.inputValid[1] == 'undefined' || form.inputValid[1] == null){
                        form.inputValid[1] = true;
                        g++;
                    }
                }else{
                    //Warn
                    makeFlag("warn", "Warning", `Please use only alphabetical characters in the ${elem.id} field`, elem.id);
                }
            }
            if(elem.id == "email" ){
                //Should have @ symbol and period
                if( elem.value.indexOf("@") != -1 && elem.value.indexOf(".") != -1){
                    //No Weird Characters!
                    //Okay!
                    let confirm = d.querySelector("#email-confirm");
                    if( confirm.value == elem.value ){
                        if(form.inputValid[2] == 'undefined' || form.inputValid[2] == null){
                            form.inputValid[2] = true;
                            g++;
                        }
                    }else{
                        makeFlag("warn", "Warning", `Please make sure both the ${elem.id} and ${confirm.id} fields match`, confirm.id);
                    }
                    
                }else{
                    //Warn
                    makeFlag("warn", "Warning", `Please use a valid email in the ${elem.id} field`, elem.id);
                }
            }
            if(elem.id.includes("phone")){
                //should be 10 characters
                if( elem.value.length == 10 ){
                    //good
                    if(elem.value.search( /[a-zA-Z!@#\$%\^\&*\)\(+=._-]+$/g ) == -1){
                        if(form.inputValid[3] == 'undefined' || form.inputValid[3] == null){
                            form.inputValid[3] = true;
                            g++;
                        }
                    }else{
                        makeFlag("warn", "Warning",`Please use numerical characters in the ${elem.id} field`, elem.id);
                    }
                    
                }else{
                    makeFlag("warn", "Warning",`Please use a 10 digit phone number in the ${elem.id} field`, elem.id);
                }
            }
        }else{
            //throw error
            makeFlag("err", "Error", `Please fill out the ${elem.id} form`, elem.id);
        }
    } );

    if(g >= 3){
        makeFlag("okay", "Okay!", "Oh... okay?");
    }
}