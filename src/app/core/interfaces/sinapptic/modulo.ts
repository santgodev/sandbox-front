export interface IModulo {
    ID_MODULO:string,
    TITULO:string,
    ICONO:string,
    COMPONENTS?:IComponent[]
}
export interface IComponent{
    ID_MODULO?: string,
    ID_COMPONENT?: string,
    NOMBRE_COMPONENTE:string,
    COMENTARIO?: string,
    ICONO: string,
    RUTA:string
}