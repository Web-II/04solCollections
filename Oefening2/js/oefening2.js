/** We gaan er vanuit dat de slang altijd uit minstens 3 vierkanten bestaat, anders moeten we nog een paar testen toevoegen
 * Er wordt ook gewerkt met veelvouden van 10 voor de posities
 * **/
class Vierkant {
  constructor(x, y, kleur) {
    this.x = x;
    this.y = y;
    this.kleur = kleur;
  }

  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
  }
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
  }
  get kleur() {
    return this._kleur;
  }
  set kleur(value) {
    this._kleur = value;
  }
  get zijde() {
    return 10;
  }
}

class Slang {
  constructor() {
    this.vierkanten = [];
    this.dx = 0;
    this.dy = -10;
  }

  get vierkanten() {
    return this._vierkanten;
  }

  set vierkanten(value) {
    this._vierkanten = value;
  }

  get dx() {
    return this._dx;
  }

  set dx(value) {
    this._dx = value;
  }

  get dy() {
    return this._dy;
  }

  set dy(value) {
    this._dy = value;
  }
}

class Spel {
  constructor(zijdeCanvas) {
    this.doel = new Vierkant(0, 0, 'red');
    this.slang = new Slang();
    this.zijdeCanvas = zijdeCanvas;
    this.aantalDoelen = 0;
    this.initialiseer();
  }

  get doel() {
    return this._doel;
  }
  set doel(value) {
    this._doel = value;
  }
  get slang() {
    return this._slang;
  }
  set slang(value) {
    this._slang = value;
  }
  get zijdeCanvas() {
    return this._zijdeCanvas;
  }
  set zijdeCanvas(value) {
    this._zijdeCanvas = value;
  }
  get aantalDoelen() {
    return this._aantalDoelen;
  }
  set aantalDoelen(value) {
    this._aantalDoelen = value;
  }

  initialiseer() {
    // Het doel in het midden neerzetten
    const pos = Math.floor(this._zijdeCanvas / 20) * 10;
    this._doel.x = pos;
    this._doel.y = pos;

    // De slang bestaat uit 3 vierkanten + staat tussen de linkerrand en het doel
    const pos2 = Math.floor(this._zijdeCanvas / 40) * 10;
    this._slang.vierkanten.push(new Vierkant(pos2, pos, 'black'));
    this._slang.vierkanten.push(new Vierkant(pos2, pos + 10, 'blue'));
    this._slang.vierkanten.push(new Vierkant(pos2, pos + 20, 'blue'));
  }

  richtingSlangInstellen(dx, dy) {
    this._slang.dx = dx;
    this._slang.dy = dy;
  }

  speel() {
    this.checkKopSlangOpDoel();
    this.verplaatsSlang();
  }

  checkKopSlangOpDoel() {
    if (
      this._slang.vierkanten[0].x === this._doel.x &&
      this._slang.vierkanten[0].y === this._doel.y
    ) {
      const lengteSlang = this._slang.vierkanten.length;
      this._slang.vierkanten.push(
        new Vierkant(
          this._slang.vierkanten[lengteSlang - 1].x,
          this._slang.vierkanten[lengteSlang - 1].y,
          'blue'
        )
      );

      // doel krijgt nieuwe random positie
      this._doel.x = Math.floor(Math.random() * this._zijdeCanvas / 10) * 10;
      this._doel.y = Math.floor(Math.random() * this._zijdeCanvas / 10) * 10;

      // aantalDoelen wordt met 1 verhoogd
      this._aantalDoelen++;
    }
  }

  verplaatsSlang() {
    const lengteSlang = this._slang.vierkanten.length;
    for (let i = lengteSlang - 1; i > 0; i--) {
      this._slang.vierkanten[i].x = this._slang.vierkanten[i - 1].x;
      this._slang.vierkanten[i].y = this._slang.vierkanten[i - 1].y;
    }
    this._slang.vierkanten[0].x += this._slang.dx;
    this._slang.vierkanten[0].y += this._slang.dy;
    if (this._slang.vierkanten[0].x <= 0)
      this._slang.vierkanten[0].x += this._zijdeCanvas;
    if (this._slang.vierkanten[0].y <= 0)
      this._slang.vierkanten[0].y += this._zijdeCanvas;
    if (this._slang.vierkanten[0].x >= this._zijdeCanvas)
      this._slang.vierkanten[0].x -= this._zijdeCanvas;
    if (this._slang.vierkanten[0].y >= this._zijdeCanvas)
      this._slang.vierkanten[0].y -= this._zijdeCanvas;
  }
}

class SpelComponent {
  constructor(window) {
    this._window = window;
    this._cv = document.getElementById('gameCanvas');
    this._ctx = this._cv.getContext('2d');
    this._spel = new Spel(this._cv.width);
    this.tekenSpel();
  }

  get spel() {
    return this._spel;
  }

  tekenSpel() {
    // Maak achtergrond leeg
    this._ctx.clearRect(0, 0, this._cv.width, this._cv.height);
    // Teken Doel
    this._ctx.fillStyle = this._spel.doel.kleur;
    this._ctx.fillRect(
      this._spel.doel.x,
      this._spel.doel.y,
      this._spel.doel.zijde,
      this._spel.doel.zijde
    );
    // Teken slang
    this._spel.slang.vierkanten.map((value, index, array) => {
      this._ctx.fillStyle = value.kleur;
      this._ctx.fillRect(value.x, value.y, value.zijde, value.zijde);
    })
    document.getElementById(
      'opgegetenDoelen'
    ).innerHTML = this._spel.aantalDoelen;
  }

  speelSpel() {
    this._spel.speel();
    this.tekenSpel();
  }
}

function init() {
  const spelComponent = new SpelComponent(this);
  document.onkeydown = function(event) {
    // pijltjestoets naar links
    if (event.keyCode === 37) {
      spelComponent.spel.richtingSlangInstellen(-10, 0);
    } else if (event.keyCode === 38) {
      // pijltjestoets naar boven
      spelComponent.spel.richtingSlangInstellen(0, -10);
    } else if (event.keyCode === 39) {
      // pijltjestoets naar rechts
      spelComponent.spel.richtingSlangInstellen(10, 0);
    } else if (event.keyCode === 40) {
      // pijltjestoets naar beneden
      spelComponent.spel.richtingSlangInstellen(0, 10);
    }
    spelComponent.speelSpel();
  };

  // Als je wil dat de slang vanzelf beweegt, kan je het 
  // volgende stukje uit commentaar zetten
  // In essentie wil dit zeggen dat de functie speelSpel 
  // iedere 200 ms uitgevoerd wordt
  
  setInterval(function() {
    spelComponent.speelSpel();
  }, 200);
  

}


window.onload = init;
