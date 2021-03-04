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



squares = initiate_squares();

horizontalLines = initiate_horizontalLines();
verticalLines = initiate_verticalLines();

window.oncontextmenu = function(e){ e.preventDefault();}
