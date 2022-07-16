import { emojis } from './emojis.js';
import { fetchGithub } from './github.js';

const getGithub = fetchGithub();
const capitalizeInput = e => (e.target.value = toUpperCase(e.target.value));
const initialState = JSON.parse(localStorage.getItem(`State`)) || { constants: {emojis, getGithub, capitalizeInput},
  functions: { // Global Helper Functions
    capFirstLetters: string => string.replace(`  `, ` `).split(` `).map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1).toLowerCase()).join(` `)
  }
};
const previousState = {...initialState};
let setState = state => {
  if (!state) state = {...previousState};
  console.log(`State`, state);
  localStorage.setItem(`State`, JSON.stringify(state));
};

setState();
getGithub.then(github => setState({...previousState, github}));

let addMonthlyBill = event => {
  event.preventDefault();
  const buttonsCont = event.target.parentElement;
  const financialForm = event.target.parentElement.parentElement;
  let addmonthlyBillInputsCont = document.createElement(`code`);
  let addMonthlyBillInputs = `<input
    type="text"
    name="monthlyBillTitleInput"
    id="monthlyBillTitleInput"
    class="monthlyBillTitleInput capitalizeFormat"
    placeholder="Monthly Bill Title"
/>
<input
    type="text"
    name="monthlyBillInput"
    id="monthlyBillInput"
    class="monthlyBillInput currencyFormat"
    placeholder="Monthly Bill Amount"
/>
`;
  addmonthlyBillInputsCont.innerHTML = addMonthlyBillInputs;
  financialForm.insertBefore(addmonthlyBillInputsCont.firstChild, buttonsCont);
  financialForm.insertBefore(
    addmonthlyBillInputsCont.childNodes[1],
    buttonsCont
  );
  financialForm.addEventListener(`input`, (e) => {
    if (e.target.classList.contains(`capitalizeFormat`)) {
      capitalizeInput(e);
    }
  });
};

let registrationActions = event => {
  event.preventDefault();
  const currentButton = event.target;
  const currentForm = event.target.parentElement.previousSibling;
  console.log(`currentForm`, currentForm);
  const jobInput = document.querySelector(`#jobInput`);
  const companyInput = document.querySelector(`#companyInput`);
  const emailInput = document.querySelector(`#emailInput`);
  const passwordInput = document.querySelector(`#passwordInput`);
  if (
    !emailInput.value ||
    !emailInput.value.substring(0, emailInput.value.indexOf("@"))
  ) {
    alert(`Please Enter a Valid Email Address!`);
    return;
  } else if (!passwordInput.value) {
    alert(`Please Enter a Password!`);
    return;
  } else {
    // Grab Inputs
    let email = emailInput.value;
    let username = email.includes(`@`)
      ? email.substring(0, email.indexOf("@"))
      : email;
    let password = passwordInput.value;
    let job = jobInput.value;
    let company = companyInput.value;
    switch (currentButton.id) {
      case `signUpButton`:
        if (userEmails.includes(email)) {
          // Switch to Sign In
          alert(`${username}, You Already Have An Account!`);
          return;
        } else {
          // Register New User
          let newUser = new User(
            email,
            username,
            password,
            job,
            company,
            [],
            []
          );
          users.push(newUser);
          userEmails.push(newUser.email);
          localStorage.setItem(`User`, JSON.stringify(newUser));
          localStorage.setItem(`New User`, JSON.stringify(newUser));
          localStorage.setItem(
            `User Emails`,
            JSON.stringify([...new Set(userEmails)])
          );
          localStorage.setItem(
            `Users`,
            JSON.stringify(removeDuplicateObjFromArray(users))
          );
          console.log(`Users`, JSON.parse(localStorage.getItem(`Users`)));
          console.log(`New User`, newUser);
        }
        break;
    }
  }
};

const calculateStats = event => {
  event.preventDefault();
  const currentInput = event.target;
  const hourlyInput = document.querySelector(`#hourlyInput`);
  const weeklyInput = document.querySelector(`#weeklyInput`);
  const salaryInput = document.querySelector(`#salaryInput`);

  let hourlyRate = hourlyInput.value.replace(/[^0-9.]/g, ``);
  let weeklyHours = weeklyInput.value.replace(/[^0-9.]/g, ``);
  let annualSalary = salaryInput.value.replace(/[^0-9.]/g, ``);

  let hourly = document.querySelector(`#hourly`);
  let daily = document.querySelector(`#daily`);
  let weekly = document.querySelector(`#weekly`);
  let monthly = document.querySelector(`#monthly`);
  let yearly = document.querySelector(`#yearly`);
  let hourlyTax = document.querySelector(`#hourlyTaxes`);
  let dailyTax = document.querySelector(`#dailyTaxes`);
  let weeklyTax = document.querySelector(`#weeklyTaxes`);
  let monthlyTax = document.querySelector(`#monthlyTaxes`);
  let yearlyTax = document.querySelector(`#yearlyTaxes`);
  let hourlyCash = document.querySelector(`#hourlyCash`);
  let dailyCash = document.querySelector(`#dailyCash`);
  let weeklyCash = document.querySelector(`#weeklyCash`);
  let monthlyCash = document.querySelector(`#monthlyCash`);
  let yearlyCash = document.querySelector(`#yearlyCash`);

  // Input Validation
  if (!isNaN(event.data)) {
    if (!isNaN(parseInt(currentInput.value.replace(/[^0-9]/g, ``)))) {
      if (currentInput.classList.contains(`currencyFormat`)) {
        let localeValue =
          `$ ` +
          parseInt(currentInput.value.replace(/[^0-9]/g, ``)).toLocaleString(
            `en-US`
          );
        currentInput.value = localeValue;
      } else if (currentInput.classList.contains(`numberFormat`)) {
        let numberValue = parseInt(
          currentInput.value.replace(/[^0-9]/g, ``)
        ).toLocaleString(`en-US`);
        currentInput.value = numberValue;
      }
    }
  } else {
    if (
      currentInput.classList.contains(`currencyFormat`) ||
      currentInput.classList.contains(`numberFormat`)
    ) {
      alert(`Please enter only numbers`);
      currentInput.value = event.target.value.replace(/[^0-9]/g, ``);
    }
  }

  if (!hourlyRate && !weeklyHours && !annualSalary) {
    hourly.value = `Hourly Wage`;
    daily.value = `Daily Income`;
    weekly.value = `Weekly Income`;
    monthly.value = `Monthly Income`;
    yearly.value = `Annual Salary`;
    hourlyTax.value = `Hourly Taxes`;
    dailyTax.value = `Daily Taxes`;
    weeklyTax.value = `Weekly Taxes`;
    monthlyTax.value = `Monthly Taxes`;
    yearlyTax.value = `Annual Taxes`;
    hourlyCash.value = `Hourly Cash`;
    dailyCash.value = `Daily Cash`;
    weeklyCash.value = `Weekly Cash`;
    monthlyCash.value = `Monthly Cash`;
    yearlyCash.value = `Annual Cash`;
  } else if (hourlyRate && !weeklyHours && !annualSalary) {
    hourly.value =
      `$ ` + (hourlyRate * 1).toLocaleString(`en-US`) + ` per Hour`;
    daily.value = `$ ` + (hourlyRate * 8).toLocaleString(`en-US`) + ` per Day`;
    weekly.value =
      `$ ` + (hourlyRate * 40).toLocaleString(`en-US`) + ` per Week`;
    monthly.value =
      `$ ` +
      Math.floor((hourlyRate * 40 * 52) / 12).toLocaleString(`en-US`) +
      ` per Month`;
    yearly.value =
      `$ ` +
      Math.floor(hourlyRate * 40 * 52).toLocaleString(`en-US`) +
      ` per Year`;
    hourlyTax.value =
      `- $ ` +
      Math.floor(hourlyRate * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Hour`;
    dailyTax.value =
      `- $ ` +
      Math.floor(hourlyRate * (40 / 5) * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Day`;
    weeklyTax.value =
      `- $ ` +
      Math.floor(hourlyRate * 40 * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Week`;
    monthlyTax.value =
      `- $ ` +
      Math.floor(((hourlyRate * 40 * 52) / 12) * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Month`;
    yearlyTax.value =
      `- $ ` +
      Math.floor(hourlyRate * 40 * 52 * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Year`;
    hourlyCash.value =
      `$ ` +
      Math.floor(hourlyRate - hourlyRate * 0.24).toLocaleString(`en-US`) +
      ` Cash per Hour`;
    dailyCash.value =
      `$ ` +
      Math.floor((hourlyRate - hourlyRate * 0.24) * 8).toLocaleString(`en-US`) +
      ` Cash per Day`;
    weeklyCash.value =
      `$ ` +
      Math.floor((hourlyRate - hourlyRate * 0.24) * 8 * 5).toLocaleString(
        `en-US`
      ) +
      ` Cash per Week`;
    monthlyCash.value =
      `$ ` +
      Math.floor(
        ((hourlyRate - hourlyRate * 0.24) * 8 * 5 * 52) / 12
      ).toLocaleString(`en-US`) +
      ` Cash per Month`;
    yearlyCash.value =
      `$ ` +
      Math.floor((hourlyRate - hourlyRate * 0.24) * 8 * 5 * 52).toLocaleString(
        `en-US`
      ) +
      ` Cash per Year`;
  } else if (hourlyRate && weeklyHours && !annualSalary) {
    hourly.value =
      `$ ` + (hourlyRate * 1).toLocaleString(`en-US`) + ` per Hour`;
    daily.value =
      `$ ` +
      (hourlyRate * (weeklyHours / 5)).toLocaleString(`en-US`) +
      ` per Day`;
    weekly.value =
      `$ ` + (hourlyRate * weeklyHours).toLocaleString(`en-US`) + ` per Week`;
    monthly.value =
      `$ ` +
      Math.floor((hourlyRate * weeklyHours * 52) / 12).toLocaleString(`en-US`) +
      ` per Month`;
    yearly.value =
      `$ ` +
      Math.floor(hourlyRate * weeklyHours * 52).toLocaleString(`en-US`) +
      ` per Year`;
    hourlyTax.value =
      `- $ ` +
      Math.floor(hourlyRate * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Hour`;
    dailyTax.value =
      `- $ ` +
      Math.floor(hourlyRate * (weeklyHours / 5) * 0.24).toLocaleString(
        `en-US`
      ) +
      ` Taxes per Day`;
    weeklyTax.value =
      `- $ ` +
      Math.floor(hourlyRate * weeklyHours * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Week`;
    monthlyTax.value =
      `- $ ` +
      Math.floor(((hourlyRate * weeklyHours * 52) / 12) * 0.24).toLocaleString(
        `en-US`
      ) +
      ` Taxes per Month`;
    yearlyTax.value =
      `- $ ` +
      Math.floor(hourlyRate * weeklyHours * 52 * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Year`;
    hourlyCash.value =
      `$ ` +
      Math.floor(hourlyRate - hourlyRate * 0.24).toLocaleString(`en-US`) +
      ` Cash per Hour`;
    dailyCash.value =
      `$ ` +
      Math.floor(
        (hourlyRate - hourlyRate * 0.24) * (weeklyHours / 5)
      ).toLocaleString(`en-US`) +
      ` Cash per Day`;
    weeklyCash.value =
      `$ ` +
      Math.floor(
        (hourlyRate - hourlyRate * 0.24) * (weeklyHours / 5) * 5
      ).toLocaleString(`en-US`) +
      ` Cash per Week`;
    monthlyCash.value =
      `$ ` +
      Math.floor(
        ((hourlyRate - hourlyRate * 0.24) * (weeklyHours / 5) * 5 * 52) / 12
      ).toLocaleString(`en-US`) +
      ` Cash per Month`;
    yearlyCash.value =
      `$ ` +
      Math.floor(
        (hourlyRate - hourlyRate * 0.24) * (weeklyHours / 5) * 5 * 52
      ).toLocaleString(`en-US`) +
      ` Cash per Year`;
  } else if (!hourlyRate && !weeklyHours && annualSalary) {
    hourly.value =
      `$ ` +
      Math.floor(annualSalary / 260 / 8).toLocaleString(`en-US`) +
      ` per Hour`;
    daily.value =
      `$ ` +
      Math.floor(annualSalary / 260).toLocaleString(`en-US`) +
      ` per Day`;
    weekly.value =
      `$ ` +
      Math.floor(annualSalary / 52).toLocaleString(`en-US`) +
      ` per Week`;
    monthly.value =
      `$ ` +
      Math.floor(annualSalary / 12).toLocaleString(`en-US`) +
      ` per Month`;
    yearly.value =
      `$ ` + Math.floor(annualSalary).toLocaleString(`en-US`) + ` per Year`;
    hourlyTax.value =
      `- $ ` +
      Math.floor((annualSalary / 260 / 8) * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Hour`;
    dailyTax.value =
      `- $ ` +
      Math.floor((annualSalary / 260) * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Day`;
    weeklyTax.value =
      `- $ ` +
      Math.floor((annualSalary / 52) * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Week`;
    monthlyTax.value =
      `- $ ` +
      Math.floor((annualSalary / 12) * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Month`;
    yearlyTax.value =
      `- $ ` +
      Math.floor(annualSalary * 0.24).toLocaleString(`en-US`) +
      ` Taxes per Year`;
    hourlyCash.value =
      `$ ` +
      Math.floor(
        annualSalary / 260 / 8 - (annualSalary / 260 / 8) * 0.24
      ).toLocaleString(`en-US`) +
      ` Cash per Hour`;
    dailyCash.value =
      `$ ` +
      Math.floor(
        annualSalary / 260 - (annualSalary / 260) * 0.24
      ).toLocaleString(`en-US`) +
      ` Cash per Day`;
    weeklyCash.value =
      `$ ` +
      Math.floor(annualSalary / 52 - (annualSalary / 52) * 0.24).toLocaleString(
        `en-US`
      ) +
      ` Cash per Week`;
    monthlyCash.value =
      `$ ` +
      Math.floor(annualSalary / 12 - (annualSalary / 12) * 0.24).toLocaleString(
        `en-US`
      ) +
      ` Cash per Month`;
    yearlyCash.value =
      `$ ` +
      Math.floor(annualSalary - annualSalary * 0.24).toLocaleString(`en-US`) +
      ` Cash per Year`;
  }
};