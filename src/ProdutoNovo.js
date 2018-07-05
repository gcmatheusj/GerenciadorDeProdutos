import React, { Component } from 'react'

class ProdutoNovo extends Component{
    render(){
        const { categorias } = this.props
        return(
            <div>
                <h2>Novo Produto</h2>
                <select ref='categoria'>
                    {categorias.map((c) => <option value={c.id}>{c.categoria}</option>)}
                </select>
                <p>{JSON.stringify(this.props.categorias)}</p>
                <input placeholder='Nome do novo produto' className='form-control' ref='produto'/>
            </div>
        )
    }
}

export default ProdutoNovo