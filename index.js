const { fifaData } = require("./fifa.js");

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const finals2014 = fifaData.filter(function (item) {
  return item.Stage === "Final" && item.Year === 2014;
});
console.log(finals2014);

//(b) Away Team name for 2014 world cup final
console.log("task 1a", finals2014[0]["Home Team Name"]);

//(c) Home Team goals for 2014 world cup final
console.log("task 1b", finals2014[0]["Away Team Name"]);

//(d) Away Team goals for 2014 world cup final
console.log("task 1c", finals2014[0]["Home Team Goals"]);
console.log("task 1d", finals2014[0]["Away Team Goals"]);

//(e) Winner of 2014 world cup final */
console.log("task 1e", finals2014[0]["Win conditions"]);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/
//receive array as parameter    fifadata
function getFinals(array) {
  /* code here */
  //you can use filter and stage === 'final'
  const newArray = array.filter(function (item) {
    return item.Stage === "Final";
  });
  return newArray;
}
console.log("task 2", getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/
//two parameters    / getfinacallback
function getYears(array, getFinalscb) {
  /* code here */
  //map over the results of getfinals to get all the years
  const years = getFinalscb(array).map(function (item) {
    return item.Year; // things that we want pushed into the new array
  });
  return years;
}
console.log("task 3", getYears(fifaData, getFinals));
/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */
//two parameters    array, getfinalscb
function getWinners(array, getFinalscb) {
  /* code here */
  //use map

  const winners = getFinalscb(array).map(function (item) {
    if (item["Home Team Goals"] > item["Away Team Goals"]) {
      return item["Home Team Name"];
    } else {
      return item["Away Team Name"];
    }
  });
  return winners;
  //use if else      if home team > away team then home team won
}
console.log("task 4", getWinners(fifaData, getFinals));
/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Receive a callback function getYears from task 3
4. Receive a callback function getWinners from task 4
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */
// 4 params   array, getfinalscb, getyearscb, getwinnerscb,
function getWinnersByYear(array, getFinalscb, getyearscb, getWinnerscb) {
  /* code here */
  const winners = getWinners(array, getFinalscb);
  const years = getYears(array, getFinalscb);
  // use map - i would map over one array abd grab each item an dthen i would use the index to grab th eitem in the other array
  const string = winners.map(function (item, index) {
    return `In ${years[index]}, ${item} won the world cup!`;
  });
  return string;
}
console.log(
  "task5",
  getWinnersByYear(fifaData, getFinals, getYears, getWinners)
);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/
// getfinalscb,
function getAverageGoals(getFinalscb) {
  /* code here */
  const AverageGoals = getFinalscb.reduce(function (acc, item) {
    return acc + item["Home Team Goals"] + item["Away Team Goals"];
  }, 0);
  return (AverageGoals / getFinalscb.length).toFixed(2);
  //use reduce to add upp all the goals of the home and away teams
  //then i would divide that nu,ber by the length of the arry
  // rouund to the nearest decimal
}

console.log("task 6", getAverageGoals(getFinals(fifaData)));

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(array, initials) {
  /* code here */
  const filterData = fifaData.filter(
    (item) =>
      item["Home Team Initials"] === initials ||
      item["Away Team Initials"] === initials
  );

  const cupWins = array.reduce(function (acc, item) {
    if (initials === item["Home Team Initials"]) {
      if (
        item.Stage === "Final" &&
        item["Home Team Goals"] > item["Away Team Goals"]
      ) {
        acc += 1;
      }
    } else if (initials === item["Away Team Initials"]) {
      if (
        item.Stage === "Final" &&
        item["Away Team Goals"] > item["Home Team Goals"]
      ) {
        acc += 1;
      }
    }

    return acc;
  }, 0);
  return cupWins;
}

console.log("stretch task1", getCountryWins(fifaData, "BRA"));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
  /* code here */
}

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {
  /* code here */
}

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
  console.log("its working");
  return "bar";
}
foo();
module.exports = {
  foo,
  getFinals,
  getYears,
  getWinners,
  getWinnersByYear,
  getAverageGoals,
};
