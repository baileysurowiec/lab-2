export default function Todo({title, content, author}){
    return(
        <div>
            <h3>{title}</h3>
            <div>{content}</div>
            <br/>
            <i>Created by <b>{author}</b> on</i>
        </div>

    )
}