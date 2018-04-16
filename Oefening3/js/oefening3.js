class Cirkel {
  constructor(x, y, straal, kleur) {
    this.x = x;
    this.y = y;
    this.straal = straal;
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
  get straal() {
    return this._straal;
  }
  set straal(value) {
    this._straal = value;
  }
  get kleur() {
    return this._kleur;
  }
  set kleur(value) {
    this._kleur = value;
  }
}

class Lijnstuk {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  get x1() {
    return this._x1;
  }
  set x1(value) {
    this._x1 = value;
  }
  get y1() {
    return this._y1;
  }
  set y1(value) {
    this._y1 = value;
  }
  get x2() {
    return this._x2;
  }
  set x2(value) {
    this._x2 = value;
  }
  get y2() {
    return this._y2;
  }
  set y2(value) {
    this._y2 = value;
  }
}

class Spel {
  constructor(canvas) {
    // de groene cirkel
    this.speler = new Cirkel(15, 15, 10, 'green');
    // de paarse cirkel
    this.doel = new Cirkel(225, 285, 10, 'purple');
    this.aantalKliks = 0;
    this.lijnstukken = [
      new Lijnstuk(0, 0, canvas.width, 0),
      new Lijnstuk(canvas.width, 0, canvas.width, canvas.height),
      new Lijnstuk(0, canvas.height, canvas.width, canvas.height),
      new Lijnstuk(0, 0, 0, 300),
      new Lijnstuk(30, 30, 30, 270),
      new Lijnstuk(60, 30, 60, 90),
      new Lijnstuk(90, 30, 90, 60),
      new Lijnstuk(120, 0, 120, 30),
      new Lijnstuk(150, 30, 150, 60),
      new Lijnstuk(150, 30, 210, 30),
      new Lijnstuk(180, 30, 180, 150),
      new Lijnstuk(210, 60, 210, 90),
      new Lijnstuk(60, 60, 120, 60),
      new Lijnstuk(120, 60, 120, 180),
      new Lijnstuk(150, 150, 180, 150),
      new Lijnstuk(150, 120, 150, 150),
      new Lijnstuk(30, 120, 90, 120),
      new Lijnstuk(90, 90, 90, 120),
      new Lijnstuk(60, 150, 120, 150),
      new Lijnstuk(60, 150, 60, 180),
      new Lijnstuk(120, 180, 150, 180),
      new Lijnstuk(120, 90, 240, 90),
      new Lijnstuk(60, 210, 60, 270),
      new Lijnstuk(60, 270, 180, 270),
      new Lijnstuk(180, 240, 180, 270),
      new Lijnstuk(90, 240, 180, 240),
      new Lijnstuk(60, 210, 180, 210),
      new Lijnstuk(180, 180, 180, 210),
      new Lijnstuk(180, 180, 210, 180),
      new Lijnstuk(210, 120, 210, 300),
      new Lijnstuk(90, 180, 90, 210)
    ];
  }
  get speler() {
    return this._speler;
  }
  set speler(value) {
    this._speler = value;
  }
  get doel() {
    return this._doel;
  }
  set doel(value) {
    this._doel = value;
  }
  get aantalKliks() {
    return this._aantalKliks;
  }
  set aantalKliks(value) {
    this._aantalKliks = value;
  }
  get lijnstukken() {
    return this._lijnstukken;
  }
  set lijnstukken(value) {
    this._lijnstukken = value;
  }

  verplaatsSpeler(dx, dy) {
    this._speler.x += dx;
    this._speler.y += dy;
  }

  checkBotsingen() {
    this._lijnstukken.map((value, index, array) => {
      if (this.checkSnijpunten(value)) {
        this._speler.x = 15;
        this._speler.y = 15;
      }
    });
  }

  berekenAfstand(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

  checkSnijpunten(lijnstuk) {
    let x1 = lijnstuk.x1;
    let y1 = lijnstuk.y1;
    let x2 = lijnstuk.x2;
    let y2 = lijnstuk.y2;
    if (x1 === x2) {
      let sqrtD = Math.sqrt(
        -2 * this._speler.y * (-2 * this._speler.y) -
          4 *
            (this._speler.y * this._speler.y +
              (x1 - this._speler.x) * (x1 - this._speler.x) -
              this._speler.straal * this._speler.straal)
      );
      let y1Snijpunt = (2 * this._speler.y - sqrtD) / 2;
      let y2Snijpunt = (2 * this._speler.y + sqrtD) / 2;
      if (
        (y1 < y2 && (y1Snijpunt >= y1 && y1Snijpunt <= y2)) ||
        (y2Snijpunt >= y1 && y2Snijpunt <= y2)
      )
        return true;
      if (
        (y2 < y1 && (y1Snijpunt >= y2 && y1Snijpunt <= y1)) ||
        (y2Snijpunt >= y2 && y2Snijpunt <= y1)
      )
        return true;
    }
    if (y1 === y2) {
      let sqrtD = Math.sqrt(
        -2 * this._speler.x * (-2 * this._speler.x) -
          4 *
            (this._speler.x * this._speler.x +
              (y1 - this._speler.y) * (y1 - this._speler.y) -
              this._speler.straal * this._speler.straal)
      );
      let x1Snijpunt = (2 * this._speler.x - sqrtD) / 2;
      let x2Snijpunt = (2 * this._speler.x + sqrtD) / 2;
      if (
        (x1 < x2 && (x1Snijpunt >= x1 && x1Snijpunt <= x2)) ||
        (x2Snijpunt >= x1 && x2Snijpunt <= x2)
      )
        return true;
      if (
        (x2 < x1 && (x1Snijpunt >= x2 && x1Snijpunt <= x1)) ||
        (x2Snijpunt >= x2 && x2Snijpunt <= x1)
      )
        return true;
    }
  }

  checkGewonnen() {
    let afstand = this.berekenAfstand(
      this._speler.x,
      this._speler.y,
      this._doel.x,
      this._doel.y
    );
    return afstand < this._speler.straal + this._doel.straal;
  }

  speel() {
    this.checkBotsingen();
    return this.checkGewonnen();
  }
}

class SpelComponent {
  constructor(window) {
    this._window = window;
    this._cv = window.document.getElementById('tekenCanvas');
    this._ctx = this._cv.getContext('2d');
    this._spel = new Spel(this._cv);
    this.tekenSpel();
  }

  get spel() {
    return this._spel;
  }

  tekenSpel() {
    // Maak achtergrond leeg
    this._ctx.clearRect(0, 0, this._cv.width, this._cv.height);
    // lijnstukken tekenen
    this._spel.lijnstukken.map((value, index, array) => {
      this.tekenSegment('red', value);
    });
    this.tekenCirkel(this._spel.doel);
    this.tekenCirkel(this._spel.speler);
  }

  tekenCirkel(cirkel) {
    // tekenen
    this._ctx.beginPath();
    this._ctx.arc(cirkel.x, cirkel.y, cirkel.straal, 0, 2 * Math.PI, true);
    this._ctx.closePath();
    this._ctx.fillStyle = cirkel.kleur;
    this._ctx.fill();
  }

  tekenSegment(color, segment) {
    this._ctx.beginPath();
    this._ctx.moveTo(segment.x1, segment.y1); //het path start op positie x1,y1
    this._ctx.lineTo(segment.x2, segment.y2); //trek een lijn van startpunt tot eindpunt x2,y2
    this._ctx.closePath();
    this._ctx.strokeStyle = color;
    this._ctx.stroke();
  }

  speelSpel() {
    if (this._spel.speel()) {
            alert("Je hebt het doel bereikt");
            this._spel = new Spel (this._cv);
    }
    this.tekenSpel();
  }
}

function init() {
  const spelComponent = new SpelComponent(this);
  document.onkeydown = function(event) {
    // pijltjestoets naar links
    if (event.keyCode === 37) {
      spelComponent.spel.verplaatsSpeler(-10, 0);
    } else if (event.keyCode === 38) {
      // pijltjestoets naar boven
      spelComponent.spel.verplaatsSpeler(0, -10);
    } else if (event.keyCode === 39) {
      // pijltjestoets naar rechts
      spelComponent.spel.verplaatsSpeler(10, 0);
    } else if (event.keyCode === 40) {
      // pijltjestoets naar beneden
      spelComponent.spel.verplaatsSpeler(0, 10);
    }
    spelComponent.speelSpel();
  };
}

window.onload = init;
