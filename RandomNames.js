function Random_number(i){
    var x =Math.floor(Math.random()*i);
    x = Number(x);
    return x;
}
function Null_remove(element){
    return element != null && element !='';
}
function Randomiser(){
    
    var uinput = document.getElementById('people').value;
    uinput = String(uinput);
    var split_input = uinput.split('\n');
    var filtered = split_input.filter(Null_remove);
    
    var non_null =0;
    for (i=0;i<split_input.length;i++){

    
        if (split_input[i] !=null && split_input[i]!=''){
            non_null ++;
        } 
    }
    var rand = Random_number(non_null);
    var chosen =filtered[rand];
  
      
    
    var replacement = uinput.replace(filtered[rand],'');
    
    
    document.getElementById("randomised").innerHTML = chosen;
    document.getElementById('people').value =replacement;
   
}