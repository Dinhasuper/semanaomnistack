import React from 'react';
//o valor do props vem do title de Header, children é uma propriedade já existente, title é a propriedade do header
//poderia usar todas as propriedades, da seguinte forma, era só colocar props como parâmetro e usar as propriedades
//props.title ; props.children
export default function Header({title,children}) {
    return (
        <header>
            <h1>{title} {children}</h1>
        </header>

    );
}