document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent page reload

        // Collect form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            // Send data to backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                formMessage.textContent = 'Your message has been sent successfully!';
                formMessage.style.display = 'block'; // Show success message
                contactForm.reset(); // Clear form inputs
            } else {
                formMessage.textContent = 'Failed to send your message. Please try again.';
                formMessage.style.display = 'block'; // Show error message
            }
        } catch (error) {
            console.error('Error sending message:', error);
            formMessage.textContent = 'Something went wrong. Please try again later.';
            formMessage.style.display = 'block'; // Show error message
        }
    });
});
