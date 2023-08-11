function toggleSubscription(subscriptionType) {
    const monthlyButton = document.getElementById('monthly-button');
    const yearlyButton = document.getElementById('yearly-button');
  
    if (subscriptionType === 'monthly') {
      monthlyButton.classList.add('active');
      yearlyButton.classList.remove('active');
  
      const yearlyPrices = document.querySelectorAll('.price.yearly');
      yearlyPrices.forEach(price => price.style.display = 'none');
  
      const monthlyPrices = document.querySelectorAll('.price.monthly');
      monthlyPrices.forEach(price => price.style.display = 'inline');
    } else if (subscriptionType === 'yearly') {
      yearlyButton.classList.add('active');
      monthlyButton.classList.remove('active');
  
      const monthlyPrices = document.querySelectorAll('.price.monthly');
      monthlyPrices.forEach(price => price.style.display = 'none');
  
      const yearlyPrices = document.querySelectorAll('.price.yearly');
      yearlyPrices.forEach(price => price.style.display = 'inline');
    }
  }
  