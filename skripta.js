window.onload = function() {
  var forma = document.getElementsByName("forma")[0];
  document.querySelector(".w1").style.display = "none";
  document.querySelector(".w2").style.display = "none";
  document.querySelector(".w3").style.display = "none";
  document.querySelector(".w4").style.display = "none";
  document.querySelector(".w5").style.display = "none";

  popuniDDL();
  fnln.focus();
  others();
  validate();
}

function validate() {
  var fnln   = document.querySelector("#fnln");
  var email  = document.querySelector("#email");
  var mob    = document.querySelector("#mob");
  var pin    = document.querySelector("#pin");
  var city   = document.querySelector("#city");
  fnln.addEventListener("blur", proveriFNLN.bind(null, fnln));
  mob.addEventListener("blur", proveriMob.bind(null, mob));
  pin.addEventListener("blur", proveriPIN.bind(null, pin));
  city.addEventListener("blur", proveriCity.bind(null, city));
  email.addEventListener("blur", zauzetMail.bind(null, email));
  var success = [];
  var inputs  = document.getElementsByName("polje");
  var nizFunkcija = [proveriFNLN(fnln), proveriMob(mob), proveriPIN(pin), proveriCity(city), proveriMail(email), zauzetMail(email)];
  var obvz = document.getElementsByClassName("obvz");

  forma.addEventListener("submit", function(e) {
    document.getElementById("greske").innerHTML = "";
    e.preventDefault();
    if(proveriFNLN(fnln) && proveriMob(mob) && proveriPIN(pin) && proveriCity(city) && proveriMail(email) && zauzetMail(email)) {
      for(var i=0; i < inputs.length; i++) {
        success.push(inputs[i].value);
      }
      document.getElementById("greske").innerHTML = success;
    } else {
      var nisuPopunjeni = "";
      success = [];
      document.getElementById("greske").innerHTML = "Niste dobro popunili:\n"
      for(var f=0; f < nizFunkcija.length; f++) {
        console.log(nizFunkcija[f]);
      }
      document.getElementById("greske").innerHTML += nisuPopunjeni;
    }
  });
}

function zauzetMail(mail) {
  var mailovi = ["pera.peric@ict.edu.rs", "olja.ivkovic@ict.edu.rs", "mika.mikic@ict.edu.rs"];
  var zauzet = false;
  for(var email in mailovi) {
    if(mail.value === mailovi[email]) {
      zauzet = true;
      break;
    }
  }
  if(zauzet) {
    document.querySelector("#greske").innerHTML = "MAIL JE ZAUZET!";
    return false;
  } else return true;
}

function proveriFNLN(fnln) {
  var reFNLN = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/;

  if(fnln.value.length > 30 || fnln.value.length < 0 || !reFNLN.test(fnln.value)) {
    document.querySelector(".w1").style.display = "block";
    return false;
  } else {
    document.querySelector(".w1").style.display = "none";
    return true;
  }
}

function proveriMail(email) {
  var reEmail = /^[a-z]{2,15}(?:\.[a-z]{2,15})+(\.(1[0-9]{1,3}|[1-9]{3})\.(0[1-9]|1[0-7]))?\@ict\.edu\.rs$/;

  if(email.value.length > 30 || fnln.value.length < 1 || !reEmail.test(email.value)) {
    document.querySelector(".w2").style.display = "block";
    return false;
  } else {
    document.querySelector(".w2").style.display = "none";
    return true;
  }
}

function proveriMob(mob) {
  var reMob = /^06[0-9][0-9]{7}$/;

  if(mob.value.length < 1 || !reMob.test(mob.value)) {
    document.querySelector(".w3").style.display = "block";
    return false;
  } else {
    document.querySelector(".w3").style.display = "none";
    return true;
  }
}

function proveriCity(city) {
  var reCity = /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/;
  if(city.value.length < 1 || !reCity.test(city.value)) {
    document.querySelector(".w4").style.display = "block";
    return false;
  } else {
    document.querySelector(".w4").style.display = "none";
    return true;
  }
}

function proveriPIN(pin) {
  var rePin = /^[0-9]{6}$/;
  var button = document.querySelector(".button");

  if(pin.value.length < 1 || !rePin.test(pin.value)) {
    document.querySelector(".w5").style.display = "block";
    button.classList.add("hidden");
    return false;
  } else {
    document.querySelector(".w5").style.display = "none";
    setTimeout(function() {
      button.classList.remove("hidden");
    }, 2000);
    return true;
  }
}
////////////////////////////////////////////////////////////////////////////////

function popuniDDL() {
  var day = document.querySelector("#day");
  var option;
  for(var i=1; i<=31; i++) {
    option = document.createElement("option");
    option.innerHTML = i;
    day.appendChild(option);
  }

  var month = document.querySelector("#month");
  var meseci = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Avg", "Sept", "Oct", "Nov", "Dec"];
  for(var i=0; i<meseci.length; i++) {
    option = document.createElement("option");
    option.innerHTML = meseci[i];
    month.appendChild(option);
  }

  var year = document.querySelector("#year");
  for(var i=2000; i>=1980; i--) {
    option = document.createElement("option");
    option.innerHTML = i;
    year.appendChild(option);
  }
}

function others() {
  var poslednjiChb = document.querySelector("#drugi");
  var other = document.querySelector(".others");
  other.style.display = "none";
  poslednjiChb.addEventListener("change", function() {
    other.style.display = "block";
    if(!poslednjiChb.checked) {
      other.style.display = "none";
    }
  });
}
