import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutoNovo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
        this.handleNewProduto = this.handleNewProduto.bind(this)
    }

    handleNewProduto() {
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.createProduto(produto)
            .then(res => this.setState({ redirect: '/produtos/categoria/' + produto.categoria }))
        console.log(produto)
    }
    render() {
        const { categorias } = this.props
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h2>Novo Produto</h2>
                <select className="form-control" ref='categoria'>
                    {categorias.map((c) => <option key={c.id} value={c.id}>{c.categoria}</option>)}
                </select>
                <input placeholder='Nome do novo produto' className='form-control' ref='produto' />
                <button onClick={this.handleNewProduto}>Salvar</button>
            </div>
        )
    }
}

export default ProdutoNovo