var myPoem = {
    text: "",
    author: ""
}
var myLife;

if(myLife === myPoem && myPoem.author == me){
    try{
        myLife.live();
        myLife.utterIt();
    }catch(e){
        console.log("You cannot execute the .live() and .utterit() functions in the same scope")
    }finally{
        myLife.live();
    }
}