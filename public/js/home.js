document.addEventListener('DOMContentLoaded', () => {
    const reserveTableBtn = document.getElementById('reserveTableBtn');
    const reservationForm = document.getElementById('reservationForm');

    if (reserveTableBtn && reservationForm) {
        reserveTableBtn.addEventListener('click', (event) => {
            event.preventDefault();
            reservationForm.style.display = reservationForm.style.display === 'none' ? 'block' : 'none';
        });

        reservationForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const reservationData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                guests: document.getElementById('guests').value,
            };

            try {
                const response = await fetch('/api/reservation/reserve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reservationData)
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    reservationForm.reset();
                    reservationForm.style.display = 'none';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error submitting reservation:', error);
                alert('Failed to submit reservation. Please try again.');
            }
        });
    } else {
        console.error("Element(s) not found!");
    }
});
