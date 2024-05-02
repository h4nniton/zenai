const button = document.getElementById('login')

async function validarLogin(){

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    console.log(email)

    if(email === '' || senha === ''){
        alert('Preencha os Campos Corretamente....')
    } else {

        const users = await fetch('http://back-login.vercel.app/usuarios') 
        const listUsers = await users.json()

        listUsers.forEach((user) => {
            if(email === user.email && senha === user.senha){

                const userId = user.id
                localStorage.setItem('userId', userId)
                alert('Usuário Logado com Sucesso !!!')
                window.location.href = '../telahome.html'
            }
        })
    }
}

window.onload = () => {
    button.addEventListener('click', validarLogin)
}