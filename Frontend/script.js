const form = document.getElementById('survey-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        feedback: document.getElementById('feedback').value
    };

    const response = await fetch('http://localhost:3000/submit-survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    if(response.ok) 
    {
        alert('Survey submitted successfully!');
    }
    else 
    {
        alert('There was an error submitting the survey.');
    }
});