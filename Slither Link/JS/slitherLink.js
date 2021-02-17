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
