const inputQuestion = document.getElementById('inputQuestion')
const result = document.querySelector('#result')

inputQuestion.addEventListener('keypress', e => {
  if (inputQuestion.value && e.key === "Enter")
  sendQuestion()
})

const OPENAI_API_KEY = "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"

function sendQuestion() {
  var sQuestion = inputQuestion.value

  fetch("https://api.openai.com/v1/chat/completions", {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
      "OpenAI-Organization": "org-04099gNSWTCq4d35T0hE2l09"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      prompt: sQuestion,
      max_tokens: 2048,
      temperature: 0.5,
    }),
  })
  .then(response => response.json())
  .then(json =>{
    if (result.value) result.value += "\n"

    if (json.error?.message) {
      result.value += `Error: ${json.error.message}`
    } else if (json.choices?.[0].text) {
      var text = json.choices[0].text || "Sem resposta"

      result.value += "Chat GPT: " + text
    }

    result.scrollTop = result.scrollHeight
  })
  .catch(e => console.log(e))
  .finally(() => {
    inputQuestion.value = ""
    inputQuestion.disabled = false
    inputQuestion.focus()
  })
  if (result.value) result.value += "\n\n\n"

  result.value += `Eu: ${sQuestion}`
  inputQuestion.value = "Carregando"
  inputQuestion.disabled = true

  result.scrollTop = result.scrollHeight
}
