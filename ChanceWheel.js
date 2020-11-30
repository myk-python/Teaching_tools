

var colourchoice =[];
var og_colours=[];
var randcols =[];
var colours =[]
// Stylistic choice to force all blues to appear as one hue/shade
var blue =/blue/i;
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
    console.log("Hello");
    og_colours.push(...colourchoice);
    first_draw();
}

function first_draw(){
    var possibilities = og_colours.length;
    var cumulative_colours =[];
    for(i=0;i<possibilities;i++){
        for(j=0;j<possibilities;j++){
            if(og_colours[i]==og_colours[j]){
                if(!cumulative_colours.includes(og_colours[i])){
                    cumulative_colours.push(og_colours[i]);
                }
            }
        }
    }

    var table_row1 = document.querySelector("#ColoursNames");
    var table_row2 = document.querySelector("#Counts");
    table_row1.innerHTML='';
    table_row2.innerHTML='';
    
    
    for (i=0;i<cumulative_colours.length;i++){
        var table_colour = cumulative_colours[i];
        var TABLE_COLOUR = cumulative_colours[i];
        var blue = /blue/i;
        if (table_colour.match(blue)){
            table_colour = "#67ace0";
        }
        var name_cell = document.createElement("td");
        name_cell.setAttribute("style",`font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size:22pt; color:${table_colour}`);
        var count_cell = document.createElement("td");
        count_cell.setAttribute("id",`${TABLE_COLOUR}`);
        count_cell.setAttribute("style",`font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size:22pt; color:${table_colour}`)
        count_cell.innerHTML='0';
        name_cell.innerHTML=`${TABLE_COLOUR}`;
        table_row1.appendChild(name_cell);
        table_row2.appendChild(count_cell);
        
    }
    choices(possibilities, 'NoRemove');
    
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
            colours[index] =randcols[index];
            randcols.length=0;
        }
        else if(randcols.length ==0){
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
    randcols.length=0;
    randcols.push(...colours);
    var choice = og_colours[num];
    var CHOICE = choice
    choice = choice.toUpperCase();
    if(choice.match(blue)){
        choice ="#67ace0";

    }
    
    var label_css =`display: block; font-size: 30pt; font-weight: bold; font-family:Arial, Helvetica, sans-serif; margin-left: auto; margin-right: auto; text-align:center; background-color:#3e444d; color:${choice}`;
    document.querySelector("#Choice").setAttribute("style",label_css);
    document.querySelector("#Choice").innerHTML=CHOICE;
    setTimeout(function(){document.querySelector("#Choice").innerHTML=''}, 750);
    
    
    var choicecount= Number(document.querySelector(`#${og_colours[num]}`).innerHTML);
    choicecount++;
    document.querySelector(`#${og_colours[num]}`).innerHTML=String(choicecount);

    randcols[num]="white";


    choices(colours.length,'NoRemove', num);
}
