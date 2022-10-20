//Referencias en el Html

import { Todo } from "../classes";
import { todoList } from "../index";


const divTodoList = document.querySelector('.todo-list');
const txtInput =  document.querySelector('.new-todo');
const btnBorrarCompletados =  document.querySelector('.clear-completed');
const ulFilter = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) =>{

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id=" ${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );
    return div.firstElementChild;
}


//Eventos
txtInput.addEventListener( 'keyup', ( event ) => {

    if( event.keyCode === 13 && txtInput.value.length > 0){
        
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        //console.log( todoList );
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }
})

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; //input label button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    /*
        console.log(nombreElemento);
        console.log(todoId);
        console.log(todoElemento);
    */

    if( nombreElemento.includes('input') ){ //le pico al boton verde de check
        
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    }else if( nombreElemento.includes('button') ){ //le pico al boton rojo de eliminar

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );

    }
    //console.log(todoList);
})

btnBorrarCompletados.addEventListener('click', (event) => {

    todoList.eliminarCompletados();
    
    for( let i = divTodoList.children.length-1; i >= 0; i--){
        
        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }

    }

})

ulFilter.addEventListener('click', (event) => {

    const filtro = event.target.text;

    if( !filtro ) {
        return;
    }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ){

        //console.log(elemento);
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){
            
            case 'Pendientes':
               if( completado ) {
                    elemento.classList.add('hidden');
               }
            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
             break;

        }

    }

});