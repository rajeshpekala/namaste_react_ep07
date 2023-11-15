const User = ({name,location}) => {
//  props.name,props.location destructuring
return (
    
    <div className = "user_card">
        <h2>Name:{name}</h2>
        <h2>Location:{location}</h2>
    </div>
);

}

export default User;