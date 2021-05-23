<template>
  <div id="Crud">
    <header class="header">
      <h1>Produtos</h1>
      <button class="btn btn-info" @click="abrirForm ()">Abrir/Fechar Form</button>
      <input type="text" placeholder="Pesquisar..." v-model="busca">
    </header>
    <div class="container-fluid">
      <form class="form" v-if="formIsOpen">
          <div>
            <label>Obs Remessa</label>
            <input type="text" v-model="produto.ObsRemessa" placeholder="Ex.: Prazo maior 360 dias">
          </div>
          <div>
            <label>Ordem venda</label>
            <input type="text" v-model="produto.OrdemVenda" placeholder="Ex.: SO-202223777">
          </div>
          <div>
            <label>Oferta</label>
            <input type="number" v-model="produto.Oferta" placeholder="Ex.: 2399013098">
          </div>
          <div>
            <label>Região</label>
            <input type="text" v-model="produto.Regiao" placeholder="Ex.: CERRADO">
          </div>
          <div>
            <label>Local</label>
            <input type="text" v-model="produto.Local" placeholder="Ex.: CAMPO DO MEIO">
          </div>
          <div>
            <label>Equipe</label>
            <input type="text" v-model="produto.Equipe" placeholder="Ex.: WE5">
          </div>
          <div>
            <label>Cliente</label>
            <input type="text" v-model="produto.Cliente" placeholder="Ex.: JOAO MARCOS LARA">
          </div>
          <div>
            <label>Produto</label>
            <input type="text" v-model="produto.Produto" placeholder="Ex.: Coffe Arabica">
          </div>
          <div>
            <label>Recebedor</label>
            <input type="number" v-model="produto.Recebedor" placeholder="Ex.: 10433408">
          </div>
          <div>
            <label>Descrição Recebedor</label>
            <input type="text" v-model="produto.DescricaoRecebedor" placeholder="Ex.: COOP REG CAFEIC GUAXUPE LTDA">
          </div>
          <div>
            <label>Modalide</label>
            <input type="text" v-model="produto.Modalidade" placeholder="Ex.: U3">
          </div>
          <div>
            <select v-model="selected">
              <option disabled value="">Escolha uma moeda</option>
              <option>USD</option>
              <option>BRL</option>
              <option>EUR</option>
            </select>
          </div>
          <div>
            <label>Ptax Valor</label>
            <input type="number" v-model="produto.PtaxValor" placeholder="Ex.: 1,0000" class="form-label">
          </div>
          <button @click.prevent="salvar()" class="btn btn-primary">Salvar</button>
        </form>
    </div>
      <div class="table-container">
        <table class="table table-dark table-hover table-striped">
          <thead>
            <tr>
              <th v-for="elemento in elementoLista" :key='elemento.item'>{{elemento.item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(produto, id) in produtos" :key="id">
              <td>{{produto.ObsRemessa}}</td>
              <td>{{produto.OrdemVenda}}</td>
              <td>{{produto.Oferta}}</td>
              <td>{{produto.Regiao}}</td>
              <td>{{produto.Local}}</td>
              <td>{{produto.Equipe}}</td>
              <td>{{produto.Cliente}}</td>
              <td>{{produto.Produto}}</td>
              <td>{{produto.Recebedor}}</td>
              <td>{{produto.DescricaoRecebedor}}</td>
              <td>{{produto.Modalidade}}</td>
              <td>{{produto.MoedaDoDocumento}}</td>
              <td>{{produto.PtaxValor}}</td>
              <td>
                <button @click="carregar(id)" class="btn btn-warning">Carregar</button>
                <button @click="excluir(id)" class="btn btn-danger">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        //show divs
        formIsOpen: false,
        tableIsOpen: false,
        tableNullMsg: false,
        //crud
        elementoLista: [
          {item: 'Obs Remessa'},
          {item: 'Ordem Venda'},
          {item: 'Oferta'},
          {item: 'Região'},
          {item: 'Local'},
          {item: 'Equipe'},
          {item: 'Cliente'},
          {item: 'Produto'},
          {item: 'Recebedor'},
          {item: 'Descrição recebedor'},
          {item: 'Modalidade'},
          {item: 'Moeda do documento'},
          {item: 'PTAX Valor'},
          {item: 'Excluir/Editar'}
        ],
        selected: '',
        produtos: [],
        id: null,
        produto: {
          ObsRemessa: '',
          OrdemVenda: '',
          Oferta: '',
          Regiao: '',
          Local: '',
          Equipe: '',
          Cliente: '',
          Produto: '',
          Recebedor: '',
          DescricaoRecebedor: '',
          Modalidade: '',
          MoedaDoDocumento: '',
          PtaxValor: ''
        }
      }
    },
    methods: {
      //show divs
      abrirForm () {
        this.formIsOpen = !this.formIsOpen
      },
      //crud
      salvar () {
        const metodo = this.id ? 'patch' : 'post'
        const finalUrl = this.id ? `/${this.id}.json` : '.json'
        this.produto.MoedaDoDocumento = this.selected 
        this.$http[metodo](`/produtos${finalUrl}`, this.produto)
        .then(
          () => {this.limparCampos() 
          this.obterProdutos()})
          alert('Item salvo.')
      },
      carregar(id) {
        this.id = id
        this.produto = { ...this.produtos[id] }
      },
      excluir(id){
        this.$http.delete(`/produtos/${id}.json`).then( () => this.obterProdutos())
        .catch(() => {
          alert('Erro, não foi possível excluir.')
        })
      },
      obterProdutos() {
        this.$http.get('produtos.json').then(res => {
          this.produtos = res.data
        })
      },
      limparCampos() {
        this.produto = {}
        this.id = null
      }
    },
    mounted () {
      this.obterProdutos()
    }
}
</script>

<style scoped>
  .header{
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bs-dark);
    color: var(--bs-light);
    height: 77px;
  }
  .form{
    margin: 35px 20%;
  }
  .form div{
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }
  .form div label{
    margin: 5px 0px 0px 0px;
    font-weight: 500;
  }
  .form div input{
    padding: 5px;
    border-radius: 5px;
    outline: none;
  }
  .form div select{
    width: 50%;
    margin: 0 auto;
    margin-top: 20px;
  }
  .btn-primary{
    width: 100%;
    margin-top: 20px;
  }
  .btn-info{
    margin-left: 25px;
  }
  .table-container{
    margin-top: 5px;
  }
</style>