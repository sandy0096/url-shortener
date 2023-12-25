async function onSubmitLongUrl () {
    const inputUrl = document.getElementById('urlinput');
    try {
        const result = await fetch('http://127.0.0.1:8080/api/v1/short-url', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ origUrl: inputUrl.value }),
        })
        const resultJson = await result.json();
        const eleAns = document.getElementById('answer');
        eleAns.innerHTML = resultJson.response.shortUrl;
        const eleBox = document.getElementById('urlResultBox');
        eleBox.style.visibility = 'visible';
    } catch (error) {
        console.error(error);
    }
}

function copyLinkToClipboard () {
    const element = document.getElementById('answer');
    const storage = document.createElement('textarea');
    storage.value = element.innerHTML;
    element.appendChild(storage);
    // Copy the text in the fake `textarea` and remove the `textarea`
    storage.select();
    storage.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(storage.value);
    element.removeChild(storage);
}