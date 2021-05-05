function leftClick(line){
  lineId = line.getAttribute("id");
  idOne = lineId.substring(0,1);
  idTwo = lineId.substring(2,3);

  if(lineId.includes("horizontal")){
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

}
function rightClick(line){
  line.style.backgroundColor = "white";

  lineId = line.getAttribute("id");
  idOne = lineId.substring(0,1);
  idTwo = lineId.substring(2,3);

  if(lineId.includes("horizontal")){
    if(horizontalLines[idOne][idTwo] == 2){
      line.style.color = "white";
      horizontalLines[idOne][idTwo] = 0;
    }else{
      line.style.color = "red";
      horizontalLines[idOne][idTwo] = 2;
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
    return squares[idOne][idTwo];
  }
}
function display_board(){
  document.getElementById("puzzle-container").innerHTML="";
  //6.6px = 1%
  //dotWidth: 3.03030303 100/3% squares.length*4px; 100/squares.length px;
  //lines: dotWidth*4 px;
  //squares: dotWidth*4 px;
  for(i=0; i<squares.length+1; i++){
    for(j=0; j<squares.length; j++){
      document.getElementById("puzzle-container").innerHTML+=`<span class="dot">x</span>`;
      document.getElementById("puzzle-container").innerHTML+=`<a id="${i},${j},horizontal" class="line horizontal-line" onclick="leftClick(document.getElementById('${i},${j},horizontal'))" oncontextmenu="rightClick(document.getElementById('${i},${j},horizontal'))" style="background-color: white;">X</a>`;
    }
    document.getElementById("puzzle-container").innerHTML+=`<span class="dot">x</span>`;
    if(i != squares.length){
      document.getElementById("puzzle-container").innerHTML+=`<br/>`;
      for(j=0; j<squares.length+1; j++){
        document.getElementById("puzzle-container").innerHTML+=`<a id="${i},${j},vertical" class="line vertical-line" onclick="leftClick(document.getElementById('${i},${j},vertical'))" oncontextmenu="rightClick(document.getElementById('${i},${j},vertical'))" style="background-color: white;">X</a>`;
        if(j != squares.length){
          document.getElementById("puzzle-container").innerHTML+=`<span id="${i},${j},box" class="num-box">${displayNum(i,j)}</span>`;
        }
      }
      document.getElementById("puzzle-container").innerHTML+=`<br class="after-vertical"/>`;
    }
  }

  //changing css
  dotWidth = 100/squares.length;
  dots = document.getElementsByClassName('dot');
  for(i=0; i<dots.length; i++){
    dots[i].style = `width: ${dotWidth}px; height: ${dotWidth}px; line-height: ${dotWidth}px;`;
  }

  horizontal_lines = document.getElementsByClassName('horizontal-line');
  for(i=0; i<horizontal_lines.length; i++){
    horizontal_lines[i].style = `width: ${dotWidth*5}px; height: ${dotWidth}px; line-height: ${dotWidth}px; font-size: ${dotWidth*0.85}px;`;
  }
  vertical_lines = document.getElementsByClassName('vertical-line');
  for(i=0; i<vertical_lines.length; i++){
    vertical_lines[i].style = `width: ${dotWidth}px; height: ${dotWidth*5}px; line-height: ${dotWidth*5}px; font-size: ${dotWidth*0.85}px;`;
  }
  num_boxes = document.getElementsByClassName('num-box');
  for(i=0; i<num_boxes.length; i++){
    num_boxes[i].style = `width: ${dotWidth*5}px; height: ${dotWidth*5}px; line-height: ${dotWidth*5}px; font-size: ${dotWidth*5/2}px;`;
  }
  update_board();
}
function update_board(){
  //updates lines filled in based on horizontalLines and verticalLines
  console.log("hi");
  //horizontalLines loop with i < squares.length + 1
  for(i=0; i < squares.length + 1; i++){
    for(j=0; j < squares.length; j++){
      line = document.getElementById(`${i},${j},horizontal`);
      lineId = line.getAttribute("id");
      idOne = lineId.substring(0,1);
      idTwo = lineId.substring(2,3);
      if(horizontalLines[idOne][idTwo] == 0){
        line.style.backgroundColor = "white";
        line.style.color = "white";
      }else if(horizontalLines[idOne][idTwo] == 1){
        line.style.backgroundColor = "black";
        line.style.color = "black";
      }else if(horizontalLines[idOne][idTwo] == 2){
        line.style.backgroundColor = "white";
        line.style.color = "red";
      }
    }
  }
  //verticalLines loop with j < squares.length + 1
  for(i=0; i < squares.length; i++){
    for(j=0; j < squares.length + 1; j++){
      line = document.getElementById(`${i},${j},vertical`);
      lineId = line.getAttribute("id");
      idOne = lineId.substring(0,1);
      idTwo = lineId.substring(2,3);
      if(verticalLines[idOne][idTwo] == 0){
        line.style.backgroundColor = "white";
        line.style.color = "white";
      }else if(verticalLines[idOne][idTwo] == 1){
        line.style.backgroundColor = "black";
        line.style.color = "black";
      }else if(verticalLines[idOne][idTwo] == 2){
        line.style.backgroundColor = "white";
        line.style.color = "red";
      }
    }
  }
}
function initiate_horizontalLines(){
  //returns horizontalLines based on squares
  array = [];
  for(i = 0; i<=squares.length; i++){
    array.push(Array(squares.length).fill(0));
  }
  return array;
}
function initiate_verticalLines(){
  //returns verticalLines based on squares
  array = [];
  for(i = 0; i<squares.length; i++){
    array.push(Array(squares.length+1).fill(0));
  }
  return array;
}
function initiate_squares(){
  puzzles = {
    "0": [[4, 3, 4, 1, 4, 4],
          [4, 0, 3, 4, 4, 4],
          [4, 2, 4, 4, 4, 4],
          [2, 0, 4, 2, 4, 4],
          [4, 2, 4, 2, 4, 4],
          [4, 2, 4, 2, 4, 4]],
    "1": [[4, 3, 4, 1, 4],
          [4, 0, 3, 4, 4],
          [4, 2, 4, 4, 4],
          [2, 0, 4, 2, 4],
          [4, 2, 4, 2, 4]],
    "2": [[4, 3, 4, 1],
          [4, 0, 3, 4],
          [4, 2, 4, 4],
          [2, 0, 4, 2]],
    "3": [[4, 3, 4],
          [4, 0, 3],
          [4, 2, 4]]
  }
  return puzzles[Math.floor(Math.random()*Object.keys(puzzles).length)];
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
  for(i=0; i < squares.length; i++){
    for(j=0; j < squares.length; j++){

      //Rule: if one point has two edges connecting, the other two are empty
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
  //if a square has enough lines, make all 0s Xs(2s)
  //now do if a square has enough Xs, make all 0s 1s
  for(i=0; i < squares.length; i++){
    for(j=0; j < squares.length; j++){
      if(squares[i][j] == remove_x(horizontalLines[i][j]) + remove_x(horizontalLines[i+1][j]) + remove_x(verticalLines[i][j]) + remove_x(verticalLines[i][j+1])){
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
          verticalLines[i][j+1] = 2;
        }
      }
      if(squares[i][j] != 4 && squares[i][j] == 4-((remove_one(horizontalLines[i][j]) + remove_one(horizontalLines[i+1][j]) + remove_one(verticalLines[i][j]) + remove_one(verticalLines[i][j+1]))/2)){
        if(horizontalLines[i][j] == 0){
          horizontalLines[i][j] = 1;
        }
        if(horizontalLines[i+1][j] == 0){
          horizontalLines[i+1][j] = 1;
        }
        if(verticalLines[i][j] == 0){
          verticalLines[i][j] = 1;
        }
        if(verticalLines[i][j+1] == 0){
          verticalLines[i][j+1] = 1;
        }
      }
    }
  }
  update_board();
}

function check_x(i, j, orientation){
  //returns true if edge == x, or if edge doesn't exist
  if(i >= 0 && j >= 0){
    if(orientation == "horizontal"){
      if(i < horizontalLines.length && j < horizontalLines[i].length){
        if(horizontalLines[i][j] == 2){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    }else{
      if(i < verticalLines.length && j < verticalLines[i].length){
        if(verticalLines[i][j] == 2){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    }
  }else{
    return true;
  }
}
function change_to_x(i, j, orientation){
  //changes i, j, orientation to X with checks
  if(i >= 0 && j >= 0){
    if(orientation == "horizontal"){
      if(i < horizontalLines.length && j < horizontalLines[i].length){
        horizontalLines[i][j] = 2;
      }
    }else if(i < verticalLines.length && j < verticalLines[i].length){
      verticalLines[i][j] = 2;
    }
  }
}
function rule_two() {
  //Rule 2: if one point has two edges connecting, the other two are empty
  //If one point has 3 Xs, the fourth edge must be an X too
  for(i=0; i <= squares.length; i++){
    for(j=0; j <= squares.length; j++){
      try {
        if(horizontalLines[i][j] == 1){
          if(i < squares.length && j < squares.length){
            if(verticalLines[i][j] == 1){
              //Checks right and bottom
              if(i-1 >= 0){
                verticalLines[i-1][j] = 2;
              }
              if(j-1 >= 0){
                horizontalLines[i][j-1] = 2;
              }
            }
          }
          if(j-1 >= 0){
            if(horizontalLines[i][j-1] == 1){
              //Checks left and right (consecutive horizontal lines)
              if(i-1 >= 0){
                verticalLines[i-1][j] = 2;
              }
              verticalLines[i][j] = 2;
            }
          }
          if(i-1 >= 0){
            if(verticalLines[i-1][j] == 1){
              //Checks right and top
              if(j-1 >= 0){
                horizontalLines[i][j-1] = 2;
              }
              verticalLines[i][j] = 2;
            }
          }
          if(verticalLines[i][j+1] == 1){
            //Checks left and bottom
            if(i-1 >= 0){
              verticalLines[i-1][j+1] = 2;
            }
            if(j+1 < horizontalLines[i].length){
              horizontalLines[i][j+1] = 2;
            }
          }
        }
        if(i < verticalLines.length-1){
          if(verticalLines[i][j] == 1){
            //Checks top and bottom
            if(i+1 < verticalLines.length){
              if(verticalLines[i+1][j] == 1){
                horizontalLines[i+1][j] = 2;
                if(j-1 >= 0){
                  horizontalLines[i+1][j-1] = 2;
                }
              }
            }
            //checks top and left
            if(i+1 < horizontalLines.length && j-1 >= 0){
              if(horizontalLines[i+1][j-1] == 1){
                horizontalLines[i+1][j] = 2;
                verticalLines[i+1][j] = 2;
              }
            }
          }
        }
        //If one point has 3 Xs, the fourth edge must be an X too
        //add checks for edges

        //right
        if(check_x(i,j,"horizontal")){
          //left
          if(check_x(i,j-1,"horizontal")){
            //top
            if(check_x(i-1,j,"vertical")){
              //change bottom
              change_to_x(i,j,"vertical");
            }
            //bottom
            if(check_x(i,j,"vertical")){
              //change top
              change_to_x(i-1,j,"vertical");
            }
          }
          //top
          if(check_x(i-1,j,"vertical")){
            //bottom
            if(check_x(i,j,"vertical")){
              //change left
              change_to_x(i,j-1,"horizontal");
            }
          }
        }
        //left
        if(check_x(i,j-1,"horizontal")){
          //top
          if(check_x(i-1,j,"vertical")){
            //bottom
            if(check_x(i,j,"vertical")){
              //change right
              change_to_x(i,j,"horizontal");
            }
          }
        }
      } catch (error) {
        console.log(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
    }
  }
  update_board();
  //edges need finishing out of for loop
  //Solution checker next
}

function check_edge(i, j, orientation){
  //returns true if edge == 1
  if(i >= 0 && j >= 0){
    if(orientation == "horizontal"){
      if(i < horizontalLines.length && j < horizontalLines[i].length){
        if(horizontalLines[i][j] == 1){
          return true;
        }
      }
    }else{
      if(i < verticalLines.length && j < verticalLines[i].length){
        if(verticalLines[i][j] == 1){
          return true;
        }
      }
    }
  }
  return false;
}
function find_edge_connected(i, j, orientation){
  //returns connected edge if == 1
  //if no connected loop, return false
  temp = [];
  if(orientation == "horizontal"){
    if(check_edge(i, j, "vertical")){
      temp.push([i, j, "vertical"]);
    }
    if(check_edge(i-1, j, "vertical")){
      temp.push([i-1, j, "vertical"]);
    }
    if(check_edge(i, j-1, "horizontal")){
      temp.push([i, j-1, "horizontal"]);
    }
    if(check_edge(i, j+1, "horizontal")){
      temp.push([i, j+1, "horizontal"]);
    }
    if(check_edge(i, j+1, "vertical")){
      temp.push([i, j+1, "vertical"]);
    }
    if(check_edge(i-1, j+1, "vertical")){
      temp.push([i-1, j+1, "vertical"]);
    }
  }else{
    if(check_edge(i, j, "horizontal")){
      temp.push([i, j, "horizontal"]);
    }
    if(check_edge(i, j-1, "horizontal")){
      temp.push([i, j-1, "horizontal"]);
    }
    if(check_edge(i-1, j, "vertical")){
      temp.push([i-1, j, "vertical"]);
    }
    if(check_edge(i+1, j, "vertical")){
      temp.push([i+1, j, "vertical"]);
    }
    if(check_edge(i+1, j, "horizontal")){
      temp.push([i+1, j, "horizontal"]);
    }
    if(check_edge(i+1, j-1, "horizontal")){
      temp.push([i+1, j-1, "horizontal"]);
    }
  }
  if(temp.length != 0){
    return temp;
  }
  return false;
}
function isEqual(first, second){
  console.log("isEqual");
  console.log(first);
  console.log(second);
  return JSON.stringify(first) === JSON.stringify(second);
}
function miniloop(i, j, orientation){
  //returns array of miniloop, unless given edge != 1 (then it returns false)
  //a = [[orientation, i, j], [orientation, i, j], [orientation, i, j]...];
  //if miniloop loops then check_solution(), if not solved then "solution" is incorrect
  //check edge added is not part of loop already
  console.log("miniloop");
  //check start of loop == 1
  if(check_edge(i, j, orientation)){
    a = [[i, j, orientation]];
    b = [[i, j, orientation]];
  }else{
    return false;
  }
  while(b.length != 0){
    temp = find_edge_connected(i, j, orientation);
    console.log(temp);
    //check for connnections that aren't already found
    if(temp){
      if(temp.length == 1){
        if(!a.some(e => isEqual([e], temp))){
          console.log("true");
          a.push(temp);
          b.push(temp);
        }
      }else{
        for(i = 0; i < temp.length; i++){
          if(!a.some(e => isEqual(e, temp[i]))){
            console.log("true");
            a.push(temp[i]);
            b.push(temp[i]);
          }
        }
      }
    }
    b.shift();
    if(b.length != 0){
      i = b[0][0];
      j = b[0][1];
      orientation = b[0][2];
    }
    console.log(a);
    console.log(b);
  }
  return a;
}
function miniloops(){
  //returns array of all miniloops
}
function rule_three() {
  //check end of loops for definite paths
  //e.g. end of loop connected to two Xs or an edge and an X
  //if a point connects 2 Xs and a 1, the last edge must be a 1

}
function rule_four(){

}
function rule_five() {

}
function backtracking_search(){

}
function mistake_made(){
  //returns 0 if no mistake made, returns 1 if mistake made
  for(i=0; i < squares.length; i++){
    for(j=0; j < squares.length; j++){
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
function remove_one(num){
  if(num == 1){
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






squares = initiate_squares();

horizontalLines = initiate_horizontalLines();
verticalLines = initiate_verticalLines();

window.oncontextmenu = function(e){ e.preventDefault();}
