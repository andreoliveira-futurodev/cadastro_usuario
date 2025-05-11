// Seleciona os elementos
const form = document.getElementById('cadastro-form');
const campos = ['nome', 'cep', 'rua', 'bairro', 'cidade', 'estado'];

// Carrega os dados salvos no localStorage ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  campos.forEach(campo => {
    const valor = localStorage.getItem(campo);
    if (valor) {
      document.getElementById(campo).value = valor;
    }
  });
});

// Salva os dados no localStorage ao enviar o formulário
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita recarregar a página

  campos.forEach(campo => {
    const valor = document.getElementById(campo).value;
    localStorage.setItem(campo, valor);
  });

  alert('Dados salvos com sucesso!');
});

// Busca os dados do ViaCEP ao digitar o CEP
document.getElementById('cep').addEventListener('blur', async () => {
  const cep = document.getElementById('cep').value;

  if (cep.length === 8) {
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();

      if (!dados.erro) {
        document.getElementById('rua').value = dados.logradouro || '';
        document.getElementById('bairro').value = dados.bairro || '';
        document.getElementById('cidade').value = dados.localidade || '';
        document.getElementById('estado').value = dados.uf || '';
      } else {
        alert('CEP não encontrado.');
      }
    } catch (error) {
      alert('Erro ao buscar o endereço.');
      console.error(error);
    }
  }
});
