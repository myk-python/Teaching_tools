

var colourchoice =[];
var og_colours=[];
var randcols =[];
var colours =[]
var og_blue ='';
// Used for later stylistic choice to force all blues to appear as one hue/shade
var blue =/blue/i;
// Allows colour choices to be taken even if values are missing
function generate_chart(){
    colourchoice.length =0;
    for(i=1;i<11;i++){
        try{
            if (document.querySelector("#Colour"+String(i)).value !='' && document.querySelector("#Colour"+String(i)).value != 'null'){
                var cc =document.querySelector("#Colour"+String(i)).value;
                
                if (cc.match(blue)){
                    og_blue =cc;
                    colourchoice.push("#67ace0");
                }
                else if (!cc.match(blue)){
                    colourchoice.push(document.querySelector("#Colour"+i).value);
                }
            }
        } 
        
        
        catch{
            // pass
        }
       
    }
    // Keeps a copy of the original colours for redrawing after each choice
    og_colours.length =0;
    og_colours.push(...colourchoice);
    first_draw();
}

function first_draw(){
    var possibilities = og_colours.length;
    // Used to create table to display counts without repeating colour names
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
    // Each time the chart is redrawn, the tables need to be cleared
    // to prevent constant extension of the first row
    table_row1.innerHTML='';
    table_row2.innerHTML='';
    
    
    for (i=0;i<cumulative_colours.length;i++){
        var table_colour = cumulative_colours[i];
        var TABLE_COLOUR = cumulative_colours[i];
        // Changing default blue to another more visible hue/shade
        if (table_colour.match(blue)){
            table_colour = "#67ace0";
        }
        if (TABLE_COLOUR.match("#67ace0")){
            TABLE_COLOUR = og_blue;
            console.log(og_blue,'ogblue');
        }
        // Table contents are named after their respective properties
        // E.g. "Red" will be red, because it was chosen as a colour
        var name_cell = document.createElement("td");
        name_cell.setAttribute("style",`font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size:22pt; color:${table_colour}`);
        var count_cell = document.createElement("td");
        count_cell.setAttribute("id",`${TABLE_COLOUR}`);
        count_cell.setAttribute("style",`font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size:22pt; color:${table_colour}`)
        // Initalising each count at 0
        count_cell.innerHTML='0';
        name_cell.innerHTML=`${TABLE_COLOUR}`;
        table_row1.appendChild(name_cell);
        table_row2.appendChild(count_cell);
        
    }
    choices(possibilities, 'NoRemove');
    
}
// Tidy the colours array as needed
// Only used by the removal function
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

    // No longer used in this implementation
    // Can be used to remove a colour and have the chart redrawn with 
    // all other proportions enlarged to an equal extent
    if (remove =='RemoveOne'){
        remove = Math.floor(Math.random()*colours.length);
        delete colours[remove];
        colours = colours.filter(Null_remove);
        var possibilities =colours.length;  
        randcols.length=0;

    }
    // Change the colour to white in a given part of the pie chart
    else if(remove=='NoRemove'){
        if(randcols.length>0){
            var possibilities =randcols.length;
            colours.length=0;
            colours.push(...og_colours);
            // If a random choice was made, will change the colour to white
            colours[index] =randcols[index];
            randcols.length=0;
        }
        // Drawing the chart for the first time, or redrawing it
        // will not add a white segment
        else if(randcols.length ==0){
            colours =[];
            colours.push(...og_colours);
        }
    }
    // Draws the chart for first draw and redraws each time
    // a random segment is chosen
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
// Randomly chooses which colour to change to white
// (see above)
function ran_choice(){
    var num =Math.floor(Math.random()*colours.length);
    randcols.length=0;
    randcols.push(...colours);
    // Need two choices so that default blue can be changed
    var choice = og_colours[num];
    var CHOICE = choice
    // Prevents changing the table title to the blue hex code
    // Also maintains "blue" as user entered it
    if(choice.match("#67ace0")){
        CHOICE =og_blue;
        choice ="#67ace0";
        og_colours[num] =og_blue;

    }
    
    var label_css =`display: block; font-size: 30pt; font-weight: bold; font-family:Arial, Helvetica, sans-serif; margin-left: auto; margin-right: auto; text-align:center; background-color:#3e444d; color:${choice}`;
    document.querySelector("#Choice").setAttribute("style",label_css);
    document.querySelector("#Choice").innerHTML=CHOICE;
    // Only want to briefly display the chosen colour
    // This makes it easier to see when the same colour is chosen sequentially
    setTimeout(function(){document.querySelector("#Choice").innerHTML=''}, 750);
    
    
    var choicecount= Number(document.querySelector(`#${og_colours[num]}`).innerHTML);
    choicecount++;
    document.querySelector(`#${og_colours[num]}`).innerHTML=String(choicecount);
    // This can be changed as needed to prevent clashes with user choices
    randcols[num]="white";


    choices(colours.length,'NoRemove', num);
}
