
export default function profilepage({params}:any){
    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <p>profile content ::{params.id}</p>
        </div>
    )
}