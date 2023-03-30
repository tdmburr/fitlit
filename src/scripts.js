import './css/styles.css';
import User from "../src/data/User.js"
import Hydration from "../src/data/Hydration.js"
import userTestData from '../test/user-test-data';
import hydrationTestData from '../test/hydration-test-data';

let welcomeMessage = document.querySelector("#headerWelcome");
let userName = document.querySelector("#userName");
let userEmail = document.querySelector("#userEmail");
let userAddress = document.querySelector("#userAddress");
let userStrideLength = document.querySelector("#userSL");
let userDailyStepGoal = document.querySelector("#userDSG");
let stepGoalComparison = document.querySelector("#stepGoalComp");
let userFriends = document.querySelector("#userFriends");
let dailyWater = document.querySelector("#dailyWater");
let weeklyWater = document.querySelector("#weeklyWater");

let date = new Date()
var currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/"+ ("0" + date.getDate()).slice(-2);

console.log(currentDate)
let newUser;
let hydrationEntries;

window.addEventListener('load', function() {
    generateRandomUser();
    displayWelcomeMessage();
    displayInfoCard();
    displayWaterConsumed();
    displayWeeklyWaterConsumption();
});

function generateRandomUser() {
    newUser = new User(userTestData[Math.floor(Math.random() * userTestData.length)]);
};

function displayWelcomeMessage() {
    welcomeMessage.innerText = `Welcome, ${newUser.getUserFirstName()}!`
};

function displayInfoCard() {
    userName.innerText = newUser.name;
    userEmail.innerText = newUser.email;
    userAddress.innerText = newUser.address;
    userStrideLength.innerText = `Stride Length: ${newUser.strideLength}`;
    userDailyStepGoal.innerText = `Daily Step Goal: ${newUser.dailyStepGoal}`;
    userFriends.innerText = `Friends: ${newUser.friends}`;
    displayStepGoalComparison();
};

function displayStepGoalComparison() {
    const userStepGoal = newUser.dailyStepGoal;
    const totalStepGoals = userTestData.reduce((acc, user) => {
        acc += user.dailyStepGoal
        return acc
    }, 0)
    const averageStepGoal = totalStepGoals / userTestData.length;

    if (userStepGoal > averageStepGoal) {
        stepGoalComparison.innerText = `Great job!!! Your step goal is above average.  You are KICKING ASS.`;
    } else if (userStepGoal < averageStepGoal) {
        stepGoalComparison.innerText = `You can do it!!! Your step goal is below average.  TRY HARDER.`;
    } else {
        stepGoalComparison.innerText = `You are right on track with the average step goal.  Way to be just AVERAGE.`
    };
};

function displayWaterConsumed() {
  hydrationEntries = hydrationTestData.filter(entry => entry.userID === newUser.id);
  console.log(hydrationEntries)

  const currentDayEntry = hydrationEntries.find(entry => entry.date == currentDate)
  console.log(currentDayEntry)

  if (currentDayEntry) {
    dailyWater.innerText = `You have consumed ${currentDayEntry.numOunces} ounces of water today.`
  } else {
    dailyWater.innerText = 'Drink more water you thirsty bitch!'
  }
};

function displayWeeklyWaterConsumption() {
  // let newHydration = new Hydration(hydrationTestData[1])
  const hydrationEntries = hydrationTestData.filter(hydrationEntry => hydrationEntry.userID === newUser.id);
    const reverse = hydrationEntries.reverse()

    const weeklyHydrationEntries = [
      reverse[0], 
      reverse[1], 
      reverse[2], 
      reverse[3], 
      reverse[4], 
      reverse[5], 
      reverse[6]
    ];
    
    const weeklyOunces = weeklyHydrationEntries.reduce((acc, entry) => {
        const weeklyInfo = {
        'Date': entry.date,
        'Number of Ounces Drank': entry.numOunces
      };
      acc.push(weeklyInfo);
      return acc;
    }, []);
  // console.log(weeklyOunces.toString())
  weeklyWater.innertext = weeklyOunces
};