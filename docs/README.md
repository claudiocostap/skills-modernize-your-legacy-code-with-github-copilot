# Sistema contábil escolar — documentação dos fontes COBOL

## Visão geral

O programa é um exemplo de gestão de saldo por meio de um menu de terminal. O fluxo está dividido em três programas COBOL: `MainProgram` apresenta as opções, `Operations` executa consultas e movimentações, e `DataProgram` lê e guarda o saldo.

Apesar do contexto de sistema contábil escolar, a implementação atual mantém **um único saldo**, sem identificar escola, aluno ou conta. Portanto, as operações não são individualizadas por aluno e não há cadastro ou histórico de transações.

## Arquivos COBOL

### `src/cobol/main.cob` — menu e fluxo principal

Define `MainProgram`, o ponto de entrada da aplicação.

Funções principais:

- Exibe o menu com as opções de consultar saldo, creditar, debitar e sair.
- Lê a opção digitada pelo usuário e encaminha as operações para `Operations`.
- Encerra o ciclo quando o usuário escolhe a opção 4.
- Informa quando a opção não é válida.

Regras observáveis:

- A aplicação continua mostrando o menu até que a opção de saída seja selecionada.
- As opções 1, 2 e 3 chamam `Operations`, respectivamente, com os identificadores `TOTAL`, `CREDIT` e `DEBIT`.
- Uma escolha fora do intervalo esperado exibe uma mensagem de erro e o menu é apresentado novamente.

### `src/cobol/operations.cob` — consulta e movimentações

Define `Operations`, responsável por executar a operação solicitada e interagir com `DataProgram`.

Funções principais:

- **Consultar (`TOTAL`)**: lê o saldo armazenado e o apresenta.
- **Creditar (`CREDIT`)**: solicita um valor, lê o saldo, soma o valor e grava o novo saldo.
- **Debitar (`DEBIT`)**: solicita um valor, lê o saldo e só grava a subtração quando há saldo suficiente.

Regras de negócio implementadas:

- O saldo inicial informado no programa é `1000.00`.
- Um débito é aceito quando o saldo é maior ou igual ao valor solicitado; caso contrário, é recusado com a mensagem de saldo insuficiente.
- Um crédito aumenta o saldo pelo valor informado.
- Não há registro de data, motivo, operador ou histórico das movimentações.
- Não há validação explícita para impedir valores negativos, entradas não numéricas ou valores que excedam a capacidade dos campos numéricos. O código também não define tratamento específico de overflow.

### `src/cobol/data.cob` — armazenamento do saldo

Define `DataProgram`, usado por `Operations` como uma interface simples para ler e atualizar o saldo.

Funções principais:

- Com a operação `READ`, copia `STORAGE-BALANCE` para o campo de saldo recebido.
- Com a operação `WRITE`, copia o saldo recebido para `STORAGE-BALANCE`.

Limites do armazenamento:

- O saldo é mantido em uma variável de trabalho em memória, inicializada em `1000.00`.
- Não há leitura ou gravação em arquivo, banco de dados ou outro armazenamento persistente.
- Não existe estrutura de dados para contas ou saldos separados por aluno.

## Fluxo entre os programas

1. `MainProgram` mostra o menu e recebe a opção.
2. Para consultar ou movimentar, `MainProgram` chama `Operations` com o tipo da operação.
3. `Operations` usa `DataProgram` para ler o saldo antes de consultar ou alterar.
4. Em créditos e débitos autorizados, `Operations` solicita a gravação do saldo atualizado.
5. O resultado é exibido no terminal.

## Requisitos de negócio refletidos no código

| Requisito | Comportamento implementado |
|---|---|
| Consultar o saldo atual | O saldo mantido por `DataProgram` é lido e exibido. |
| Creditar uma conta | O valor informado é somado ao saldo e o novo valor é gravado. |
| Debitar uma conta | O débito só é gravado quando o saldo cobre o valor informado. |
| Impedir saldo insuficiente | A operação é recusada quando o saldo é menor que o valor do débito. |
| Sair do sistema | A opção 4 encerra o ciclo do menu. |
| Tratar opção de menu inválida | Uma mensagem é apresentada e o menu continua. |

## Escopo atual e considerações para o contexto escolar

O código não implementa as funcionalidades normalmente necessárias para controlar contas de alunos. Em particular, não há:

- identificação, matrícula ou cadastro de alunos;
- seleção de uma conta específica antes de consultar ou movimentar valores;
- separação de saldos por aluno ou turma;
- persistência dos saldos entre execuções;
- histórico/auditoria de créditos e débitos;
- autenticação, autorização ou aprovação de movimentações;
- validação de valores monetários e tratamento de limites/erros de entrada.

Assim, as regras acima descrevem fielmente o comportamento presente nos fontes, mas não constituem uma especificação completa de um sistema contábil escolar em produção.
