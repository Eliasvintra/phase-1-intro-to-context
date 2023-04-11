// Takes in an array of information about an employee
function createEmployeeRecord(recordArray) {
  return { // creates an object for the employee information
    firstName: recordArray[0],
    familyName: recordArray[1],
    title: recordArray[2],
    payPerHour: recordArray[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}
// it takes in array of arrays which are nested array representing the different information about each employee

function createEmployeeRecords(employeeArrays) {
  return employeeArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
  let timeIn = {
      type: "TimeIn",
      hour: parseInt(dateStamp.slice(11,15)),
      date: dateStamp.slice(0, 10)
  }
  employeeRecord['timeInEvents'] = [timeIn];
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  let timeOut = {
      type: "TimeOut",
      hour: parseInt(dateStamp.slice(11,15)),
      date: dateStamp.slice(0, 10)
  }
  employeeRecord['timeOutEvents'] = [timeOut];
  return employeeRecord;
}

//loop through all of the time in events in the employee's record
function hoursWorkedOnDate(employeeRecord, date) {
  let hoursWorked = 0;
  for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
    if (employeeRecord.timeInEvents[i].date === date) {
      const timeInHour = employeeRecord.timeInEvents[i].hour;
      const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
      if (timeOutEvent) {
        const timeOutHour = timeOutEvent.hour;
        hoursWorked = (timeOutHour - timeInHour) / 100;// convert to decimal number of hours(24hr system)
      }
    }
  }
  return hoursWorked;
}


// This function helps calculate how much an employee earned on a specific date, based on their hourly pay rate and how many hours they worked on that date.

function wagesEarnedOnDate(employeeRecord, date) {
  const hours = hoursWorkedOnDate(employeeRecord, date);
  return hours * employeeRecord.payPerHour;
}
 
//iterate through each event in the (timeInEvents array of the employeeRecord)
function allWagesFor(employeeRecord) {
  let totalWages = 0;
  for (const event of employeeRecord.timeInEvents) {
    totalWages += wagesEarnedOnDate(employeeRecord, event.date);
  }
  return totalWages;
}


// This function helps calculate the total amount of wages earned by all employees over a certain period of time.
function calculatePayroll(employeeRecords) {
  const totalWages = employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
  return totalWages;
}