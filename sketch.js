let letters = [];
let instructions = [];
let margin = 80; 
let roamer = { x: 1, y: 0, t: 0, char: '§' };

let poem = `54.
                    sekhmet. 
                 serpents, I am 
               the grass 
            they slither through, 
        weeds coding weeds in 
     the rhizome. we are 
   hungry for babęl, its 
 ancient mouth now 
 drawing near, I feel 
hot breath on 
 tangent skin, 
diamonds push 
 across in 
  dataframe time. 
   this sunset meets 
     like lips 
      on the 
       corners of 
         thighs 
          in the 
            corners of
             the stareyes 
               of night. 
               glaring, 
               hung low. 
              dark and under, I am 
           rising 
        to meet 
       you 
     once 
   again. 

55. Some are fiction in the 
              frame. I've known shame as
             the hustle of needs 
         grows on you. You 
        get up because moving is what you do 
     what keeps you safe. And 
  that's the lick, you buy in 
 and run your trade, or they're sure 
to take 
 You down 
   hades way. 

#2666 the goal of the system is to remove the cost of all labor and acquire only wealth; currencies that produce only currency in the grind is all that matters in the system. 
   a veneered reality is traveling towards us, a façade of illusions in media and our consumptions. 
   the machine must be fed.
   brvnew wrld2.0 order.
   adapt sobriquet adopt nom de plume adept nom de guerre. 
   mind scanning algorithms thwarting resistance, ensuring joi de vivre, suckling at the milkmeats of preoccupation.
   siblings, know this..
   siblings, this is war.
   the machine will be fed. 
   & we shall feed it death. ☠️
.                         404dante

#27 
                     the glass(sic) 
                    it moistmoves, it's in 
                   the wetwere, we.where
                 Coldfire on 
              nOrmandy X bradbury.exe 
            and I'm on file - it did run, 
         West King, I owe
       him a trip for
    sure. this anon nano injected, 
fills up the dedlead in the iris- and 
j am.damand damaged good. take 
that track, rewind it back. 
Aiysb narrowed her eyes. 
I’am nit a reader. 
pulse wet. 
that's the end.
(sic)

#28. mise en function 

… corrupts disruption 
It's bursting for the dryline 
enter admin acc } { facing batch 

— — — telling marks the swagger add
as klemmer is king here z he punches out the feed and turns a corner. he runs another patch - this is all party line.
“You looking to light up, mate?” Maze filled eyes are glaring at him. 
“no thanks, but here's a box I need you to hold” klemmer slides a keypad into the contacts palm and a heavy credit trade to boot just whizzing by, then they trod off into wet alleyways beyond. Klemmer climbs into the control pod of their ride and set off to the outer edge by the transat launch…


556. 
       five 
           five 
               six. 
                she was in love 
               with the letters and the 
             lattice working they shaped, 
           as tongues toed edges of 
         occult sighs to sigils claim 
    and calling out to old gods of seas 
now lost tectonically. letters hit 
a dream mode and there is 
no light no lie no confession 
  that sparks the heart more 
      than a truth unearthed, 
          a secret apparatus 
            in the pit 
                of your 
                    palm.`;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('garamond');
  textSize(26);
  
  roamer.x = width / 5;
  roamer.y = height / 5;

  spawnInstructions(poem);
}

function draw() {
  // Keeps the canvas locked to the screen
  let canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.style.position = 'Relative';
    canvas.style.top = '0';
    canvas.style.left = '0';
  }
  
  background(0);

  // 1. ROAMER LOGIC
  roamer.x = noise(roamer.t) * width;
  roamer.y = noise(roamer.t + 500) * height;
  roamer.t += 0.005;

  // Trail
  if (frameCount % 4 === 0) {
    letters.push({
      char: String.fromCharCode(33 + floor(random(93))),
      x: roamer.x,
      y: roamer.y,
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5),
      alpha: 150 
    });
  }

  fill(183, 65, 14, 200);
  text(roamer.char, roamer.x, roamer.y);

  // 2. POEM LOGIC (The Rising Loop)
  for (let i = instructions.length - 1; i >= 0; i--) {
    let inst = instructions[i];
    
    // DRIFT SPEED: Keep this low for a "long" feeling
    inst.y -= 1.77; 

    let dRoamer = dist(inst.x + (textWidth(inst.txt)/2), inst.y, roamer.x, roamer.y);
    let dMouse = dist(inst.x + (textWidth(inst.txt)/2), inst.y, mouseX, mouseY);
    
    let lineJitter = 0.8; 
    let triggerDist = 120;

    if (dRoamer < triggerDist || dMouse < triggerDist) {
      let closestD = min(dRoamer, dMouse);
      lineJitter = map(closestD, triggerDist, 0, 0.8, 50); 
      inst.alpha -= 5; 
    } else {
      // SLOW NATURAL FADE: This allows the "page" to last longer
      inst.alpha -= 0.1; 
    }

    fill(183, 65, 14, inst.alpha);
    
    let jX = random(-lineJitter, lineJitter);
    let jY = random(-lineJitter, lineJitter);

    let glitchX = 0;
    if (frameCount % 60 === 0 && random(1) > 0.97) {
      glitchX = random(-200, 200); 
    }
    
    text(inst.txt, inst.x + glitchX + jX, inst.y + jY);
    
    // Remove if faded or gone far off the top
    if (inst.alpha <= 0 || inst.y < -100) {
      instructions.splice(i, 1);
    }
  }

  // 3. TRAIL LOGIC
  for (let i = letters.length - 1; i >= 0; i--) {
    let l = letters[i];
    l.x += l.vx;
    l.y += l.vy;
    l.alpha -= 1;
    fill(183, 65, 14, l.alpha); 
    text(l.char, l.x, l.y);
    if (l.alpha <= 0) letters.splice(i, 1);
  }

  // 4. LOOPING: When the last line is gone, start over
  if (instructions.length === 0) {
    spawnInstructions(poem);
  }
}

function spawnInstructions(content) {
  let lines = content.split('\n');
  
  // LINE HEIGHT: Setting this to 100 makes the "page" feel much longer
  let lineHeight = 15; 
  
  for (let j = 0; j < lines.length; j++) {
    instructions.push({
      txt: lines[j],
      x: margin,
      // Start below the screen and stack them deep
      y: height + (j * lineHeight), 
      // Higher Alpha means the lines survive the slow climb better
      alpha: 1000 
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
