// events.js

const festivalData = {
  diwali: {
      title: "Diwali Night Celebration",
      itinerary: [
          { time: "6:00 PM", activity: "Welcome with traditional sweets" },
          { time: "7:00 PM", activity: "Cultural Dance Performances" },
          { time: "8:30 PM", activity: "Diwali Special Dinner" },
          { time: "10:00 PM", activity: "Fireworks Show" }
      ]
  },
  christmas: {
      title: "Christmas Eve Celebration",
      itinerary: [
          { time: "5:00 PM", activity: "Christmas Carols & Hot Chocolate" },
          { time: "6:30 PM", activity: "Tree Lighting Ceremony" },
          { time: "8:00 PM", activity: "Gourmet Dinner with Santa Visit" },
          { time: "10:00 PM", activity: "Christmas Movie Screening" }
      ]
  },
  new_year: {
      title: "New Year’s Eve Gala",
      itinerary: [
          { time: "8:00 PM", activity: "Welcome Drinks and Live DJ" },
          { time: "10:00 PM", activity: "Dinner Buffet Opens" },
          { time: "11:59 PM", activity: "Countdown and Fireworks" },
          { time: "12:30 AM", activity: "After Party Begins" }
      ]
  },
  eid: {
      title: "Eid Celebration",
      itinerary: [
          { time: "4:00 PM", activity: "Welcome with Dates & Refreshments" },
          { time: "6:00 PM", activity: "Traditional Eid Feast" },
          { time: "8:00 PM", activity: "Live Music & Family Games" }
      ]
  },
  pongal: {
      title: "Pongal Festival",
      itinerary: [
          { time: "7:00 AM", activity: "Puja Ceremony" },
          { time: "8:30 AM", activity: "Traditional Pongal Breakfast" },
          { time: "11:00 AM", activity: "Folk Dance and Music" }
      ]
  },
  holi: {
      title: "Holi Bash",
      itinerary: [
          { time: "10:00 AM", activity: "Color Splash Begins" },
          { time: "12:00 PM", activity: "Snacks & Drinks" },
          { time: "2:00 PM", activity: "DJ Party with Organic Colors" }
      ]
  },
  rakshabandhan: {
      title: "Raksha Bandhan Special",
      itinerary: [
          { time: "10:00 AM", activity: "Rakhi Tying Ceremony" },
          { time: "12:00 PM", activity: "Family Brunch" }
      ]
  },
  thanksgiving: {
      title: "Thanksgiving Dinner",
      itinerary: [
          { time: "5:00 PM", activity: "Welcome Drinks" },
          { time: "7:00 PM", activity: "Turkey Feast" },
          { time: "9:00 PM", activity: "Family Toast & Dessert" }
      ]
  },
  navaratri: {
      title: "Navaratri Nights",
      itinerary: [
          { time: "7:00 PM", activity: "Garba Dance" },
          { time: "9:00 PM", activity: "Special Navaratri Dinner" }
      ]
  },
  durgapooja: {
      title: "Durga Puja Special",
      itinerary: [
          { time: "8:00 AM", activity: "Puja Ceremony" },
          { time: "10:00 AM", activity: "Bhog Prasad Distribution" },
          { time: "6:00 PM", activity: "Cultural Program" }
      ]
  },
  ganesh: {
      title: "Ganesh Chaturthi Celebration",
      itinerary: [
          { time: "9:00 AM", activity: "Ganesh Puja" },
          { time: "11:00 AM", activity: "Ladoo Prasad Distribution" },
          { time: "6:00 PM", activity: "Aarti and Immersion Ceremony" }
      ]
  },
  anniversary: {
      title: "Restaurant Anniversary Celebration",
      itinerary: [
          { time: "6:00 PM", activity: "Welcome Drinks & Cake Cutting" },
          { time: "8:00 PM", activity: "Special Buffet Dinner" },
          { time: "10:00 PM", activity: "Live Band Performance" }
      ]
  }
};

document.getElementById('festival-select').addEventListener('change', (event) => {
  const selectedFestival = event.target.value;

  if (selectedFestival) {
      const festival = festivalData[selectedFestival];
      displayFestivalDetails(festival);
  } else {
      document.getElementById('festival-details').classList.add('hidden');
  }
});

function displayFestivalDetails(festival) {
  document.getElementById('festival-title').textContent = festival.title;

  const itineraryList = document.getElementById('itinerary-list');
  itineraryList.innerHTML = "";

  festival.itinerary.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.time} - ${item.activity}`;
      itineraryList.appendChild(listItem);
  });

  document.getElementById('festival-details').classList.remove('hidden');
}
function openBookingForm() {
  const selectedFestival = document.getElementById('festival-title').textContent;
  document.getElementById('event-name').value = selectedFestival;
  document.getElementById('selected-festival').textContent = selectedFestival;
  document.getElementById('booking-form-section').classList.remove('hidden');
}

function closeBookingForm() {
  document.getElementById('booking-form-section').classList.add('hidden');
}

document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const bookingData = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/book-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        if (response.ok) {
            alert('Booking confirmed!');
            closeBookingForm();
        } else {
            alert('Failed to book the event.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong.');
    }
});

