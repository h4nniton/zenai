const button = document.getElementById('send--question')

const consultaGemini = async (question) => {

    const keyGoogle = 'AIzaSyBZaybh57iVi23jcLvzuIrabNG4f3td60A'

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + keyGoogle;

    const requestData = {
        contents: [
            {
                parts: [
                    {
                        text: `$(question)`
                    }
                ]
            }
        ]
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }

    await fetch (url, requestOptions)
    .then (response => response.json())
    .then (data => {
        const respostaTextIA = data.candidates[0].content.parts[0].text
        respostaTextIA(respostaIa)
    })

}

const respostaIa = (respostaTextIA) => {
    const textAreaPt = document.getElementById('aswer-pt')
    textAreaPt.value = respostaTextIA
}

button.addEventListener('click', () => {
    const question = document.getElementById('ask--user').value
    consultaGemini(question)
})