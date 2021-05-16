function Quote({ quote }) {
    return (
        <div className="card quote text-center">
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <p><q>{quote.text}</q></p>
                    <footer className="blockquote-footer">
                        {
                            quote.by &&
                            <p>{quote.by}</p>
                        }
                    </footer>
                </blockquote>
            </div>
        </div>
    );
}

export default Quote;