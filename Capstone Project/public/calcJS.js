const ecoform = document.getElementById("ecoform");
const homes = document.getElementById("homes");
const electricity = document.getElementById("electricity");
const diet = document.getElementById("diet");
const naturalGas = document.getElementById("naturalgas");
const biomass = document.getElementById("biomass");
const coal = document.getElementById("coal");
const propane = document.getElementById("propane");
const liquifiedPetroleumGas = document.getElementById("LPG");
const wasteLandfilldoc = document.getElementById("wastePercentLandfill");
const wasteCompostdoc = document.getElementById("wastePercentCompost");
const wasteWaterdoc = document.getElementById("wastePercentWater");

//    ---------------------- FIREBASE ----------------------    //

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    console.log(firebaseUser);
    $msg = "Login Complete Thanks";
  } else {
    console.log("not logged in");
    alert("Please Login or Signup to Use this Service");
    window.location.href = "sign-up-form.html";
  }
});

const database = firebase.database();
const ecoRef = database.ref("/Users/userid");

//    ---------- SAVE DATA ----------    //
addBtn.addEventListener("click", (e) => {
  // prevent default cancels the event if it can be cancelable
  e.preventDefault();

  // assign a random ID everytime a form is submitted
  const autoId = ecoRef.push().key;

  // Get User ID from Database
  let user = firebase.auth().currentUser;
  let uid = user.uid;

  //with the random ID set the values from user input

  //form validation
  if (
    (electricity.value.length == 0,
    naturalGas.value.length == 0,
    biomass.value.length == 0,
    coal.value.length == 0,
    propane.value.length == 0,
    liquifiedPetroleumGas.value.length == 0)
  ) {
    alert("Please Fill All Required Field(s)");
    return false;
  } else {
    //with the random ID set the values from user input
    ecoRef.child(uid).child("ecoform").child(autoId).set({
      date: new Date().toLocaleDateString(),
      homes: homes.value,
      electricity: electricity.value,
      diet: diet.value,
      naturalGas: naturalGas.value,
      biomass: biomass.value,
      coal: coal.value,
      propane: propane.value,
      liquifiedPetroleumGas: liquifiedPetroleumGas.value,
      wasteLandfill: wasteLandfilldoc.value,
      wasteCompost: wasteCompostdoc.value,
      wasteWater: wasteWaterdoc.value,
      total: getTotal(),
    });
    alert("Results Submitted, Thank you. ☺");
    ecoform.reset();
  }
});

//    ---------- RETRIEVE DATA track_results.html ----------    //
function retrieveInfo() {
  // pull the data from a specific user based on uid
  let user = firebase.auth().currentUser;
  let uid = user.uid;

  // set the path where to retrieve the data
  let retreivalRef = firebase
    .database()
    .ref("/Users/userid")
    .child(uid)
    .child("ecoform");

  // get the data values using the function getData(data()
  retreivalRef.on("value", getData);
}

// get data by iterating through a for loop
function getData(data) {
  // get the data values (diet, homes etc.)
  let info = data.val();
  // get the data values associated to each key (autoID)
  let keys = Object.keys(info);

  // loop that iterates throught he object key (ecoforms)
  for (let i = 0; i < keys.length; i++) {
    let infoData = keys[i];
    let date = info[infoData].date;
    let homes = info[infoData].homes;
    let electricity = info[infoData].electricity;
    let diet = info[infoData].diet;
    let naturalGas = info[infoData].naturalGas;
    let biomass = info[infoData].biomass;
    let coal = info[infoData].coal;
    let propane = info[infoData].propane;
    let liquifiedPetroleumGas = info[infoData].liquifiedPetroleumGas;
    let wasteLandfill = info[infoData].wasteLandfill;
    let wasteCompost = info[infoData].wasteCompost;
    let wasteWater = info[infoData].wasteWater;
    let total = info[infoData].total;

    //    console.log(date,homes,electricity,diet,naturalGas,biomass,coal,propane,liquifiedPetroleumGas,wasteLandfill,wasteCompost,wasteWater,total);

    let c02Results = document.querySelector(".c02Results");

    // to see the data values
    c02Results.innerHTML += `
    <div class="contain-tracker">
    <p class="tracker">
    <a><strong id="date"> Date: </strong> <p class="valText" id="valDate">   ${date}  </p> </a><br>
    <a><strong> Type of Residence: </strong> <p class="valText">   ${homes}  </p> </a>
    <a><strong> Electricity Usage (kwh): </strong> <p class="valText">   ${electricity}  </p> </a>
    <a><strong> Diet: </strong> <p class="valText">   ${diet}  </p> </a>
    <a><strong> Natural Gas Usage (GJ): </strong> <p class="valText">   ${naturalGas}  </p> </a>
    <a><strong> Biomass Usage (kg): </strong> <p class="valText">   ${biomass}  </p> </a>
    <a><strong> Coal Usage (kg): </strong> <p class="valText">   ${coal}  </p> </a>
    <a><strong> Propane Usage (kg): </strong> <p class="valText">   ${propane}  </p> </a>
    <a><strong> liquified Petroleum Gas (LPG) Usage (kg): </strong> <p class="valText">   ${liquifiedPetroleumGas}  </p> </a>
    <a><strong> Waste that goes to the landfill (%): </strong> <p class="valText">   ${wasteLandfill}  </p> </a>
    <a><strong> Waste Composted (%): </strong> <p class="valText">   ${wasteCompost}  </p> </a>
    <a><strong> Water Usage/Inefficiency (%): </strong> <p class="valText"> ${wasteWater}  </p> </a> <br>
    <a><strong> Yearly CO2e (tonnes): </strong> <p class="valText" id="valTotal">   ${total}  </p> </a>
    </p>
  </div><br/>`;
  }
}

// see EXCEL  - "LAZY IT TECHS - Carbon calc.xlsx"

var homes_factor = new Array();
homes_factor["singleD"] = 0.5274;
homes_factor["singleA"] = 0.1082;
homes_factor["apartment"] = 0.2028;
homes_factor["mobiileH"] = 0.0135;

var electricityEmissionFactor = 0.179763325;

var diet_factor = new Array();
diet_factor["vegan"] = 0.955;
diet_factor["veget"] = 1.053;
diet_factor["pesca"] = 1.431;
diet_factor["nored"] = 1.234;
diet_factor["nopork"] = 1.29;
diet_factor["nobeef"] = 3.16;
diet_factor["omni"] = 2.282;

var naturalGasEmissionFactor = 49.88;
var biomassEmissionFactor = 4.59;
var coalEmissionFactor = 90.87;
var propaneEmissionFactor = 0.303;
var LPGEmissionFactor = 60.61;

// waste
var wasteLandfill = 0.6176;
var wasteWater = 0.0269;
var wasteCompost = 0.099;

var roundedEmissionTotal;

//function finds the factors based on the dropdown
function getHome() {
  //get a reference to the form id="ecoform"
  var ecoform1 = document.forms["ecoform"];

  //get a reference to the select id="homes"
  var selectedHome = ecoform1.elements["homes"];

  //set homes price equal to value user would choose, for example mobile home = .0135
  selectedHomeFactor = homes_factor[selectedHome.value];

  //return the selected home factor
  return selectedHomeFactor;
}

//function gets user input and calculates Electricity Emission
function getElectricity() {
  //get the user input from input id "electricity"
  var electricityUsage = parseFloat(
    document.getElementById("electricity").value
  );

  //calculate electricity Emission by multiplying ((user input * ElectricityEmissionFactor) / 1000)*12
  var calculateElectricity =
    ((electricityUsage * electricityEmissionFactor) / 1000) * 12;

  //return the total value
  return calculateElectricity;
}

//fnuction finds the factors based on the dropdown
function getDiet() {
  var selectedDietFactor = 0;

  //get a reference to the form id="ecoform"
  var ecoform = document.forms["ecoform"];

  //get a reference to the select id="diet"
  var selectedDiet = ecoform.elements["diet"];

  //set homes price equal to value user would choose, for example vegnb = .955
  selectedDietFactor = diet_factor[selectedDiet.value];

  //return the selected home factor
  return selectedDietFactor;
}

//function gets user input and calculates natural gas Emission
function getNaturalGas() {
  //get the user input from input id "naturalgas"
  var naturalGasUsage = parseFloat(document.getElementById("naturalgas").value);

  //calculate natural Gas Emission by multiplying ((user input * naturalGasEmissionFactor) / 1000)*12
  var calculateNaturalGas =
    ((naturalGasUsage * naturalGasEmissionFactor) / 1000) * 12;

  //return the total value
  return calculateNaturalGas;
}

//function gets user input and calculates biomass (wood) Emission
function getBiomass() {
  //get the user input from input id "biomass"
  var biomassUsage = parseFloat(document.getElementById("biomass").value);

  //calculate biomass Emission by multiplying ((user input * biomassEmissionFActor) / 1000)*12
  var calculateBiomass = ((biomassUsage * biomassEmissionFactor) / 1000) * 12;

  //return the total value
  return calculateBiomass;
}

//function gets user input and calculates coal Emission
function getCoal() {
  //get the user input from input id "coal"
  var coalUsage = parseFloat(document.getElementById("coal").value);

  //calculate coal Emission by multiplying ((user input * coalEmissionFactor) / 1000)*12
  var calculateCoalUsage = ((coalUsage * coalEmissionFactor) / 1000) * 12;

  //return the total value
  return calculateCoalUsage;
}

//function gets user input and calculates propane Emission
function getPropane() {
  //get the user input from input id "propane"
  var propaneUsage = parseFloat(document.getElementById("propane").value);

  //calculate propane Emission by multiplying ((user input * propaneEmissionFactor) / 1000)*12
  var calculatePropane = ((propaneUsage * propaneEmissionFactor) / 1000) * 12;

  //return the total value
  return calculatePropane;
}

//function gets user input and calculates Liquified Petroleum GAs Emission
function getLPG() {
  //get the user input from input id "naturalgas"
  var LPGUsage = parseFloat(document.getElementById("LPG").value);

  //calculate Liquified Petroleum gas Emission by multiplying ((user input * LPGEmissionFactor) / 1000)*12
  var calculateLPG = ((LPGUsage * LPGEmissionFactor) / 1000) * 12;

  //return the total value
  return calculateLPG;
}

// WASTE slider floating label
//call the range percentage and the label
// code from https://www.w3schools.com/howto/howto_js_rangeslider.asp

function slider1() {
  const range = document.getElementById("wastePercentLandfill"),
    rangeLabel = document.getElementById("rangeLabelLandfill");

  rangeLabel.innerHTML = range.value + " %";

  range.oninput = function () {
    rangeLabel.innerHTML = this.value + " %";
  };
}
slider1();

//WASTE slider floating label 2 fopr compost
function slider2() {
  const range = document.getElementById("wastePercentCompost"),
    rangeLabel = document.getElementById("rangeLabelCompost");

  rangeLabel.innerHTML = range.value + " %";

  range.oninput = function () {
    rangeLabel.innerHTML = this.value + " %";
  };
}
slider2();

// WASTE slider floating label 3 for water
function slider3() {
  const range = document.getElementById("wastePercentWater"),
    rangeLabel = document.getElementById("rangeLabelWater");

  rangeLabel.innerHTML = range.value + " %";

  range.oninput = function () {
    rangeLabel.innerHTML = this.value + " %";
  };
}
slider3();

//WASTE LANDFILL
function getWasteLandfill() {
  //get the input from the range slider
  var wasteDisposedLandfill = document.getElementById(
    "wastePercentLandfill"
  ).value;

  // calculate the waste Emission by multipling value * wasteLandfill emission factor,
  //divided by 100 for percent, *12 for yearly
  var selectedWasteLandfill =
    ((wasteDisposedLandfill * wasteLandfill) / 100) * 12;

  //return the total value
  return selectedWasteLandfill;
}

// WASTE COMPOST
function getWasteCompost() {
  //get the input from the range slider
  var wasteDisposedCompost = document.getElementById(
    "wastePercentCompost"
  ).value;

  // calculate the waste Emission by multipling value * wasteWCompostater emission factor,
  //divided by 100 for percent, *12 for yearly
  var selectedWasteCompost = (wasteDisposedCompost / 100) * wasteCompost * 12;

  //return the total value
  return selectedWasteCompost;
}

function getWasteWater() {
  //get the input from the range slider
  var wasteDisposedWater = document.getElementById("wastePercentWater").value;

  // calculate the waste Emission by multipling value * wasteWater emission factor,
  //divided by 100 for percent, *12 for yearly
  var selectedWasteWater = (wasteDisposedWater / 100) * wasteWater * 12;

  //return the total value
  return selectedWasteWater;
}

//calcualte the total individual Emission in tonnes CO2-e
function getTotal() {
  // add all the calculation functions to get total
  emissionTotal =
    getHome() +
    getElectricity() +
    getDiet() +
    getNaturalGas() +
    getBiomass() +
    getCoal() +
    getPropane() +
    getLPG() +
    getWasteLandfill() +
    getWasteCompost() +
    getWasteWater();

  roundedEmissionTotal = emissionTotal.toFixed(3);

  document.getElementById("calc_result").innerHTML =
    "Your Yearly Individual Carbon Emission is " +
    roundedEmissionTotal +
    " tCO2-e (tonnes of Carbon Dioxide equivalents)";

  //TESTER
  //console.log("Your Yearly Individual Carbon Emission is " + emissionTotal + " CO2");
  console.log(
    "Your Yearly Individual Carbon Emission is !! " +
      roundedEmissionTotal +
      " !!tCO2-e"
  );
  return roundedEmissionTotal;
}
