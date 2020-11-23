
var colours =['red','green','blue','cyan','magenta']
var og_colours = [...colours];

function first_draw(){
    console.log(og_colours);
    var possibilities = og_colours.length;
    console.log(possibilities);
    choices(possibilities, 'NoRemove');
}
function Null_remove(element){
    return element != null && element !='';
}

function choices(possibilities, remove){
    var canvas = document.querySelector("#ChanceWheel");
    var dimensions =500;
    var fullcircle =2;
    canvas.height = dimensions;
    canvas.width =dimensions;
    var x_loc = Math.round(dimensions/2);
    var y_loc = Math.round(dimensions/2);
    var ctx = canvas.getContext('2d');

    if (remove =='RemoveOne'){
        remove = Math.floor(Math.random()*colours.length);
        delete colours[remove];
        colours = colours.filter(Null_remove);
        var possibilities =colours.length;  
    }
    else if(remove=='NoRemove'){
        colours =[...og_colours];
    }
    // var possibilities = colours.length;
    console.log(possibilities,'poss');
    for(i=0; i<possibilities; i++){ 
        
        ctx.fillStyle =colours[i];
        ctx.beginPath();
        ctx.lineTo(x_loc,y_loc);
        ctx.arc(x_loc, y_loc, Math.round(canvas.height/4), Math.PI*((i/possibilities)*fullcircle), Math.PI*(((i+1)/possibilities)*fullcircle)); 
        ctx.lineTo(x_loc,y_loc);
        ctx.closePath();
        ctx.fill();
        
    }
    
    
}
