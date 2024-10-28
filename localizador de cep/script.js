document.getElementById("cepForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const cep = document.getElementById("cep").value;

    // Validação do CEP
    if (cep.length !== 8 || isNaN(cep)) {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
        return;
    }

    // Chamada à API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar o CEP");
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }

            // Exibindo os resultados
            document.getElementById("logradouro").textContent = data.logradouro;
            document.getElementById("bairro").textContent = data.bairro;
            document.getElementById("localidade").textContent = data.localidade;
            document.getElementById("uf").textContent = data.uf;
            document.getElementById("result").classList.remove("hidden");
        })
        .catch(error => {
            console.error(error);
            alert("Erro ao buscar o CEP");
        });
});
