import React, { useState } from 'react';
import uniqid from 'uniqid';

const ListNames = () => {
    const [ name, setName ] = useState('');
    const [ listNames, setListNames ] = useState([]);
    const [ isEdit, setIsEdit ] = useState(false);
    const [ id, setId ] = useState('');
    const [ error, setError ] = useState(null);

    const addName = ( e ) =>{
        e.preventDefault();
        if( !name.trim() ){
            setError('El campo nombre no puede esta vacío')
            return;
        }
        const newName = {
            id: uniqid(),
            titleName: name
        }
        setListNames([ ...listNames, newName ]);
        setName('');
        setError(null)
        // localStorage.setItem('Names', name);
        // localStorage.setItem(key, name);
    } 

    const deleteName = ( id ) =>{
        const newArr = listNames.filter( item => item.id !== id );
        setListNames( newArr );
    }

    const edit  = ( item ) =>{
        setIsEdit( true );
        setName( item.titleName );
        setId( item.id )
    }

    const editName = ( e ) =>{
        e.preventDefault();
        if( !name.trim() ){
            setError('El campo nombre no puede esta vacío')
            return;
        }
        const newArr = listNames.map( 
            item => 
            item.id === id ? { id:id, titleName:name } : item
            )
        setListNames( newArr )
        setIsEdit( false ); 
        setError(null)       
        setName('')
    }

    const messageError = () => {
        return ( 
        <div className="alert alert-danger text-danger text-center">
            { error }
        </div>
        )
    }


    return (
        <div>
            <h2 className="text-center"> Aplicación de CRUD Básica </h2>
            <div className="row">
                <div className="col">
                    <h2 className="text-center">
                        Listado de nombres
                    </h2>    
                    <ul className="list-group">
                        {
                            listNames.map( item =>

                                <list 
                                    key={item.id} 
                                    className="list-group-item "> 
                                    { item.titleName } 
                                    <button 
                                    className="btn btn-danger float-right" 
                                    onClick={ () => { deleteName( item.id ) } }>
                                        Borrar
                                    </button>
                                    <button 
                                    className="btn btn-info float-right" 
                                    onClick={ () => { edit( item ) } }>
                                        Editar
                                    </button>
                                </list>

                            )    
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2 className="text-center">
                        Formulario para añadir nombres
                    </h2>    
                    <form 
                    onSubmit={ isEdit ? editName : (e)=>{addName(e)} } 
                    className="form-group">
                        <input 
                            onChange={ (e)=>{setName(e.target.value)} }
                            className="form-control mb-3 mt-3"  
                            type="text" 
                            placeholder="Introduce el nombre" 
                            value={name}
                            />
                        <div className="d-grid gap-2">
                            <input 
                                value={ isEdit ? 'Editar nombre' : 'Registrar nombre'} 
                                className="btn btn-info btn-block" 
                                type="submit" />
                        </div>
                    </form>
                    {
                        error != null ? 
                        (                            
                            messageError()
                        ):
                        (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ListNames
