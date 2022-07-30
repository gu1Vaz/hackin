'use strict'


const Route = use('Route')

Route.post("/registrar", "AuthController.registrar").validator('User');;
Route.post("/autenticar", "AuthController.autenticar");

Route.post("/registrar_2", "AuthControllerFornecedor.registrar").validator('Fornecedor');
Route.post("/autenticar_2", "AuthControllerFornecedor.autenticar");


Route.get("/app", "AppController.index").middleware(['auth']);

// rotas que pegam varios dados de uma vez
Route.get('verPastas/:id', 'PastaController.index').as('pastas.index')
Route.get('verArquivos/:id', 'ArquivoController.index').as('arquivos.index')
Route.get('verTopicos/:id', 'TopicoController.index').as('topicos.index')

Route.get('verGruposHack', 'GrupoHackController.index').as('grupo_hacks.index')
Route.get('verLinguagensHack', 'LinguagemHackController.index').as('linguagem_hacks.index')


Route.get('verNovosHacks', 'HackController.novosHacks').as('hacks.novosHacks')
Route.get('verMeusHacks', 'HackController.meusHacks').as('hacks.meusHacks').middleware(['auth']);
Route.get('verHacksByIdGrupo/:id', 'HackController.hacksByIdGrupo').as('hacks.hacksByIdGrupo')



//rotas Hack
Route.group(() => {
  Route.resource("hack", "HackController")
      .apiOnly()
}).middleware(['auth']);

Route.get('verHack/:id', 'HackController.show').as('hacks.show')

//rotas GruposHack
Route.group(() => {
  Route.resource("gruposHack", "GrupoHackController")
      .apiOnly()
}).middleware(['auth']);

//rotas LiguagensHack
Route.group(() => {
  Route.resource("linguagensHack", "LinguagemHackController")
      .apiOnly()
}).middleware(['auth']);

//rotas Repositorio
Route.group(() => {
    Route.resource("repositorio", "RepoController")
        .apiOnly()
}).middleware(['auth']);

Route.get('verRepo/:id', 'RepoController.show').as('repositorios.show')

//rotas Documentação
Route.group(() => {
  Route.resource("documentacao", "DocumController")
      .apiOnly()
}).middleware(['auth']);

Route.get('verDocum/:id', 'DocumController.show').as('documentacaos.show')



//rotas Pasta
Route.group(() => {
  Route.resource("pasta", "PastaController")
      .apiOnly()
}).middleware(['auth']);

Route.get('verPasta/:id', 'PastaController.show').as('pastas.show')

//rotas Arquivo
Route.group(() => {
  Route.resource("arquivo", "ArquivoController")
      .apiOnly()
}).middleware(['auth']);

//rotas Topico
Route.group(() => {
    Route.resource("topico", "TopicoController")
        .apiOnly()
}).middleware(['auth']);

Route.get('verTopico/:id', 'TopicoController.show').as('topicos.show')


//rotas User
Route.group(() => {
  Route.resource("user", "UserController")
      .apiOnly()
}).middleware(['auth']);

Route.get('verUser/:id', 'UserController.show').as('user.show')
Route.get('verMyUser/', 'UserController.myUser').as('user.myUser')
