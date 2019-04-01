let map_img;

let tv_img;

let table;
let name;
let show;
let img = []; // image array
let x;
let y;


function preload(){
  for(let i=0; i<50; i++){
      img[i] = loadImage('images/' + i + '.jpg') //loads in all images of netlix shows numbered 0 to 49
  }
  table = loadTable ("data/netflixshowsbystate.csv", "header"); //loads CSV file into table object
  map_img = loadImage('images/map.png')
  tv_img = loadImage('images/tv.png')

}

function setup(){
  createCanvas(1225, 710);
  loadData(); //calls load table data function
  imageMode (CENTER);
}

function draw(){
  background (255);

  //displays grey background image
  image(tv_img, 613, 355, tv_img.width/1.4, tv_img.height/1.4);
  

  //displays map
  push();
  image(map_img, 613, 355, map_img.width, map_img.height);
  pop();
  
  //calls the functions under the state array
  for (var i = 0; i<states.length; i++){
    states[i].display();
    states[i].rollover(mouseX, mouseY);
  }
}


//loads data from csv file 
function loadData(){

  states = []; //size of state array determined by number of rows in CSV file

  //iterates over all the rows in the table
  for (var i=0; i < table.getRowCount(); i++){
    var row = table.getRow(i); 

    //access each field via its column name
    x = row.get("x");
    y = row.get ("y");
    name = row.get("name");
    show = row.get ("show");

    //make new state abbreviation out of the data read
    states[i] = new State (x, y, name, show, img[i]);
}
}

//creates a class of states
class State {
  constructor(x, y, n, s, im) {
      this.x = Number(x);
      this.y = Number(y);
      this.name = n;
      this.show = s;
      this.img = im;
      this.isclicked = false;
      }
  
  //check to see if mouse is over abbreviation
  rollover (px, py){
      var d = dist (px, py, this.x, this.y);
      if (d < 7.5){ //half of text size
          this.over = true;
      }
      else {
          this.over = false;
      }
  }

  //displays the state abbreviations 
  display(){
     fill(0);
     textSize(15);
     textAlign(CENTER);
     text (this.name, this.x, this.y); //abbreviation

     //if mouse is over the abbreviation then display show name and image
     if (this.over) {
        push();
        textSize(60);
        textFont('Bangers');
        text(this.name + '-> ' + this.show, 612, 80) //displays abbreviation & show's name on top of page
        image(this.img, this.x, this.y, this.img.width/5, this.img.height/5); //displays image
        pop();
        
  }
}
}