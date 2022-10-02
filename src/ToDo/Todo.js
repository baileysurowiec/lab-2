export default function Todo({title, content, author, dateCreated}){
    return(
        <div>
            <h3>{title}</h3>
            <div>{content}</div>
            <br/>
            <i>Created by <b>{author}</b> on {dateCreated}</i>
        </div>

    )
}