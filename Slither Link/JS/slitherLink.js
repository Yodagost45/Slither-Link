function leftClick(line){
  lineId = line.getAttribute("id");
  idOne = lineId.substring(0,1);
  idTwo = lineId.substring(2,3);
  if(line.getAttribute("id").includes("horizontal")){
    orientation = "horizontal";
  }else{
    orientation = "vertical"
  }
  if(orientation == "horizontal"){
    if(horizontalLines[idOne][idTwo] == 1){
      horizontalLines[idOne][idTwo] = 0;
      line.style.backgroundColor = "white";
      line.style.color = "white";
    }else{
      horizontalLines[idOne][idTwo] = 1;
      line.style.backgroundColor = "black";
      line.style.color = "black";
    }
  }else{
    if(verticalLines[idOne][idTwo] == 1){
      verticalLines[idOne][idTwo] = 0;
      line.style.backgroundColor = "white";
      line.style.color = "white";
    }else{
      verticalLines[idOne][idTwo] = 1;
      line.style.backgroundColor = "black";
      line.style.color = "black";
    }
  }

  console.log(horizontalLines);
}
function rightClick(line){
  line.style.backgroundColor = "white";

  lineId = line.getAttribute("id");
  idOne = lineId.substring(0,1);
  idTwo = lineId.substring(2,3);

  if(line.getAttribute("id").includes("horizontal")){
    orientation = "horizontal";
  }else{
    orientation = "vertical"
  }
  console.log(orientation);

  if(orientation == "horizontal"){
    if(horizontalLines[idOne][idTwo] == 2){
      line.style.color = "white";
      horizontalLines[idOne][idTwo] = 0;
    }else{
      line.style.color = "red";
      horizontalLines[idOne][idTwo] = 2;
      console.log("hi");
    }
  }else{
    if(verticalLines[idOne][idTwo] == 2){
      line.style.color = "white";
      verticalLines[idOne][idTwo] = 0;
    }else{
      line.style.color = "red";
      verticalLines[idOne][idTwo] = 2;
    }
  }
}

function displayNum(idOne,idTwo){
  if(squares[idOne][idTwo] == 4){
    return " ";
  }else{
    console.log(squares[idOne][idTwo]);
    return squares[idOne][idTwo];
  }
}
//AI ***********************************************************************
function complete(){
  while (!check_solution()){
    while(move_available()){
      rule_one();
      rule_two();
      rule_three();
      rule_four();
    }
    if (check_solution()){
      break;
    }
    rule_five();
    if (check_solution()){
      break;
    }
    backtracking_search();
  }
  for(i=0; i < 5; i++){
    for(j=0; j < 5; j++){
      if (squares[i][j] == 0){
        //redundant
        horizontalLines[i][j] = 2;
        horizontalLines[i+1][j] = 2;
        verticalLines[i][j] = 2;
        verticalLines[i][j+1] = 2;
      }
      if(squares[i][j] == remove_x(horizontalLines[i][j]) + remove_x(horizontalLines[i+1][j]) + remove_x(verticalLines[i][j]) + remove_x(verticalLines[i][j+1])){
        //if square has enough lines, make all 0s Xs(2s) (rule_one)
        if(horizontalLines[i][j] == 0){
          horizontalLines[i][j] = 2;
        }
        if(horizontalLines[i+1][j] == 0){
          horizontalLines[i+1][j] = 2;
        }
        if(verticalLines[i][j] == 0){
          verticalLines[i][j] = 2;
        }
        if(verticalLines[i][j+1] == 0){
          horizontalLines[i][j+1] = 2;
        }
      }
      //Rule: if one point has two edges connecting, the other two are empty
      //
      if(horizontalLines[i][j] == 1 && verticalLines[i][j] == 1){
        //right and bottom edges
        if(i-1 >= 0){
          horizontalLines[i-1][j] = 2;
        }
        if(j-1 >= 0){
          verticalLines[i][j-1] = 2;
        }
      }
      if(i-1 >= 0){
        if(horizontalLines[i-1][j] == 1 && verticalLines[i][j] == 1){
          //left and bottom edges
          horizontalLines[i][j] = 2;
          if(j-1 >= 0){
            verticalLines[i][j-1] = 2;
          }
        }
        if(horizontalLines[i-1][j] == 1 && horizontalLines[i][j] == 1){
          if(j-1 >= 0){
            verticalLines[i][j-1] = 2;
          }
          verticalLines[i][j] = 2;
        }
      }
      if(j-1 >= 0){

      }
      if(horizontalLines[i][j] == 1 && verticalLines[i-1][j] == 1){

      }
    }
  }
  //go through horizontal lines

  //go through vertical lines

  //go through combinations - use for loop > 5 and a seperate one for edges?

}
function rule_one(){
  for(i=0; i < 5; i++){
    for(j=0; j < 5; j++){
      if (squares[i][j] == 0){
        //redundant
        horizontalLines[i][j] = 2;
        horizontalLines[i+1][j] = 2;
        verticalLines[i][j] = 2;
        verticalLines[i][j+1] = 2;
      }
      if(squares[i][j] == remove_x(horizontalLines[i][j]) + remove_x(horizontalLines[i+1][j]) + remove_x(verticalLines[i][j]) + remove_x(verticalLines[i][j+1])){
        //if square has enough lines, make all 0s Xs(2s) (rule_one)
        if(horizontalLines[i][j] == 0){
          horizontalLines[i][j] = 2;
        }
        if(horizontalLines[i+1][j] == 0){
          horizontalLines[i+1][j] = 2;
        }
        if(verticalLines[i][j] == 0){
          verticalLines[i][j] = 2;
        }
        if(verticalLines[i][j+1] == 0){
          horizontalLines[i][j+1] = 2;
        }
      }
    }
  }
}
function rule_two() {

}
function rule_three() {

}
function rule_four(){

}
function rule_five() {

}
function backtracking_search(){

}
function mistake_made(){
  //returns 0 if no mistake made, returns 1 if mistake made
  for(i=0; i < 5; i++){
    for(j=0; j < 5; j++){
      if(squares[i][j] < remove_x(horizontalLines[i][j]) + remove_x(horizontalLines[i+1][j]) + remove_x(verticalLines[i][j]) + remove_x(verticalLines[i][j+1])){
        return 1;
      }
    }
  }
  return 0;
}
function remove_x(num){
  if(num == 2){
    return 0;
  }else{
    return num;
  }
}
function check_solution(){
  repeat = true;
  counter = 0;
  while (repeat){
    counter += 1;

  }
}
function display_solution(){
  display_board();
}
function display_board(){

}

horizontalLines = [[0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0]];

verticalLines = [[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]];

squares = [[4, 3, 4, 1, 4],
          [4, 0, 3, 4, 4],
          [4, 2, 4, 4, 4],
          [2, 0, 4, 2, 4],
          [4, 2, 4, 2, 4]];

window.oncontextmenu = function(e){ e.preventDefault();}
