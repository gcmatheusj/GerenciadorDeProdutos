import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'

class Produtos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editingCategoria: ''
        }
        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.renderCategoria = this.renderCategoria.bind(this)
        this.editCategoria = this.editCategoria.bind(this)
    }

    componentDidMount() {
        this.props.loadCategorias()
    }

    editCategoria(categoria) {
        this.setState({
            editingCategoria: categoria.id
        })
    }

    renderCategoria(cat) {
        return (
            <li key={cat.id}>
                {this.state.editingCategoria === cat.id &&
                    <div>
                        <input type='text' defaultValue={cat.categoria}/>
                    </div>
                }
                {this.state.editingCategoria !== cat.id &&
                    <div>
                        <button className='btn btn-sm' onClick={() => this.props.removeCategoria(cat)}>
                            <span className='glyphicon glyphicon-remove'></span>
                        </button>
                        <button className='btn btn-sm' onClick={() => this.editCategoria(cat)}>
                            <span className='glyphicon glyphicon-pencil'></span>
                        </button>
                        <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
                    </div>
                }
            </li>
        )
    }

    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })
            this.refs.categoria.value = ''
        }
    }

    render() {
        const { match, categorias } = this.props
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {categorias.map(this.renderCategoria)}
                    </ul>
                    <div className='well well-sm'>
                        <input className='form-control' onKeyUp={this.handleNewCategoria} type='text' ref='categoria' placeholder='Nova categoria' />
                    </div>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url + '/categoria/:catId'} component={Categoria} />
                </div>
            </div>
        )
    }
}
export default Produtos