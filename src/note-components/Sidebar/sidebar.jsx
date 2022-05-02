const Sidebar = () => {
return (
<div className="left-section">
    <div className="list left-icon">
        <span><i class="far fa-home text-color"></i></span>
        <p>Home</p>
    </div>
    <div className="list left-icon">
        <span><i class="far fa-tag text-color"></i></span>
        <p>Label</p>
    </div>
    <div className="list left-icon">
        <span><i class="far fa-archive text-color"></i></span>
        <p>Archieve</p>
    </div>
    <div className="list left-icon">
        <span><i class="far fa-trash text-color"></i></span>
        <p>Trash</p>
    </div>
    <div className="list left-icon">
        <span><i class="far fa-user-circle text-color"></i></span>
        <p>Profile</p>
    </div>
</div>
);
}

export { Sidebar };