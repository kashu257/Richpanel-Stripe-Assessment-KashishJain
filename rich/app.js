


let selectedPlan = null;

function updatePlanSelectionUI() {
  const plansContainer = document.getElementById('plan-selection');
  plansContainer.innerHTML = '';

  const plans = [
    { name: 'Basic', price: 100, interval: 'monthly' },
    { name: 'Standard', price: 200, interval: 'monthly' },
    // Add more plans here...
  ];

  plans.forEach(plan => {
    const planElement = document.createElement('div');
    planElement.className = 'plan';
    planElement.innerHTML = `
      <h3>${plan.name}</h3>
      <p>Price: ${plan.price} INR/${plan.interval}</p>
      <button onclick="selectPlan('${plan.name}', ${plan.price})">Select</button>
    `;
    plansContainer.appendChild(planElement);
  });
}

function selectPlan(name, price) {
  selectedPlan = { name, price };
  updatePaymentUI();
}

// Call updatePlanSelectionUI to initialize plans
document.addEventListener('DOMContentLoaded', updatePlanSelectionUI);
function updatePaymentUI() {
  const paymentForm = document.getElementById('payment-form');
  paymentForm.innerHTML = '';

  if (selectedPlan) {
    paymentForm.innerHTML = `
      <h2>Payment Information</h2>
      <label for="card-element">Credit or debit card</label>
      <div id="card-element">
        <!-- A Stripe Element will be inserted here. -->
      </div>
      <button id="submit-button">Pay ${selectedPlan.price} INR</button>
      <p>Selected Plan: ${selectedPlan.name}</p>
    `;

    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', async () => {
      // Handle payment processing with Stripe API
      // Create subscription on successful payment
      // Update UI to show subscription details
    });
  }
}
