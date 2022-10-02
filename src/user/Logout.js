export default function Logout({user, setUser}){
    return(
        <form onSubmit={e => {e.preventDefault(); setUser('')}}>
            <div align = "right">
            Logged in as: <b>{user}</b>
            <input  type = "submit"
                    value = "Logout" />
            </div>
        </form>

    )
}