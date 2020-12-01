
// Generates a random number between 1 and i, inclusive
function Random_number(i){
    var x =Math.floor(Math.random()*i);
    x = Number(x);
    return x;
}
// Removes empty elements
// Used to compensate for array length changes between 
// running the Randomiser function
function Null_remove(element){
    return element != null && element !='';
}

function Randomiser(){
    var uinput = document.getElementById('ListItems').value;
    uinput = String(uinput);
    var split_input = uinput.split('\n');
    var filtered = split_input.filter(Null_remove);
    var non_null =0;
    // Allows input over multiple lines to be parsed
    // even if some lines are empty
    for (i=0;i<split_input.length;i++){
        if (split_input[i] !=null && split_input[i]!=''){
            non_null ++;
        } 
    }
    var rand = Random_number(non_null);
    var chosen =filtered[rand];
    var replacement = uinput.replace(filtered[rand],'');
    
    if (filtered.length >0){
        document.getElementById("RandomItemChoice").innerHTML = chosen;
    }
    else{
        // Prevents 'undefined' from being returned as a value when once the
        // array is empty
        document.getElementById("RandomItemChoice").innerHTML ="No choices remain";
    }    
    document.getElementById('ListItems').value =replacement
}