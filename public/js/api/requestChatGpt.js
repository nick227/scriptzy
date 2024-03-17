async function requestChatGpt(prompt, template=null, image=null, voice=false) {
  try {
    const url = '/api/chatgpt';
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('template', template);
    formData.append('image', image);
    formData.append('voice', voice);
    console.log('formData', formData);
    const response = await fetch(url, {
      method: 'POST',
      body: formData 
    });

    if (!response.ok) {
      console.log('api error', response);
    }

    const clone = response.clone();

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Response is not JSON, returning as string');
      const data = await clone.text();
      return data;
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}