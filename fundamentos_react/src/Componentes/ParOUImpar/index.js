export function ParOUImpar(props){
    return(
        <>
        {
            props.numero% 2===0 ?
            <p>O número {props.numero} é Par</p> :
            <p>O número {props.numero} é Impar</p>
        }
        </>
    )
}