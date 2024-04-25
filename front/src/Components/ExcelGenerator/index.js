import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';

import './ExcelGenerator.css'; // Importando o arquivo de estilos

export default function ExcelGenerator() {
    const [workbook, setWorkbook] = useState(null);
    const [playersData, setPlayersData] = useState([]);
    const [sortBy, setSortBy] = useState({ column: null, ascending: true });

    async function getPlayers() {
        try {
            const res = await axios.get('http://localhost:8080/api/getplayers');
            // Transforma as strings de tempo e data em valores comparáveis
            const formattedPlayers = res.data.players.map(player => ({
                ...player,
                tempoValue: convertTimeToValue(player.tempo),
                dataValue: convertDateToValue(player.data)
            }));
            setPlayersData(formattedPlayers);
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    }

    useEffect(() => {
        getPlayers();
    }, []);

    function convertTimeToValue(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function convertDateToValue(dateString) {
        return new Date(dateString);
    }

    function sortPlayers(column) {
        const ascending = sortBy.column === column ? !sortBy.ascending : true;
        const sortedPlayers = [...playersData].sort((a, b) => {
            const valueA = a[column + 'Value'];
            const valueB = b[column + 'Value'];
            return ascending ? valueA - valueB : valueB - valueA;
        });
        setSortBy({ column, ascending });
        setPlayersData(sortedPlayers);
    }

    function resetSort() {
        setSortBy({ column: null, ascending: true });
        // Recarrega os dados para restaurar a ordem padrão
        getPlayers();
    }

    function loadExcelFile(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const loadedWorkbook = XLSX.read(data, { type: "array" });
            setWorkbook(loadedWorkbook);
        };

        reader.readAsArrayBuffer(file);
    }

    function saveExcelFile() {
        if (workbook) {
            const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "dados_editados.xlsx");
        } else {
            alert("Por favor, selecione um arquivo Excel antes de salvar.");
        }
    }

    // Função para converter de string para ArrayBuffer
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    return (
        <div className="excel-generator-container">
            <input type="file" onChange={loadExcelFile} />
            <button onClick={saveExcelFile}>Salvar arquivo</button>
            {playersData.length > 0 && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => sortPlayers('nome')}>Nome</th>
                                <th onClick={() => sortPlayers('data')}>Data</th>
                                <th onClick={() => sortPlayers('tempo')}>Tempo</th>
                                <th>F1</th>
                                <th>F2</th>
                                <th>F3</th>
                                <th>F4</th>
                                <th>F5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playersData.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.nome}</td>
                                    <td>{player.data}</td>
                                    <td>{player.tempo}</td>
                                    <td>{player.f1}</td>
                                    <td>{player.f2}</td>
                                    <td>{player.f3}</td>
                                    <td>{player.f4}</td>
                                    <td>{player.f5}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <button onClick={resetSort}>Voltar para a ordem padrão</button>
        </div>
    );
}
