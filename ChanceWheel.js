
// var colours =['red','green','blue','cyan','magenta']
// var og_colours = [...colours];
var colourchoice =[];
var og_colours=[];
var randcols =[];
var colours =[]

function generate_chart(){
    colourchoice.length =0;
    for(i=1;i<11;i++){
        try{
            if (document.querySelector("#Colour"+String(i)).value !='' && document.querySelector("#Colour"+String(i)).value != 'null'){
                colourchoice.push(document.querySelector("#Colour"+i).value);
            }
        } 
        catch{
            // pass
        }
    }

    og_colours.length =0;
    og_colours.push(...colourchoice);
    first_draw();
}

function first_draw(){
    var possibilities = og_colours.length;
    choices(possibilities, 'NoRemove');
}

function Zero_remove(element){
    if(element.length !=0){
        return element;
    }
}
function Null_remove(element){
    return element != null && element !='';
}

function choices(possibilities, remove, index){
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
        randcols.length=0;

    }
    else if(remove=='NoRemove'){
        if(randcols.length>0){
            var possibilities =randcols.length;
            colours.length=0;
            colours.push(...og_colours);
            console.log(colours[index],'colindex');
            console.log(randcols[index],'radnindex');
            colours[index] =randcols[index];
            console.log(colours,'colouring');
            randcols.length=0;
        }
        else if(randcols.length ==0){
            console.log('madeit');
            colours =[];
            colours.push(...og_colours);
        }
    }

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

function ran_choice(){
    var num =Math.floor(Math.random()*colours.length);
    console.log(randcols,'randcols1');
    randcols.length=0;
    console.log(colours,'colors');
    randcols.push(...colours);
    randcols[num]="#8f8f8f";
    console.log(randcols,'randcols3');
    choices(colours.length,'NoRemove', num);
}
