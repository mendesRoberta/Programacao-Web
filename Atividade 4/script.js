const formCadastro = document.getElementById('form-cadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', function (event) {
        event.preventDefault();

        const dataNascimento = document.getElementById('data_nascimento').value.trim();
        const partesData = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dataNascimento);

        if (!partesData) {
            alert('Digite a data de nascimento no formato DD/MM/AAAA.');
            return;
        }

        const dia = Number(partesData[1]);
        const mes = Number(partesData[2]);
        const ano = Number(partesData[3]);
        const anoBissexto = ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0);
        const diasPorMes = [31, anoBissexto ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (ano < 1 || mes < 1 || mes > 12 || dia < 1 || dia > diasPorMes[mes - 1]) {
            alert('Digite uma data de nascimento válida.');
            return;
        }

        const novoPaciente = {
            nome: document.getElementById('nome_completo').value,
            dataNascimento,
            cpf: document.getElementById('cpf').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            observacoes: document.getElementById('observacoes').value
        };

        let listaPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

        listaPacientes.push(novoPaciente);
        localStorage.setItem('pacientes', JSON.stringify(listaPacientes));

        formCadastro.reset();
        alert('Paciente cadastrado com sucesso!');
    });
}

function renderizarLista() {
    const containerLista = document.getElementById('lista-pacientes-container');
    if (!containerLista) {
        return;
    }

    containerLista.innerHTML = '';

    const listaPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    if (listaPacientes.length === 0) {
        containerLista.innerHTML = '<p>Nenhum paciente cadastrado.</p>';
        return;
    }

    let index = 0;
    for (const paciente of listaPacientes) {
        const divCartao = document.createElement('div');
        divCartao.classList.add('cartao-paciente');

        divCartao.innerHTML = `
            <p><strong>Nome completo:</strong> ${paciente.nome}</p>
            <p><strong>Data de nascimento:</strong> ${paciente.dataNascimento}</p>
            <p><strong>CPF:</strong> ${paciente.cpf}</p>
            <p><strong>Telefone:</strong> ${paciente.telefone}</p>
            <p><strong>Email:</strong> ${paciente.email}</p>
            <p><strong>Observações:</strong> ${paciente.observacoes}</p>
            <button class="btn-deletar" onclick="deletarPaciente(${index})">Deletar paciente</button>
        `;

        containerLista.appendChild(divCartao);
        index++;
    }
}

renderizarLista();

function deletarPaciente(indexParaDeletar) {
    let listaPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    listaPacientes.splice(indexParaDeletar, 1);

    localStorage.setItem('pacientes', JSON.stringify(listaPacientes));

    renderizarLista();
}