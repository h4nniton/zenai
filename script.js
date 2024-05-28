'use strict'

const button = document.getElementById('send-question')


const consultaGemini = (question) => {

    // keyGoogle = 'AIzaSyBZaybh57iVi23jcLvzuIrabNG4f3td60A'

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + keyGoogle;



    const requestData = {
        contents: [
            {
                parts: [
                    {
                        text: `${question}`
                    }
                ]
            }
        ]
    }

    const requestOptions = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(requestData)
    }

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
        const responseTextIa = data.candidates[0].content.parts[0].text
        respostaIa(responseTextIa)
    })
    .catch(error => console.error('Error: ', error))
}

const textAreaPt = document.getElementById('answer-pt')
const textAreaEn = document.getElementById('answer-en')

const respostaIa = async (responseTextIa) => {
    
    textAreaPt.textContent = responseTextIa
    textAreaEn.textContent = await loadTranslation(responseTextIa) 
}


button.addEventListener('click', () => {
    const question = document.getElementById('ask-user').value
    consultaGemini(question)
})

async function traduzir (text) {

    //let key = '89f9f593ce824acdbcf6271b2a7a8a52'

    let endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=pt&to=en`
        const options = {
            method: "POST",
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': 'brazilsouth',
                'Content-Type':'application/json'
            },
            body: `[ {'text': '${text}'}]`
        }
        const result = await fetch(endpoint, options).then( response => {
            if (!response.ok) {
                console.log(response.status)
            }
    
            let translation = response.json()
            return translation
        })
    
        return result
    }

    async function loadTranslation(text){
        const translatedText = await traduzir(text).then(data => {
            const translated = data[0].translations[0].text
            return translated
    })
    
        return translatedText
    }

    const buttonPt = document.getElementById('button-pt')
    const buttonEn = document.getElementById('button-en')

    buttonEn.addEventListener('click', () =>{
        textAreaEn.classList.remove('hidden')
        textAreaPt.classList.add('hidden')
    })

    buttonPt.addEventListener('click', () =>{
        textAreaPt.classList.remove('hidden')
        textAreaEn.classList.add('hidden')
    })