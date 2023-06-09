function AlertMessage (){
    return (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-3" role="alert">
            <p className="font-bold">Warning!</p>
            <p>You will be logged out and have to log back in to apply changes.</p>
        </div>
    )
};
export default AlertMessage;