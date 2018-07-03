import React, { Component } from 'react'
import Axios from 'axios'

class Categoria extends Component{
    constructor(props){
        super(props)
        this.loadData = this.loadData.bind(this)
        this.state = {
            produtos: [],
            categoria: {}
        }
    }

    loadData(id){
        Axios
            .get('http://localhost:3001/produtos?categoria='+id)
            .then(res => {
                this.setState({
                    produtos: res.data
                })
            })
        Axios
            .get('http://localhost:3001/categorias/'+id)
            .then(res => {
                this.setState({
                    categoria: res.data
                })
            })
    }

    componentDidMount(){
        const id = this.props.match.params.catId
        this.loadData(id)
    }

    componentWillReceiveProps(newProps){
        this.loadData(newProps.match.params.catId)
    }

    renderProduto(produto){
        return (
            <p key={produto.id} className='well'>{produto.produto}</p> 
        )
    }

    render() {
        const { produtos } = this.state
        return (
            <div>
                <h1>{this.state.categoria.categoria}</h1>
                {(produtos.map(this.renderProduto))}
            </div>
        )
    }
}
export default Categoria