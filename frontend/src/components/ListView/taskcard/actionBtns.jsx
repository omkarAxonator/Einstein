function actionBtns(params) {
    return(
        <div className="d-flex flex-column gap-2">
        <button className="btn btn-primary">Ask Status<i className="bi bi-chevron-down ms-2"></i></button>
        <button className="btn btn-outline-secondary">Action Button</button>
        </div>
    );
};

export default actionBtns;