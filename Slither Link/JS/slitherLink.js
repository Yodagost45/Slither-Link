function leftClick(line){
  lineId = line.getAttribute("id");
  idOne = lineId.substring(0,1);
  idTwo = lineId.substring(2,3);
  if(xToggled){
    rightClick(line);
  }else{
    if(lineId.includes("horizontal")){
      if(horizontalLines[idOne][idTwo].state == 1){
        horizontalLines[idOne][idTwo].state = 0;
        line.style.backgroundColor = "white";
        line.style.color = "white";
      }else{
        horizontalLines[idOne][idTwo].state = 1;
        line.style.backgroundColor = "black";
        line.style.color = "black";
        if(check_solution()){
          clearInterval(clock);
          if(hintUsed){
            pop_up("user_completed", "Finished! Do you want to view the leaderboard? (time cannot be saved as hints were used)", "");
          }else{
            pop_up("user_completed", "Finished! Do you want to add your time to the leaderboard?", "");
          }
        }
      }
    }else{
      if(verticalLines[idOne][idTwo].state == 1){
        verticalLines[idOne][idTwo].state = 0;
        line.style.backgroundColor = "white";
        line.style.color = "white";
      }else{
        verticalLines[idOne][idTwo].state = 1;
        line.style.backgroundColor = "black";
        line.style.color = "black";
        if(check_solution()){
          clearInterval(clock);
          if(hintUsed){
            pop_up("user_completed", "Finished! Do you want to view the leaderboard? (time cannot be saved as hints were used)", "");
          }else{
            pop_up("user_completed", "Finished! Do you want to add your time to the leaderboard?", "");
          }
        }
      }
    }
  }

}
function rightClick(line){
  line.style.backgroundColor = "white";

  lineId = line.getAttribute("id");
  idOne = lineId.substring(0,1);
  idTwo = lineId.substring(2,3);

  if(lineId.includes("horizontal")){
    if(horizontalLines[idOne][idTwo].state == 2){
      line.style.color = "white";
      horizontalLines[idOne][idTwo].state = 0;
    }else{
      line.style.color = "red";
      horizontalLines[idOne][idTwo].state = 2;
    }
  }else{
    if(verticalLines[idOne][idTwo].state == 2){
      line.style.color = "white";
      verticalLines[idOne][idTwo].state = 0;
    }else{
      line.style.color = "red";
      verticalLines[idOne][idTwo].state = 2;
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
  timeElapsed = 0;
  clock = setInterval(timer, 1000);

}
function update_board(){
  //updates lines filled in based on horizontalLines and verticalLines
  for(i=0; i < horizontalLines.length; i++){
    for(j=0; j < horizontalLines[i].length; j++){
      line = document.getElementById(`${i},${j},horizontal`);
      if(horizontalLines[i][j].state == 0){
        line.style.backgroundColor = "white";
        line.style.color = "white";
      }else if(horizontalLines[i][j].state == 1){
        line.style.backgroundColor = "black";
        line.style.color = "black";
      }else if(horizontalLines[i][j].state == 2){
        line.style.backgroundColor = "white";
        line.style.color = "red";
      }
    }
  }
  for(i=0; i < verticalLines.length; i++){
    for(j=0; j < verticalLines[i].length; j++){
      line = document.getElementById(`${i},${j},vertical`);
      if(verticalLines[i][j].state == 0){
        line.style.backgroundColor = "white";
        line.style.color = "white";
      }else if(verticalLines[i][j].state == 1){
        line.style.backgroundColor = "black";
        line.style.color = "black";
      }else if(verticalLines[i][j].state == 2){
        line.style.backgroundColor = "white";
        line.style.color = "red";
      }
    }
  }
}

function timer(){
  //Every second adds an integer to the timer
  timeElapsed += 1;
  document.getElementById("timer").innerHTML = seconds_to_time(timeElapsed);
}
function seconds_to_time(timeElapsed){
  var minutes = Math.floor(timeElapsed/60);
  var seconds = timeElapsed%60;
  if(minutes < 10 && seconds < 10){
    time = "0"+minutes+":0"+seconds;
  }else if(minutes >= 10 && seconds < 10){
    time = minutes+":0"+seconds;
  }else if(minutes < 10 && seconds >= 10){
    time = "0"+minutes+":"+seconds;
  }else if(minutes >= 10 && seconds >= 10){
    time = minutes+":"+seconds;
  }
  return time;
}

function initiate_horizontalLines(){
  //returns horizontalLines based on squares
  array = [];
  orientation = "horizontal"
  for(i = 0; i <= squares.length; i++){
    inner_array = [];
    for(j = 0; j < squares.length; j++){
      inner_array.push(new Line(i, j, orientation));
    }
    array.push(inner_array);
  }
  return array;
}
function initiate_verticalLines(){
  //returns verticalLines based on squares
  array = [];
  orientation = "vertical";
  for(i = 0; i< squares.length; i++){
    inner_array = [];
    for(j = 0; j <= squares.length; j++){
      inner_array.push(new Line(i, j, orientation));
    }
    array.push(inner_array);
  }
  return array;
}
async function initiate_squares(difficulty_size){
  const puzzle = await axios.get('http://127.0.0.1:5000/newpuzzle', {params:  {
    puzzle_type: difficulty_size
  }})
  .then(function (response){
    return response.data;
  });
  current_puzzle = difficulty_size;
  return puzzle;
  // puzzles = {
  //   "0": [[3, 4, 1, 4, 3],
  //         [4, 3, 4, 3, 4],
  //         [3, 2, 4, 2, 3],
  //         [2, 4, 4, 4, 4],
  //         [4, 4, 4, 4, 3]],
  //   "1": [[4, 3, 4, 1, 4],
  //         [4, 0, 3, 4, 4],
  //         [4, 2, 4, 4, 4],
  //         [2, 0, 4, 2, 4],
  //         [4, 2, 4, 2, 4]],
  //   "2": [[4, 3, 4, 1],
  //         [4, 0, 3, 4],
  //         [4, 2, 4, 4],
  //         [2, 0, 4, 2]],
  //   "3": [[4, 4, 4],
  //         [4, 4, 0],
    //       [4, 3, 4]],
    // "4": [[4, 3, 2, 2, 3, 4, 0],
    //       [4, 4, 1, 4, 1, 4, 2],
    //       [4, 4, 3, 4, 4, 4, 3],
    //       [4, 2, 2, 4, 3, 1, 3],
    //       [4, 4, 3, 4, 4, 2, 2],
    //       [4, 4, 2, 4, 4, 4, 2],
    //       [4, 4, 4, 4, 4, 2, 3]],
  //   "5": [[4, 3, 3, 2, 3, 3, 4],
  //         [4, 2, 4, 2, 1, 4, 2],
  //         [3, 4, 2, 4, 2, 3, 4],
  //         [1, 4, 1, 4, 4, 1, 4],
  //         [2, 2, 2, 4, 4, 2, 1],
  //         [4, 4, 4, 1, 4, 4, 4],
  //         [3, 4, 4, 4, 4, 4, 4]],
  //   "6": [[4, 2, 4, 3, 2, 4, 3],
  //         [4, 2, 1, 4, 4, 2, 4],
  //         [3, 4, 4, 4, 2, 4, 4],
  //         [3, 4, 2, 4, 1, 2, 1],
  //         [4, 2, 4, 2, 4, 4, 4],
  //         [4, 3, 3, 4, 4, 1, 4],
  //         [3, 4, 4, 1, 3, 2, 4]],
  //   "7": [[2, 2, 4, 4, 4, 4, 4],
  //         [4, 4, 3, 4, 2, 2, 4],
  //         [4, 4, 4, 2, 4, 1, 4],
  //         [3, 4, 4, 1, 4, 2, 2],
  //         [2, 2, 3, 4, 4, 2, 2],
  //         [4, 4, 3, 4, 4, 3, 4],
  //         [4, 2, 4, 4, 3, 4, 3]],
  //   "8": [[4, 2, 2, 4, 4, 2, 4],
  //         [4, 4, 2, 2, 3, 4, 3],
  //         [4, 2, 4, 2, 4, 1, 4],
  //         [2, 2, 2, 4, 4, 4, 3],
  //         [3, 4, 2, 1, 2, 0, 3],
  //         [4, 2, 2, 2, 4, 4, 3],
    //       [4, 4, 4, 2, 4, 4, 4]],
    // "9": [[4,2,2,3,4,3,3,4,3,4],
    //       [3,4,4,2,3,4,4,4,4,4],
    //       [2,4,4,1,4,4,4,2,3,4],
    //       [4,3,4,4,4,3,4,4,2,2],
    //       [2,4,1,1,4,2,2,4,2,3],
    //       [1,4,4,4,4,4,2,1,3,4],
    //       [4,2,4,4,4,2,4,4,4,3],
    //       [4,2,4,4,3,1,2,1,3,4],
    //       [4,4,3,2,4,4,4,1,1,4],
    //       [4,2,2,4,4,4,4,4,1,4]],
  // }
  // //return puzzles[Math.floor(Math.random()*Object.keys(puzzles).length)];
  // return puzzles[9];
}

//BUTTONS ******************************************************************************************************************************************************************************************************************

function pop_up(function_name, message, arguments){
  var confirmationBackground = document.getElementById("confirmation-popup");
  var confirmation = document.getElementById("confirmation");
  confirmation.innerHTML = message;
  confirmation.innerHTML += `<br/><br/><button onclick="run_popup('${function_name}', '${arguments}')">Ok</button>  <button onclick="cancel_popup()">Cancel</button>`
  confirmationBackground.style.display = "block";
}
function cancel_popup(){
  var confirmationBackground = document.getElementById("confirmation-popup");
  confirmationBackground.style.display = "none";
}
function run_popup(function_name, arguments){
  cancel_popup();
  window[function_name](arguments);
}
function alert_box(message){
  var confirmationBackground = document.getElementById("confirmation-popup");
  var confirmation = document.getElementById("confirmation");
  confirmation.innerHTML = message;
  confirmation.innerHTML += `<br/><br/><button onclick="cancel_popup()">Ok</button>`
  confirmationBackground.style.display = "block";
}
function reset_board(){
  verticalLines = initiate_verticalLines();
  horizontalLines = initiate_horizontalLines();
  update_board();
}
function hint(){
  hintUsed = true;
  //highlight mistakes
  if(highlight_mistakes()){
    return true;
  }
  //do rules until state is changed
  stateChanged = false;
  starting_techniques();
  if(stateChanged){
    return true;
  }
  rule_one();
  if(stateChanged){
    return true;
  }
  rule_two();
  if(stateChanged){
    return true;
  }
  rule_three();
  if(stateChanged){
    return true;
  }
  rule_four();
  if(stateChanged){
    return true;
  }
  Xs_diagonal_to_three();
  if(stateChanged){
    return true;
  }
  line_connecting_to_three();
  if(stateChanged){
    return true;
  }
  line_connecting_to_one();
  if(stateChanged){
    return true;
  }
  alert_box("You have made a mistake! Go back and check all your moves were definite.");
}
function highlight_mistakes(){
  for(i=0; i < squares.length; i++){
    for(j=0; j < squares.length; j++){
      //check no vertexs have 3 or 4 lines connected
      thingsToHighlight = [];
      if(check_one(i, j, "horizontal")){
        thingsToHighlight.push([i,j,"horizontal"]);
      }
      if(check_one(i, j-1, "horizontal")){
        thingsToHighlight.push([i,j-1,"horizontal"]);
      }
      if(check_one(i, j, "vertical")){
        thingsToHighlight.push([i,j,"vertical"]);
      }
      if(check_one(i-1, j, "vertical")){
        thingsToHighlight.push([i-1,j,"vertical"]);
      }
      if(thingsToHighlight.length > 2){
        //highlight them as red
        for(let n=0; n < thingsToHighlight.length; n++){
          highlight_red(thingsToHighlight[n][0],thingsToHighlight[n][1],thingsToHighlight[n][2]);
        }
        return true;
      }

      //check numbers aren't overloaded (e.g. 3 lines around a 2)
      if(squares[i][j] != 4){
        if(squares[i][j] < horizontalLines[i][j].remove_x() + horizontalLines[i+1][j].remove_x() + verticalLines[i][j].remove_x() + verticalLines[i][j+1].remove_x()){
          //highlight lines red
          thingsToHighlight = [[i,j,"horizontal"],[i+1,j,"horizontal"],[i,j,"vertical"],[i,j+1,"vertical"]];
          for(let n=0; n < thingsToHighlight.length; n++){
            if(check_one(thingsToHighlight[n][0],thingsToHighlight[n][1],thingsToHighlight[n][2])){
              highlight_red(thingsToHighlight[n][0],thingsToHighlight[n][1],thingsToHighlight[n][2]);
            }
          }
          return true;
        }
        //check numbers don't have too many Xs around them
        if((4-squares[i][j]) < (horizontalLines[i][j].remove_one() + horizontalLines[i+1][j].remove_one() + verticalLines[i][j].remove_one() + verticalLines[i][j+1].remove_one())/2){
          //highlight all four lines as red
          thingsToHighlight = [[i,j,"horizontal"],[i+1,j,"horizontal"],[i,j,"vertical"],[i,j+1,"vertical"]];
          for(let n=0; n < thingsToHighlight.length; n++){
            if(check_x(thingsToHighlight[n][0],thingsToHighlight[n][1],thingsToHighlight[n][2])){
              highlight_red(thingsToHighlight[n][0],thingsToHighlight[n][1],thingsToHighlight[n][2]);
            }
          }
          return true;
        }
      }
    }
  }
  return false;
}
function highlight_red(i, j, orientation){
  line = document.getElementById(`${i},${j},${orientation}`);
  line.style.backgroundColor = "red";
  line.style.color = "red";
}
function new_puzzle(){
  var leaderboardBackground = document.getElementById("leaderboard-popup");
  leaderboardBackground.style.display = "none";
  var popup = document.getElementById("new-puzzle-popup");
  popup.style.display = "block";
}
async function load_puzzle(difficulty_size){
  hintUsed = false;
  uploaded = false;
  var popup = document.getElementById("new-puzzle-popup");
  popup.style.display = "none";
  var actionPane = document.getElementById("action-pane");
  actionPane.style.display = "block";
  var timerDiv = document.getElementById("timer");
  timerDiv.innerHTML = "00:00";
  clearInterval(clock);
  squares = await initiate_squares(difficulty_size);
  verticalLines = initiate_verticalLines();
  horizontalLines = initiate_horizontalLines();
  display_board();
}
window.onclick = function(event) {
  var backgrounds = document.getElementsByClassName("pop-up");
  for (let i = 0; i < backgrounds.length; i++) {
    if (event.target == backgrounds[i]) {
      backgrounds[i].style.display = "none";
    }
  }
}
function user_completed(){
  if(hintUsed){
    show_leaderboard(current_puzzle, "hint");
  }else if(uploaded){
    alert_box("You've already uploaded this time!")
  }else{
    name = prompt("Enter your name: ");
    if(!(name == null || name == "" || name == "null")){
      add_to_leaderboard(name);
    }
  }
}
function add_to_leaderboard(name){
  axios.post('http://127.0.0.1:5000/highscore', {
    name: name,
    difficulty: current_puzzle,
    time: timeElapsed
  });
  uploaded = true;
  show_leaderboard(current_puzzle, name);
}
function show_leaderboard(puzzle_difficulty, name){
  formated_difficulty = format_current_puzzle(puzzle_difficulty);
  var leaderboardBackground = document.getElementById("leaderboard-popup");
  var leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "";
  leaderboard.innerHTML += `<button name="new puzzle" onclick="show_all_leaderboards()">Leaderboards</button> <h2>${formated_difficulty[0]} ${formated_difficulty[1]} Leaderboard</h2> <button name="new puzzle" onclick="new_puzzle()">New puzzle</button>`;

  if(!!name){
    leaderboard.innerHTML += `<h3>Your time: ${seconds_to_time(timeElapsed)}</h3>`;
  }
  //axios get leaderboard, display here (parse and sort top ten in python)
  axios.get('http://127.0.0.1:5000/leaderboard', {params:  {
    puzzle_type: puzzle_difficulty
  }})
  .then(function (response) {
    // handle success
    if(response.data.length > 0){
      for(let i = 0; i < response.data.length; i++){
        leaderboard.innerHTML += `<h3>${response.data[i]["name"]}: ${seconds_to_time(response.data[i]["time"])}</h3>`;
      }
    }else{
      leaderboard.innerHTML += `<h3>Wow, such empty</h3>`;
    }
  })
  leaderboard.innerHTML += '';
  leaderboardBackground.style.display = "block";
}
function format_current_puzzle(puzzle_difficulty){
  temp = puzzle_difficulty.charAt(0).toUpperCase() + puzzle_difficulty.slice(1);
  formated_difficulty = temp.split("_");
  return formated_difficulty;
}
function show_all_leaderboards(){
  var leaderboardBackground = document.getElementById("leaderboard-popup");
  var leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "";
  leaderboard.innerHTML += "<h1>Leaderboards</h1>";
  leaderboard.innerHTML += `<button class="leaderboard-button" onclick="show_leaderboard('easy_5x5')">Easy 5x5</button><br/>`;
  leaderboard.innerHTML += `<button class="leaderboard-button" onclick="show_leaderboard('hard_5x5')">Hard 5x5</button><br/>`;
  leaderboard.innerHTML += `<button class="leaderboard-button" onclick="show_leaderboard('easy_7x7')">Easy 7x7</button><br/>`;
  leaderboard.innerHTML += `<button class="leaderboard-button" onclick="show_leaderboard('hard_7x7')">Hard 7x7</button><br/>`;
  leaderboardBackground.style.display = "block";
}
function toggle_x(){
  var button = document.getElementById("toggle-x");
  if(xToggled){
    xToggled = false;
    button.style.backgroundColor = "#efefef";
    button.style.color = "black";
  }else{
    xToggled = true;
    button.style.backgroundColor = "black";
    button.style.color = "#efefef";
    button.style.borderColor = "black";
  }
}
function show_help(){
  var helpBackground = document.getElementById("help-popup");
  var helpContent = document.getElementById("help");
  helpBackground.style.display = "block";
}

//AI **********************************************************************************************************************************************************************************************************************
//CLASSES******************************************************************************************************************************************************************************************************************
class Line{
  constructor(i, j, orientation){
    this.i = i;
    this.j = j;
    this.orientation = orientation;
    this.state = 0;
    this.end_point = false;
    this.depth = 0;
  }

  //class functions
  set_state(newState){
    if(this.state != newState && this.state == 0){
      this.state = newState;
      stateChanged = true;
      this.depth = depth_counter;
    }
  }
  change_state(newState){
    if(this.state != newState){
      this.state = newState;
      stateChanged = true;
      this.depth = depth_counter;
    }
  }
  reverse_state(){
    this.state = 0;
    this.depth = 0;
  }
  remove_x(){
    if(this.state == 2){
      return 0;
    }
    return this.state;
  }
  remove_one(){
    if(this.state == 1){
      return 0;
    }
    return this.state;
  }
  find_ones_connected(i=this.i, j=this.j){
    //returns connected edge if == 1
    //if no connected loop, return false
    let temp = [];
    if(this.orientation == "horizontal"){
      if(check_one(i, j, "vertical")){
        temp.push(verticalLines[i][j]);
      }
      if(check_one(i-1, j, "vertical")){
        temp.push(verticalLines[i-1][j]);
      }
      if(check_one(i, j-1, "horizontal")){
        temp.push(horizontalLines[i][j-1]);
      }
      if(check_one(i, j+1, "horizontal")){
        temp.push(horizontalLines[i][j+1]);
      }
      if(check_one(i, j+1, "vertical")){
        temp.push(verticalLines[i][j+1]);
      }
      if(check_one(i-1, j+1, "vertical")){
        temp.push(verticalLines[i-1][j+1]);
      }
    }else{
      if(check_one(i, j, "horizontal")){
        temp.push(horizontalLines[i][j]);
      }
      if(check_one(i, j-1, "horizontal")){
        temp.push(horizontalLines[i][j-1]);
      }
      if(check_one(i-1, j, "vertical")){
        temp.push(verticalLines[i-1][j]);
      }
      if(check_one(i+1, j, "vertical")){
        temp.push(verticalLines[i+1][j]);
      }
      if(check_one(i+1, j, "horizontal")){
        temp.push(horizontalLines[i+1][j]);
      }
      if(check_one(i+1, j-1, "horizontal")){
        temp.push(horizontalLines[i+1][j-1]);
      }
    }
    if(temp.length != 0){
      return temp;
    }
    return false;
  }
  find_edges_connected(i=this.i, j=this.j){
    //returns connected edge if == 1
    //if no connected loop, return false
    let temp = [];
    if(this.orientation == "horizontal"){
      if(check_exists(i, j, "vertical")){
        temp.push(verticalLines[i][j]);
      }
      if(check_exists(i-1, j, "vertical")){
        temp.push(verticalLines[i-1][j]);
      }
      if(check_exists(i, j-1, "horizontal")){
        temp.push(horizontalLines[i][j-1]);
      }
      if(check_exists(i, j+1, "horizontal")){
        temp.push(horizontalLines[i][j+1]);
      }
      if(check_exists(i, j+1, "vertical")){
        temp.push(verticalLines[i][j+1]);
      }
      if(check_exists(i-1, j+1, "vertical")){
        temp.push(verticalLines[i-1][j+1]);
      }
    }else{
      if(check_exists(i, j, "horizontal")){
        temp.push(horizontalLines[i][j]);
      }
      if(check_exists(i, j-1, "horizontal")){
        temp.push(horizontalLines[i][j-1]);
      }
      if(check_exists(i-1, j, "vertical")){
        temp.push(verticalLines[i-1][j]);
      }
      if(check_exists(i+1, j, "vertical")){
        temp.push(verticalLines[i+1][j]);
      }
      if(check_exists(i+1, j, "horizontal")){
        temp.push(horizontalLines[i+1][j]);
      }
      if(check_exists(i+1, j-1, "horizontal")){
        temp.push(horizontalLines[i+1][j-1]);
      }
    }
    if(temp.length != 0){
      return temp;
    }
    return false;
  }
  find_edges_connected_split(i=this.i, j=this.j){
    //returns connected edge if == 1
    //if no connected loop, return false
    let temp = [[],[]];
    if(this.orientation == "horizontal"){
      if(check_exists(i, j, "vertical")){
        temp[0].push(verticalLines[i][j]);
      }
      if(check_exists(i-1, j, "vertical")){
        temp[0].push(verticalLines[i-1][j]);
      }
      if(check_exists(i, j-1, "horizontal")){
        temp[0].push(horizontalLines[i][j-1]);
      }
      if(check_exists(i, j+1, "horizontal")){
        temp[1].push(horizontalLines[i][j+1]);
      }
      if(check_exists(i, j+1, "vertical")){
        temp[1].push(verticalLines[i][j+1]);
      }
      if(check_exists(i-1, j+1, "vertical")){
        temp[1].push(verticalLines[i-1][j+1]);
      }
    }else{
      if(check_exists(i, j, "horizontal")){
        temp[0].push(horizontalLines[i][j]);
      }
      if(check_exists(i, j-1, "horizontal")){
        temp[0].push(horizontalLines[i][j-1]);
      }
      if(check_exists(i-1, j, "vertical")){
        temp[0].push(verticalLines[i-1][j]);
      }
      if(check_exists(i+1, j, "vertical")){
        temp[1].push(verticalLines[i+1][j]);
      }
      if(check_exists(i+1, j, "horizontal")){
        temp[1].push(horizontalLines[i+1][j]);
      }
      if(check_exists(i+1, j-1, "horizontal")){
        temp[1].push(horizontalLines[i+1][j-1]);
      }
    }
    if(temp.length != 0){
      return temp;
    }
    return false;
  }
  find_possibilities_connected(){
    let edgesConnected = this.find_edges_connected_split();
    let edgesConnectedLength = edgesConnected.length;
    //if edgesConnected contains an edge with state == 1, delete all connected edges to that line
    for(let n = 0; n < edgesConnectedLength; n++){
      for(let m = 0; m < edgesConnected[n].length; m++){
        if(edgesConnected[n][m].state == 1){
          edgesConnected.splice(n, 1);
          edgesConnectedLength -= 1;
          n -= 1;
          break;
        }
      }
    }
    return edgesConnected;
  }
  find_definite_path(){
    let edgesConnected = this.find_possibilities_connected();
    //do this twice
    let definiteEdges = [];
    for(let n = 0; n < edgesConnected.length; n++){
      let counter = 0;
      let definiteEdge = [];
      for(let m = 0; m < edgesConnected[n].length; m++){
        if(edgesConnected[n][m].state == 2){
          counter += 1;
        }else if(edgesConnected[n][m].state == 0){
          definiteEdge.push(edgesConnected[n][m]);
        }
      }
      if(counter == edgesConnected[n].length-1){
        definiteEdges.push(definiteEdge[0]);
      }
    }
    if(definiteEdges.length > 0 && Array.isArray(definiteEdges) && typeof definiteEdges[0] != "undefined"){
      return definiteEdges;
    }else{
      return false;
    }
  }
}


function complete(){
  reset_board();
  starting_techniques();
  backtracking_search();
  clearInterval(clock);
  hintUsed = true;
}

function starting_techniques(){
  //all functions to be run at the beginning of solving
  rule_one();
  Xs_diagonal_to_three();
  adjacent_threes();
  diagonal_threes();
  corner_squares();
  update_board();
}
function line_connecting_to_one(){
  //line connected to a 1 means opposite edges are Xs, given that the line is forced to continue on one of its sides
  for(var i = 0; i < squares.length; i++){
    for(var j = 0; j < squares[i].length; j++){
      if(squares_state(i, j, 1)){
        if((check_one(i, j-1, "horizontal") && check_x(i-1, j, "vertical")) || (check_one(i-1, j, "vertical") && check_x(i, j-1, "horizontal"))){
          change_to_x(i+1, j, "horizontal");
          change_to_x(i, j+1, "vertical");
        }
        if((check_one(i, j+1, "horizontal") && check_x(i-1, j+1, "vertical")) || (check_one(i-1, j+1, "vertical") && check_x(i, j+1, "horizontal"))){
          change_to_x(i+1, j, "horizontal");
          change_to_x(i, j, "vertical");
        }
        if((check_one(i+1, j-1, "horizontal") && check_x(i+1, j, "vertical")) || (check_one(i+1, j, "vertical") && check_x(i+1, j-1, "horizontal"))){
          change_to_x(i, j, "horizontal");
          change_to_x(i, j+1, "vertical");
        }
        if((check_one(i+1, j+1, "horizontal") && check_x(i+1, j+1, "vertical")) || (check_one(i+1, j+1, "vertical") && check_x(i+1, j+1, "horizontal"))){
          change_to_x(i, j, "horizontal");
          change_to_x(i, j, "vertical");
        }
      }
    }
  }
}
function line_connecting_to_three(){
  //line connected to a three means opposite edges can be added
  for(var i = 0; i < squares.length; i++){
    for(var j = 0; j < squares[i].length; j++){
      if(squares_state(i, j, 3)){
        if(check_one(i, j-1, "horizontal") || check_one(i-1, j, "vertical")){
          change_to_one(i+1, j, "horizontal");
          change_to_one(i, j+1, "vertical");
        }
        if(check_one(i, j+1, "horizontal") || check_one(i-1, j+1, "vertical")){
          change_to_one(i+1, j, "horizontal");
          change_to_one(i, j, "vertical");
        }
        if(check_one(i+1, j-1, "horizontal") || check_one(i+1, j, "vertical")){
          change_to_one(i, j, "horizontal");
          change_to_one(i, j+1, "vertical");
        }
        if(check_one(i+1, j+1, "horizontal") || check_one(i+1, j+1, "vertical")){
          change_to_one(i, j, "horizontal");
          change_to_one(i, j, "vertical");
        }
      }
    }
  }
}
function Xs_diagonal_to_three(){
  //if a 3 has Xs diagonal to it, add known edges
  for(var i = 0; i < squares.length; i++){
    for(var j = 0; j < squares[i].length; j++){
      if(squares_state(i, j, 3)){
         if(check_x(i, j-1, "horizontal") && check_x(i-1, j, "vertical")){
           horizontalLines[i][j].set_state(1);
           verticalLines[i][j].set_state(1);
         }else if(check_x(i, j+1, "horizontal") && check_x(i-1, j+1, "vertical")){
           horizontalLines[i][j].set_state(1);
           verticalLines[i][j+1].set_state(1);
         }else if(check_x(i+1, j-1, "horizontal") && check_x(i+1, j, "vertical")){
           horizontalLines[i+1][j].set_state(1);
           verticalLines[i][j].set_state(1);
         }else if(check_x(i+1, j+1, "horizontal") && check_x(i+1, j+1, "vertical")){
           horizontalLines[i+1][j].set_state(1);
           verticalLines[i][j+1].set_state(1);
         }
      }

    }
  }
}
function adjacent_threes(){
  //if two or more threes are adjacent, add lines between and on outer edges
  for(var i = 0; i < squares.length; i++){
    for(var j = 0; j < squares[i].length; j++){
      if(squares_state(i, j, 3)){
         if(squares_state(i, j+1, 3)){
           change_to_one(i, j, "vertical");
           change_to_one(i, j+1, "vertical");
           change_to_one(i, j+2, "vertical");
         }else if(squares_state(i+1, j, 3)){
           change_to_one(i, j, "horizontal");
           change_to_one(i+1, j, "horizontal");
           change_to_one(i+2, j, "horizontal");
         }
      }
    }
  }
}
function diagonal_threes(){
  //if two threes are diagonal to each other, put lines connected to outer vertex
  for(var i = 0; i < squares.length; i++){
    for(var j = 0; j < squares[i].length; j++){
      if(squares_state(i, j, 3)){
        if(squares_state(i-1, j-1, 3)){
          change_to_one(i-1, j-1, "horizontal");
          change_to_one(i-1, j-1, "vertical");
          change_to_one(i+1, j, "horizontal");
          change_to_one(i, j+1, "vertical");
        }
        if(squares_state(i-1, j+1, 3)){
          change_to_one(i-1, j+1, "horizontal");
          change_to_one(i-1, j+2, "vertical");
          change_to_one(i+1, j, "horizontal");
          change_to_one(i, j, "vertical");
        }
        if(squares_state(i+1, j-1, 3)){
          change_to_one(i+2, j-1, "horizontal");
          change_to_one(i+1, j-1, "vertical");
          change_to_one(i, j, "horizontal");
          change_to_one(i, j+1, "vertical");
        }
        if(squares_state(i+1, j+1, 3)){
          change_to_one(i+2, j+1, "horizontal");
          change_to_one(i+1, j+2, "vertical");
          change_to_one(i, j, "horizontal");
          change_to_one(i, j, "vertical");
        }
      }
    }
  }
}
function corner_squares(){
  //function applies all corner rules to any number in a corner
  //excluding zero, as zero rules are dealt with in rule_one()
  //One in a corner means Xs for edges connected to the corner vertex
  //Two in a corner means edges connected on either side should = 1
  //Three in a corner means ones for edges connected to the corner vertex
  switch(squares[0][0]){
    case 1:
      change_to_x(0, 0, "horizontal");
      change_to_x(0, 0, "vertical");
      break;
    case 2:
      change_to_one(0, 1, "horizontal");
      change_to_one(1, 0, "vertical");
      break;
    case 3:
      change_to_one(0, 0, "horizontal");
      change_to_one(0, 0, "vertical");
      break;
  }
  switch(squares[0][squares[0].length-1]){
    case 1:
      change_to_x(0, squares[0].length-1, "horizontal");
      change_to_x(0, squares[0].length, "vertical");
      break;
    case 2:
      change_to_one(0, squares[0].length-2, "horizontal");
      change_to_one(1, squares[0].length, "vertical");
      break;
    case 3:
      change_to_one(0, squares[0].length-1, "horizontal");
      change_to_one(0, squares[0].length, "vertical");
      break;
  }
  switch(squares[squares.length-1][0]){
    case 1:
      change_to_x(squares.length, 0, "horizontal");
      change_to_x(squares.length-1, 0, "vertical");
      break;
    case 2:
      change_to_one(squares.length, 1, "horizontal");
      change_to_one(squares.length-2, 0, "vertical");
      break;
    case 3:
      change_to_one(squares.length, 0, "horizontal");
      change_to_one(squares.length-1, 0, "vertical");
      break;
  }
  switch(squares[squares.length-1][squares[0].length-1]){
    case 1:
      change_to_x(squares.length, squares[0].length, "horizontal");
      change_to_x(squares.length-1, squares[0].length+1, "vertical");
      break;
    case 2:
      change_to_one(squares.length, squares[0].length-2, "horizontal");
      change_to_one(squares.length-2, squares[0].length, "vertical");
      break;
    case 3:
      change_to_one(squares.length, squares[0].length-1, "horizontal");
      change_to_one(squares.length-1, squares[0].length, "vertical");
      break;
  }
}
function squares_state(i, j, x){
  //returns true if squares[i][j] == x, false otherwise or if squares[i][j] doesn't exist
  if(squares.hasOwnProperty(i) && squares[i].hasOwnProperty(j)){
    return squares[i][j] == x;
  }else{
    return false;
  }
}
function rule_one(){
  //if a square has enough lines, make all 0s Xs(2s)
  //now do if a square has enough Xs, make all 0s 1s
  for(i=0; i < squares.length; i++){
    for(j=0; j < squares.length; j++){
      if(squares[i][j] == horizontalLines[i][j].remove_x() + horizontalLines[i+1][j].remove_x() + verticalLines[i][j].remove_x() + verticalLines[i][j+1].remove_x()){
        if(horizontalLines[i][j].state == 0){
          horizontalLines[i][j].set_state(2);
        }
        if(horizontalLines[i+1][j].state == 0){
          horizontalLines[i+1][j].set_state(2);
        }
        if(verticalLines[i][j].state == 0){
          verticalLines[i][j].set_state(2);
        }
        if(verticalLines[i][j+1].state == 0){
          verticalLines[i][j+1].set_state(2);
        }
      }
      if(squares[i][j] != 4 && squares[i][j] == 4-((horizontalLines[i][j].remove_one() + horizontalLines[i+1][j].remove_one() + verticalLines[i][j].remove_one() + verticalLines[i][j+1].remove_one())/2)){
        if(horizontalLines[i][j].state == 0){
          horizontalLines[i][j].set_state(1);
        }
        if(horizontalLines[i+1][j].state == 0){
          horizontalLines[i+1][j].set_state(1);
        }
        if(verticalLines[i][j].state == 0){
          verticalLines[i][j].set_state(1);
        }
        if(verticalLines[i][j+1].state == 0){
          verticalLines[i][j+1].set_state(1);
        }
      }
    }
  }
  update_board();
}

function check_exists(i, j, orientation){
  //returns true if edge exists
  if(i >= 0 && j >= 0){
    if(orientation == "horizontal"){
      if(i < horizontalLines.length && j < horizontalLines[i].length){
        return true;
      }
    }else{
      if(i < verticalLines.length && j < verticalLines[i].length){
        return true;
      }
    }
  }
  return false;
}
function check_one(i, j, orientation){
  //returns true if edge == 1, returns false if edge doesn't exist
  if(i >= 0 && j >= 0){
    if(orientation == "horizontal"){
      if(i < horizontalLines.length && j < horizontalLines[i].length){
        if(horizontalLines[i][j].state == 1){
          return true;
        }
      }
    }else{
      if(i < verticalLines.length && j < verticalLines[i].length){
        if(verticalLines[i][j].state == 1){
          return true;
        }
      }
    }
  }
  return false;
}
function check_x(i, j, orientation){
  //returns true if edge == x, or if edge doesn't exist
  if(i >= 0 && j >= 0){
    if(orientation == "horizontal"){
      if(i < horizontalLines.length && j < horizontalLines[i].length){
        if(horizontalLines[i][j].state == 2){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    }else{
      if(i < verticalLines.length && j < verticalLines[i].length){
        if(verticalLines[i][j].state == 2){
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
        horizontalLines[i][j].set_state(2);
      }
    }else if(i < verticalLines.length && j < verticalLines[i].length){
      verticalLines[i][j].set_state(2);
    }
  }
}
function change_to_one(i, j, orientation){
  //changes i, j, orientation to 1 with checks
  if(i >= 0 && j >= 0){
    if(orientation == "horizontal"){
      if(i < horizontalLines.length && j < horizontalLines[i].length){
        horizontalLines[i][j].set_state(1);
      }
    }else if(i < verticalLines.length && j < verticalLines[i].length){
      verticalLines[i][j].set_state(1);
    }
  }
}
function rule_two() {
  //Rule 2: if one point has two edges connecting, the other two are empty
  //If one point has 3 Xs, the fourth edge must be an X too
  for(i=0; i <= squares.length; i++){
    for(j=0; j <= squares.length; j++){
      if(check_one(i, j, "horizontal")){
        if(check_one(i, j, "vertical")){
          //Checks right and bottom
          change_to_x(i-1, j, "vertical");
          change_to_x(i, j-1, "horizontal");
        }
        if(check_one(i, j-1, "horizontal")){
          //Checks left and right (consecutive horizontal lines)
          change_to_x(i-1, j, "vertical");
          change_to_x(i, j, "vertical");
        }
        if(check_one(i-1, j, "vertical")){
          //Checks right and top
          change_to_x(i, j-1, "horizontal");
          change_to_x(i, j, "vertical");
        }
        if(check_one(i, j+1, "vertical")){
          //Checks left and bottom
          change_to_x(i, j+1, "horizontal");
          change_to_x(i-1, j+1, "vertical");
        }
      }
      if(check_one(i, j, "vertical")){
        //Checks top and bottom
        if(check_one(i+1, j, "vertical")){
          change_to_x(i+1, j, "horizontal");
          change_to_x(i+1, j-1, "horizontal");
        }
        //checks top and left
        if(check_one(i+1, j-1, "horizontal")){
          change_to_x(i+1, j, "horizontal");
          change_to_x(i+1, j, "vertical");
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
    }
  }
  update_board();
  //edges need finishing out of for loop
  //Solution checker next
}

function is_equal(first, second){
  return JSON.stringify(first) === JSON.stringify(second);
}
function miniloop(start){
  //returns array of miniloop, unless given edge != 1 (then it returns false)
  //a = [[orientation, i, j], [orientation, i, j], [orientation, i, j]...];
  //if miniloop loops then check_solution(), if not solved then "solution" is incorrect
  //check edge added is not part of loop already
  //check start of loop == 1
  if(start.state == 1){
    a = [start];
    b = [start];
  }else{
    return false;
  }
  while(b.length != 0){
    temp = b[0].find_ones_connected();
    //check for connnections that aren't already found
    if(temp){
      if(temp.length == 1){
        if(!a.some(e => is_equal([e], temp))){
          a.push(temp[0]);
          b.push(temp[0]);
        }
      }else{
        for(i = 0; i < temp.length; i++){
          if(!a.some(e => is_equal(e, temp[i]))){
            a.push(temp[i]);
            b.push(temp[i]);
          }
        }
      }
    }
    b.shift();
  }
  return a;
}
function miniloops(){
  //returns array of all miniloops
  loops = [];
  allLines = [];
  for(i = 0; i < horizontalLines.length; i++){
    for(j = 0; j < horizontalLines[i].length; j++){
      allLines.push(horizontalLines[i][j]);
      allLines.push(verticalLines[j][i]);
    }
  }
  while(allLines.length > 0){
    temp = miniloop(allLines[0]);
    if(temp){
      loops.push(temp);
      for(x = 0; x < temp.length; x++){
        index = allLines.indexOf(temp[x]);
        allLines.splice(index, 1);
      }
    }else{
      //remove from allLines
      allLines.shift();
    }
  }
  set_endpoints();
  return loops;
}
function set_endpoints(){
  //sets endpoints for all lines
  for(i=0; i < horizontalLines.length; i++){
    for(j=0; j < horizontalLines[i].length; j++){
      if(horizontalLines[i][j].state == 1 && horizontalLines[i][j].find_ones_connected().length != 2){
        horizontalLines[i][j].end_point = true;
      }else{
        horizontalLines[i][j].end_point = false;
      }
    }
  }
  for(i=0; i < verticalLines.length; i++){
    for(j=0; j < verticalLines[i].length; j++){
      if(verticalLines[i][j].state == 1 && verticalLines[i][j].find_ones_connected().length != 2){
        verticalLines[i][j].end_point = true;
      }else{
        verticalLines[i][j].end_point = false;
      }
    }
  }
}

function rule_three() {
  //check end of loops for definite paths
  //e.g. end of loop connected to two Xs or an edge and an X
  //if a point connects 2 Xs and a 1, the last edge must be a 1
  allLoops = miniloops();
  set_endpoints();
  //if end of loop has definite path, add to loop, set state = 1, make end_point, remove old end_point
  for(i = 0; i < allLoops.length; i++){
    allLoopsLength = allLoops[i].length;
    for(j = 0; j < allLoopsLength; j++){
      if(allLoops[i][j].end_point == true){
        newEdges = allLoops[i][j].find_definite_path();
        if(newEdges != false){
          for(n = 0; n < newEdges.length; n++){
            allLoops[i][j].end_point = false;
            newEdges[n].end_point = true;
            newEdges[n].set_state(1);
            allLoops[i].push(newEdges[n]);
            allLoopsLength += 1;
          }
        }

      }
    }
  }
  update_board();
}
function rule_four(){
  //cycle through end points of miniloops
  //if two end points of the same loop can be connected by an edge (connector)
  //connector.state = 1
  //if(check_solution()){done
  //}else{connector.state = 2}
  allLoops = miniloops();
  for(c = 0; c < allLoops.length; c++){
    endPoints = [];
    for(d = 0; d < allLoops[c].length; d++){
      if(allLoops[c][d].end_point){
        endPoints.push(allLoops[c][d]);
      }
    }
    if(endPoints.length == 2){
      possibleEdges = [];
      for(e = 0; e < endPoints.length; e++){
        possibleEdges.push([].concat.apply([], endPoints[e].find_possibilities_connected()));
      }
      for(e = 0; e < possibleEdges.length-1; e++){
        for(f = 0; f < possibleEdges[e].length; f++){
          for(g = 0; g < possibleEdges[e+1].length; g++){
            if(is_equal(possibleEdges[e][f], possibleEdges[e+1][g])){
              //if connector.state == 1 or 2, ignore
              if(possibleEdges[e][f].state == 0){
                possibleEdges[e][f].state = 1;
                if(check_solution()){
                  return;
                }else{
                  possibleEdges[e][f].change_state(2);
                }
              }
            }
          }
        }
      }
    }
  }
  update_board();
}
//create copy before calling (array of arrays?)
function backtracking_search(edge_to_add){
  update_board();
  if(typeof edge_to_add !== "undefined"){
    //check for miniloop and number rules broken, also check if any point has 3 or 4 lines
    if(immediate_mistake(edge_to_add)){

      return false;
    }
    depth_counter += 1;
    //add edge_to_add
    edge_to_add.set_state(1);
  }
  //Apply rules in a loop
  do{
    stateChanged = false;
    rule_one();
    rule_two();
    rule_three();
    rule_four();

    Xs_diagonal_to_three();
    line_connecting_to_three();
    line_connecting_to_one();

    //if mistake made, reverse changes and return false
    if(mistake_made()){
      reverse_changes();
      return false;
    }
    //if solved, return true
    if(check_solution()){
      return true;
    }
  }while(stateChanged);
  //else:
  let success = false;
  //use find_possibilities_connected() to find the possible continuations
  //if find_possibilities_connected() returns null/empty, reverse changes

  let endPoint;
  let options;
  try{
    endPoint = find_endpoint();
    options = endPoint.find_possibilities_connected();
  }catch(err){
    reverse_changes();
    return false;
  }
  if(options.length <= 0){
    reverse_changes();
    return false;
  }
  //loop through possible continuations until solution found,
  //or all possible continuations found to be incorrect, in which case undo and backtrack
  for(let i=0; i < options.length; i++){
    for(let j=0; j < options[i].length; j++){
      if(options[i][j].state == 0 && !success){
        success = backtracking_search(options[i][j]);
        if(success){
          return true;
        }
      }
    }
  }
  reverse_changes();
  return false;
}
function find_endpoint(){
  //returns a random endpoint of a miniloop
  let allLoops = miniloops();
  let max = -Infinity;
  let i = -1;
  allLoops.forEach((item, n) => {
    if (item.length > max) {
      max = item.length;
      i = n;
    }
  });
  for(let j=0; j < allLoops[i].length; j++){
    if(allLoops[i][j].end_point == true){
      return allLoops[i][j];
    }
  }
}
function immediate_mistake(edge_to_add){
  //returns true if immediate mistake made, false otherwise
  //check if adding line connects 3 or 4 lines
  counter = 0;
  if(edge_to_add.orientation == "horizontal"){
    if(check_one(edge_to_add.i, edge_to_add.j-1, "horizontal")){
      counter += 1;
    }
    if(check_one(edge_to_add.i, edge_to_add.j, "vertical")){
      counter += 1;
    }
    if(check_one(edge_to_add.i-1, edge_to_add.j, "vertical")){
      counter += 1;
    }
    if(counter >= 2){
      return true;
    }
    counter = 0;
    if(check_one(edge_to_add.i, edge_to_add.j+1, "horizontal")){
      counter += 1;
    }
    if(check_one(edge_to_add.i, edge_to_add.j+1, "vertical")){
      counter += 1;
    }
    if(check_one(edge_to_add.i-1, edge_to_add.j+1, "vertical")){
      counter += 1;
    }
    if(counter >= 2){
      return true;
    }
    //check for number rules broken
    if(return_square(edge_to_add.i, edge_to_add.j) < 1+check_one(edge_to_add.i, edge_to_add.j, "vertical")+check_one(edge_to_add.i+1, edge_to_add.j, "horizontal")+check_one(edge_to_add.i, edge_to_add.j+1, "vertical")){
      return true;
    }
    if(return_square(edge_to_add.i-1, edge_to_add.j) < 1+check_one(edge_to_add.i-1, edge_to_add.j, "vertical")+check_one(edge_to_add.i-1, edge_to_add.j, "horizontal")+check_one(edge_to_add.i-1, edge_to_add.j+1, "vertical")){
      return true;
    }
  }else{
    if(check_one(edge_to_add.i, edge_to_add.j-1, "horizontal")){
      counter += 1;
    }
    if(check_one(edge_to_add.i, edge_to_add.j, "horizontal")){
      counter += 1;
    }
    if(check_one(edge_to_add.i-1, edge_to_add.j, "vertical")){
      counter += 1;
    }
    if(counter >= 2){
      return true;
    }
    counter = 0;
    if(check_one(edge_to_add.i+1, edge_to_add.j, "horizontal")){
      counter += 1;
    }
    if(check_one(edge_to_add.i+1, edge_to_add.j-1, "horizontal")){
      counter += 1;
    }
    if(check_one(edge_to_add.i+1, edge_to_add.j, "vertical")){
      counter += 1;
    }
    if(counter >= 2){
      return true;
    }
    //check for number rules broken
    if(return_square(edge_to_add.i, edge_to_add.j) < 1+check_one(edge_to_add.i, edge_to_add.j, "horizontal")+check_one(edge_to_add.i+1, edge_to_add.j, "horizontal")+check_one(edge_to_add.i, edge_to_add.j+1, "vertical")){
      return true;
    }
    if(return_square(edge_to_add.i, edge_to_add.j-1) < 1+check_one(edge_to_add.i+1, edge_to_add.j-1, "horizontal")+check_one(edge_to_add.i, edge_to_add.j-1, "horizontal")+check_one(edge_to_add.i, edge_to_add.j-1, "vertical")){
      return true;
    }
  }
  //check for miniloop created
  edge_to_add.state = 1;
  loop = miniloop(edge_to_add);
  set_endpoints();
  for(i=0; i < loop.length; i++){
    if(loop[i].end_point == true){
      edge_to_add.state = 0;
      return false;
      //return false as no loop created
    }
  }
  if(check_solution()){
    edge_to_add.state = 0;
    return false;
  }
  edge_to_add.state = 0;
  return true;
}
function return_square(i, j){
  //returns squares[i][j] if square exists, 4 otherwise
  if(i >= 0 && j >= 0 && i < squares.length && j < squares[i].length){
    return squares[i][j];
  }else{
    return 4;
  }
}
/*
function save_board_state(){
  //keeps a record of the current board state in order to reverse changes
  horizontalLines.forEach((part, i) => {
    horizontalLines[i].forEach((item, j) => {
      horizontalTemp[i][j] = horizontalLines[i][j].state;
    });
  });

  verticalLines.forEach((part, i) => {
    verticalLines[i].forEach((item, j) => {
      verticalTemp[i][j] = verticalLines[i][j].state;
    });
  });
  horizontalLinesTemps.push(horizontalTemp);
  verticalLinesTemps.push(verticalTemp);
}
function reverse_board_state(){
  //takes the board state back to the last saved state
  horizontalLines.forEach((part, i) => {
    horizontalLines[i].forEach((item, j) => {
      horizontalLines[i][j].set_state(horizontalLinesTemps[horizontalLinesTemps.length-1][i][j]);
    });
  });
  verticalLines.forEach((part, i) => {
    verticalLines[i].forEach((item, j) => {
      verticalLines[i][j].set_state(verticalLinesTemps[verticalLinesTemps.length-1][i][j]);
    });
  });
  horizontalLinesTemps.pop();
  verticalLinesTemps.pop();
}
*/
function reverse_changes(){
  //sets state of all lines with depth = depth_counter to 0
  //depth_counter -= 1
  for(i=0; i < horizontalLines.length; i++){
    for(j=0; j < horizontalLines[i].length; j++){
      if(horizontalLines[i][j].depth == depth_counter){
        horizontalLines[i][j].reverse_state();
      }
    }
  }
  for(i=0; i < verticalLines.length; i++){
    for(j=0; j < verticalLines[i].length; j++){
      if(verticalLines[i][j].depth == depth_counter){
        verticalLines[i][j].reverse_state();
      }
    }
  }
  depth_counter -= 1;
}

function mistake_made(){
  //returns false if no mistake made, returns true if mistake made
  for(i=0; i < squares.length; i++){
    for(j=0; j < squares.length; j++){
      //check no vertexs have 3 or 4 lines connected
      counter = 0;
      if(check_one(i, j, "horizontal")){
        counter += 1;
      }
      if(check_one(i, j-1, "horizontal")){
        counter += 1;
      }
      if(check_one(i, j, "vertical")){
        counter += 1;
      }
      if(check_one(i-1, j, "vertical")){
        counter += 1;
      }
      if(counter > 2){
        return true;
      }

      //check numbers aren't overloaded (e.g. 3 lines around a 2)
      if(squares[i][j] != 4){
        if(squares[i][j] < horizontalLines[i][j].remove_x() + horizontalLines[i+1][j].remove_x() + verticalLines[i][j].remove_x() + verticalLines[i][j+1].remove_x()){
          return true;
        }
        //check numbers don't have too many Xs around them
        if((4-squares[i][j]) < (horizontalLines[i][j].remove_one() + horizontalLines[i+1][j].remove_one() + verticalLines[i][j].remove_one() + verticalLines[i][j+1].remove_one())/2){
          return true;
        }
      }
    }
  }
  return false;
}

function numbers_satisfied(){
  //returns true if all numbers have the correct number of edges around it
  //returns false otherwise
  for(i = 0; i < squares.length; i++){
    for(j = 0; j < squares.length; j++){
      //ignore blank squares
      if(squares[i][j] != 4){
        if(squares[i][j] != horizontalLines[i][j].remove_x() + horizontalLines[i+1][j].remove_x() + verticalLines[i][j].remove_x() + verticalLines[i][j+1].remove_x()){
          return false;
        }
      }
    }
  }
  return true;
}
function vertex_rule_satisfied(){
  //if all points have zero or two edges connected, return true
  for(i=0; i <= squares.length; i++){
    for(j=0; j <= squares.length; j++){
      counter = 0;
      if(check_one(i, j, "horizontal")){
        counter += 1;
      }
      if(check_one(i, j-1, "horizontal")){
        counter += 1;
      }
      if(check_one(i, j, "vertical")){
        counter += 1;
      }
      if(check_one(i-1, j, "vertical")){
        counter += 1;
      }
      if(!(counter == 0 || counter == 2)){
        return false;
      }
    }
  }
  return true;
}
function check_solution(){
  //returns true if puzzle solved, false otherwise
  //if more than one loop, return false
  if(miniloops().length > 1){
    return false;
  }
  //if any numbers are not satisfied, return false
  if(!numbers_satisfied()){
    return false;
  }
  //if any point has 1, 3 or 4 edges connected, return false
  if(!vertex_rule_satisfied()){
    return false;
  }
  return true;
}







depth_counter = 1;
stateChanged = false;
var clock;
hintUsed = false;
var current_puzzle;
var uploaded = false;
var undo_record = [];
var redo_record = [];
var xToggled = false;


window.oncontextmenu = function(e){ e.preventDefault();}
