import { useEffect, useState } from "react";

export default function ProtectedRoute({ errorPage, targetPage }) {
    var [page, setPage] = useState(<></>);

    function renderPage() {
        const nome = localStorage.getItem('nome')
        const data = localStorage.getItem('data')

        if(nome === 'Queila Lima' && data === '1111-11-11') {
            setPage(targetPage)
        }

        if(!nome || !data) {
            setPage(errorPage);
            return;
        }

        setPage(targetPage);
    }

    useEffect(() => {
        renderPage();
    }, []);

    return page;
}